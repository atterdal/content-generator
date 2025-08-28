# Graphics Engine - Teknisk Dokumentation

## Översikt

Graphics Engine är ett agnostiskt renderingssystem byggt kring en kraftfull Canvas-motor. Systemet kombinerar generella funktioner med organisationsspecifik kod genom **Blocks** (grid-positioned element) och **Floaters** (canvas-wide element) för att skapa komplexa layouts med smart text-hantering.

## Arkitektur

### Komponenter
```
types.ts          - Core graphics engine med Block/Floater klasser
layouts.ts        - Standard layouter (6 st CSS Grid templates)
HaboComponents.ts - Organisationsspecifika komponenter 
brand.ts          - Brand-konfiguration för Habo IF
```

### Flöde
1. **Grid-parsing** → Konverterar CSS Grid-mallar från databas
2. **Component-byggning** → Använd HaboComponents för att skapa Block/Floater-objekt
3. **Layer-organisering** → Sorterar element i render-lager
4. **Canvas-rendering** → Ritar element i layer-ordning med smart text-hantering

---

## Grid-systemet

### Grundläggande Struktur
Canvas är uppdelat i ett **6×4 grid** (6 rader, 4 kolumner):

```
Canvas: 1080×1080px
Cell:   270×180px per cell
Gap:    0px (default)
```

### CSS Grid Template
Databas lagrar layouts som CSS Grid-mallar:

```sql
-- Exempel från databas
"hero hero beige blue"
"hero hero beige blue" 
"hero hero beige graphic"
"logo vert trans trans"
"logo vert trans trans"
"logo vert trans trans"
```

### Grid-parsning
Systemet konverterar CSS Grid till grid-områden:

```typescript
// Input: CSS Grid string
const gridTemplate = `
"hero hero beige blue"
"hero hero beige blue" 
"hero hero beige graphic"
`;

// Output: Grid-områden
{
  hero: { startRow: 0, endRow: 3, startCol: 0, endCol: 2 },
  beige: { startRow: 0, endRow: 3, startCol: 2, endCol: 3 },
  blue: { startRow: 0, endRow: 2, startCol: 3, endCol: 4 },
  graphic: { startRow: 2, endRow: 3, startCol: 3, endCol: 4 }
}
```

### Bounding Box-beräkning
Varje grid-område konverteras till pixel-koordinater:

```typescript
// hero-block: 2 kolumner × 3 rader
const heroBounds = {
  x: 0,           // startCol × 270
  y: 0,           // startRow × 180  
  width: 540,     // 2 kolumner × 270
  height: 540     // 3 rader × 180
};
```

---

## Layer-systemet

### Layer-hierarki
Element renderas i sekventiell ordning (0-5):

```
Layer 5:  Canvas-wide overlays  
Layer 4:  Text och logotyper
Layer 3:  Hero-blocks (spelarbilder)
Layer 2:  Textmönster över hela canvas
Layer 1:  Färg- och gradient-block
Layer 0:  Bakgrunder
```

**Layer-visualisering:** 
- **`layer0.png`** - Bakgrundsgradienter
- **`layer1.png`** - Färgblock och gradienter  
- **`layer2.png`** - Repeterat textmönster
- **`layer3.png`** - Hero-block med spelarbild
- **`layer4.png`** - Text-block och logotyper
- **`layer5.png`** - Responsiv overlay

### Layer-organisering
```typescript
class Canvas {
  private layerRenderers = new Map<number, LayerRenderer>();
  
  addElement(element: FloaterElement | LayerElement, layer: number) {
    // Organisera element per layer
    const renderer = this.layerRenderers.get(layer) || createNew();
    renderer.add(element);
  }
  
  async render() {
    // Rendera lager i ordning
    const sortedLayers = Array.from(this.layerRenderers.keys()).sort();
    for (const layer of sortedLayers) {
      await this.renderLayer(layer);
    }
  }
}
```

---

## Block vs Floater Klasser

### Block (Grid-positioned)
Element positionerade enligt grid-system:

```typescript
const block = new Block("beige"); // CSS Grid area

// Lägg till bakgrund
block.addBackground("#f0ede6", 1);

// Lägg till text med smart hantering
block.addText("MÅNADENS SPELARE", 4, {
  fontSize: 24,
  color: theme.gold,
  align: 'center',
  textTransform: 'uppercase',
  maxWidth: 90,  // 90% av block-bredd
  lineWrap: 2,   // Max 2 rader
  maxScale: 0.8  // Skala max 20% innan line-wrap
});

// Lägg till bild
block.addImage('/images/player.jpg', 3, { fit: 'cover' });
```

### Floater (Canvas-wide)  
Element som täcker hela canvas eller stora delar:

```typescript
const overlay = new Floater(5); // Layer 5

// Lägg till huvudtext
overlay.addText("MATCHDAG", 5, {
  fontSize: canvasWidth * 0.12,
  fontFamily: HABO_IF_BRAND.fonts.primary,
  color: theme.gold,
  align: 'center',
  textTransform: 'uppercase',
  maxWidth: 90,
  lineWrap: 2,
  maxScale: 0.7,
  canvasWidth: canvasWidth
});

// Lägg till undertext med offset
overlay.addText("vs Östers IF", 5, {
  fontSize: canvasWidth * 0.06,
  fontFamily: `italic ${HABO_IF_BRAND.fonts.secondary}`,
  color: '#FFFFFF',
  align: 'center',
  offset: { top: canvasWidth * 0.12 * 0.8 }
});
```

---

## Smart Text-hantering

### addText-metoden
Både Block och Floater har en intelligent addText-metod med följande parametrar:

```typescript
addText(content: string, layer: number, options: {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  vertical?: boolean;
  multiline?: boolean;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  maxWidth?: number;      // Max bredd i % av container
  lineWrap?: boolean | number; // true=unlimited, number=max lines, -1=unlimited
  maxScale?: number;      // Max skalning innan line-wrap (default: 0.8)
  canvasWidth?: number;   // För responsiv sizing
  offset?: { top?: number; bottom?: number; left?: number; right?: number };
} = {}): Block | Floater
```

### Intelligent Scaling vs Line-wrapping
1. **Mät text-bredd** med Canvas API
2. **Kontrollera om skalning behövs** (text större än maxWidth)
3. **Beslut: Skala eller wrappe?**
   - Om text innehåller mellanslag OCH skalning skulle bli mindre än `maxScale`: försök line-wrap
   - Annars: skala texten
4. **Line-wrap algoritm**: Testa olika uppdelningar för att hitta bästa balansen

### Algoritm-exempel
```typescript
// Text: "BARTHOLOMEW WELLINGTON"
// maxWidth: 90%, maxScale: 0.7

if (textWidth > maxWidth) {
  const requiredScale = maxWidth / textWidth; // ex: 0.6
  
  if (content.includes(' ') && requiredScale < maxScale) {
    // Försök line-wrap: "BARTHOLOMEW" / "WELLINGTON"
    // Om båda raderna passar inom maxWidth: använd line-wrap
    // Annars: skala till 0.6
  } else {
    // Skala direkt till 0.6
  }
}
```

### Text Transform och Font Styling
```typescript
// Stöd för alla vanliga transforms
textTransform: 'uppercase' | 'lowercase' | 'capitalize' | 'none'

// Italic font support
fontFamily: `italic ${HABO_IF_BRAND.fonts.secondary}`

// Offset-positionering
offset: { top: fontSize * 0.8 } // Placera under huvudtext
```

---

## HaboComponents API

### Organisationsspecifika Komponenter
HaboComponents innehåller färdiga komponenter som följer Habo IF:s grafiska profil:

```typescript
import { 
  createHaboMainHeader,
  createHaboLogoBlock, 
  createHaboPlayerBlock,
  createHaboTextPattern,
  addComponentsToCanvas
} from '@/apps/habo-if/components/HaboComponents';

// Skapa huvudrubrik med smart text-hantering
const header = createHaboMainHeader(
  5,                    // layer
  "BARTHOLOMEW WELLINGTON",  // mainText - blir automatiskt line-wrapped
  "Mittfältare",        // subText - skalas separat
  theme,
  1080                  // canvasWidth för responsivitet
);

// Skapa logotyp-block
const logo = createHaboLogoBlock("logo", theme, {
  logoSize: 1/3,
  offset: { y: -0.02 }
});

// Skapa spelare-block
const player = createHaboPlayerBlock("hero", "/images/player.jpg", 3, theme);

// Skapa textmönster (Habo-specifikt)
const pattern = createHaboTextPattern(2, "HABO IDROTTSFÖRENING ", theme);

// Lägg till alla komponenter till canvas
addComponentsToCanvas(canvas, [header, logo, player, pattern]);
```

---

## Agnostisk vs Organisationsspecifik Kod

### Graphics Engine Core (types.ts) - Agnostiskt
```typescript
// Generella funktioner för alla organisationer
class Block {
  addText(content, layer, options) { /* Smart text-hantering */ }
  addBackground(color | gradient, layer) { /* Bakgrunder */ }
  addImage(src, layer, options) { /* Bildhantering */ }
}

class Floater {
  addText(content, layer, options) { /* Smart text-hantering */ }
  // Samma API som Block
}
```

### HaboComponents (HaboComponents.ts) - Organisationsspecifikt
```typescript
// Habo IF specifika komponenter som använder core-funktionerna
export function createHaboMainHeader(layer, mainText, subText, theme, canvasWidth) {
  const overlay = new Floater(layer);
  
  // Använd generella addText-funktionen med Habo IF specifika värden
  overlay.addText(mainText, layer, {
    fontFamily: HABO_IF_BRAND.fonts.primary,  // Habo IF font
    color: theme?.gold,                       // Habo IF färg
    textTransform: 'uppercase',               // Habo IF stil
    maxWidth: 90,
    lineWrap: 2,
    maxScale: 0.7
  });
  
  return overlay;
}
```

### Brand Configuration (brand.ts) - Organisationsspecifikt
```typescript
export const HABO_IF_BRAND = {
  fonts: {
    primary: '"Alverata", "Georgia", serif',
    secondary: '"PT Serif", serif'
  },
  defaultTexts: {
    sectionHeader: 'HABO IF',
    textPattern: 'HABO IF FOTBOLL'
  }
};
```

---

## Prestandaoptimering

### Parallell Rendering
```typescript
// Alla element på samma layer renderas parallellt
const layerPromises = renderer.elements.map(element => 
  this.renderElement(element)
);
await Promise.all(layerPromises);
```

### Intelligent Caching
```typescript
// Font-laddning cachas
const fontCache = new Map<string, FontFace>();

// Grid-parsning cachas per layout
const gridCache = new Map<string, GridArea[]>();
```

### Memory Management
```typescript
// Canvas context återställs efter varje element
this.ctx.save();
// ... rendering
this.ctx.restore();
```

---

## Felsökning

### Debug-loggar
```typescript
// Aktivera i Canvas.ts för debugging
console.log(`MainText: "${text}", width: ${width}, scale: ${scale}`);
console.log(`Using multiline: "${line1}" / "${line2}"`);
```

### Vanliga Problem

#### Text utanför canvas
- **Orsak:** Multiline misslyckas, skalning inte applicerad
- **Lösning:** Kontrollera `requiredScale < 0.7` och `includes(' ')`

#### Grid-parsing fel
- **Orsak:** Ogiltigt CSS Grid format från databas
- **Lösning:** Validera grid-strängar före parsning

#### Layer-ordning fel
- **Orsak:** Element läggs till i fel layer
- **Lösning:** Kontrollera layer-nummer i builder-calls

---

## Best Practices

### Layout-design
1. **Bakgrunder först** (layer 0)
2. **Färgblock och gradienter** (layer 2)  
3. **Textmönster** (layer 3)
4. **Spelarbilder** (layer 4)
5. **Text och logotyper** (layer 5)
6. **Overlays sist** (layer 6+)

### Text-hantering
1. **Använd multiline** för långa texter med mellanslag
2. **Respektera bindestreck** som ordgränser
3. **Skala oberoende** main- och sub-headers
4. **Begränsa till 90%** av canvas-bredd

### Prestanda
1. **Minimera font-laddningar** 
2. **Cachea grid-parsning**
3. **Använd layer-systemet** effektivt
4. **Återställ canvas context** efter varje element

---

## Exempel: Komplett Layout

```typescript
import { createStandardLayout, addComponentsToCanvas } from '@/apps/habo-if/components/HaboComponents';

// Skapa en komplett layout med HaboComponents
const components = createStandardLayout(
  ['logo', 'beige', 'blue', 'hero'],  // Grid-områden
  theme,
  {
    includePattern: true,
    includeOverlay: true,
    overlayText: { 
      main: "BARTHOLOMEW WELLINGTON",  // Smart line-wrapping
      sub: "Mittfältare"               // Oberoende skalning  
    }
  }
);

// Lägg till alla komponenter till canvas
addComponentsToCanvas(canvas, components);

// Alternativt: Bygg manuellt för full kontroll
const manualComponents = [
  // Bakgrund och färgblock
  createHaboBeigeBlock("beige", 1, theme),
  createHaboGradientBlock("blue", 1, theme),
  
  // Spelarbild
  createHaboPlayerBlock("hero", "/images/player.jpg", 3, theme),
  
  // Logotyp med anpassad storlek
  createHaboLogoBlock("logo", theme, { logoSize: 1/3 }),
  
  // Textmönster (Habo-specifikt)
  createHaboTextPattern(2, "HABO IDROTTSFÖRENING ", theme),
  
  // Smart huvudrubrik med line-wrapping
  createHaboMainHeader(5, "BARTHOLOMEW WELLINGTON", "Mittfältare", theme, 1080)
];

addComponentsToCanvas(canvas, manualComponents);
```

### Funktioner som demonstreras:
- ✅ **Agnostisk arkitektur**: Core-funktioner separerade från Habo-specifik kod
- ✅ **Smart text-hantering**: Automatisk skalning och line-wrapping
- ✅ **Layer-hierarki**: Korrekt rendering-ordning  
- ✅ **Grid-baserad positionering**: CSS Grid integration
- ✅ **Responsiv design**: Canvas-width baserad skalning
- ✅ **Font-hantering**: Korrekt italic och primär/sekundär fonts
- ✅ **Offset-positionering**: Exakt textplacering