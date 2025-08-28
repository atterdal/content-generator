# GraphicsService Dokumentation

## Översikt

`GraphicsService` är en Habo IF-specifik service som abstraherar bort komplexiteten i graphics engine och tillhandahåller en enkel API för grafikgenerering. Servicen hanterar både enskild grafik och batch-generering.

## Placering och Arkitektur

```
src/apps/habo-if/services/GraphicsService.ts
```

**Viktigt:** GraphicsService ligger i Habo IF-appens mapp, inte i det generiska biblioteket, eftersom den innehåller Habo-specifik logik.

## Interfaces

### GraphicsGenerationOptions
```typescript
interface GraphicsGenerationOptions {
  templateType: string;           // 'matchday', 'goal-scorer', 'player-of-match', etc.
  teamName: string;              // Lagnamn, t.ex. "Habo IF P15"
  layoutIndex?: number;          // Index för layout (0-5)
  themeIndex?: number;           // Index för färgtema (0-N)
  includeWatermark?: boolean;    // Inkludera vattenmärke
  mainText?: string;             // Huvudtext för overlay
  subText?: string;              // Undertext för overlay
  data?: any;                    // Template-specifik data
}
```

### GeneratedGraphic
```typescript
interface GeneratedGraphic {
  canvas: HTMLCanvasElement;     // Canvas-element
  dataURL: string;              // Data URL för förhandsvisning
  blob: Blob;                   // Blob för nedladdning
}
```

## API-referens

### generateGraphic()
Genererar en enskild grafik.

```typescript
static async generateGraphic(options: GraphicsGenerationOptions): Promise<GeneratedGraphic>
```

**Exempel:**
```typescript
const graphic = await GraphicsService.generateGraphic({
  templateType: 'matchday',
  teamName: 'Habo IF P15',
  layoutIndex: 2,
  themeIndex: 0,
  includeWatermark: true,
  mainText: 'MOT MULLSJÖ IF',
  subText: '2024-03-15 • 14:00',
  data: { opponent: 'Mullsjö IF', date: '2024-03-15', time: '14:00' }
});

// Visa förhandsvisning
document.getElementById('preview').src = graphic.dataURL;

// Ladda ner
const link = document.createElement('a');
link.download = 'matchday.png';
link.href = URL.createObjectURL(graphic.blob);
link.click();
```

### generateBatchGraphics()
Genererar flera grafiker baserat på en array av data.

```typescript
static async generateBatchGraphics(
  baseOptions: Omit<GraphicsGenerationOptions, 'layoutIndex' | 'themeIndex'>,
  items: any[],
  getContentForItem?: (item: any, index: number) => { mainText: string; subText: string; data?: any }
): Promise<{ graphic: GeneratedGraphic; filename: string; item: any }[]>
```

**Exempel:**
```typescript
// Automatisk innehållsextrahering
const results = await GraphicsService.generateBatchGraphics(
  {
    templateType: 'goal-scorer',
    teamName: 'Habo IF P15',
    includeWatermark: true
  },
  players // Array med spelaobjekt
);

// Custom innehållsextrahering
const results = await GraphicsService.generateBatchGraphics(
  {
    templateType: 'custom',
    teamName: 'Habo IF P15'
  },
  customData,
  (item, index) => ({
    mainText: item.title.toUpperCase(),
    subText: item.description,
    data: item
  })
);

// Skapa ZIP för nedladdning
const zip = new JSZip();
results.forEach(result => {
  zip.file(result.filename, result.graphic.blob);
});
const zipBlob = await zip.generateAsync({ type: 'blob' });
```

## Template-typer

### Fördefinierade typer

#### 'matchday'
- **Huvudtext:** Motståndarnamn
- **Undertext:** Datum och tid
- **Overlay:** `createMatchOverlay()`
- **Data:** `{ opponent, date, time, venue, competition }`

#### 'goal-scorer'
- **Huvudtext:** Spelarnamn
- **Undertext:** "MÅLSKYTT #[nummer]"
- **Overlay:** `createPlayerSpotlightOverlay()`
- **Data:** `{ name, number, position }`

#### 'player-of-match'
- **Huvudtext:** Spelarnamn
- **Undertext:** "MATCHENS LIRARE • [position]"
- **Overlay:** `createPlayerSpotlightOverlay()`
- **Data:** `{ name, position, number }`

#### 'training'
- **Huvudtext:** Träningsfokus
- **Undertext:** Plats och tid
- **Overlay:** `createTrainingOverlay()`
- **Data:** `{ focus, location, date, time }`

#### 'player'
- **Huvudtext:** Spelarnamn
- **Undertext:** Custom meddelande
- **Overlay:** `createPlayerSpotlightOverlay()`
- **Data:** `{ name, position, message }`

### Custom template-typer
För andra template-typer används `createHaboMainHeader()` som fallback.

## Interna funktioner

### Layer-system
Servicen bygger upp grafiken i lager enligt graphics engine standarder:

1. **Layer 0:** Bakgrund (dynamiska spelarbilder med overlay)
2. **Layer 1:** Färgblock baserat på layout
3. **Layer 2:** Textmönster (vattenmärke)
4. **Layer 3:** Hero-block (spelarbilder)
5. **Layer 4:** Logotyp
6. **Layer 5:** Innehållsoverlay

### Automatisk variation
- **Layout:** Roterar genom alla 6 layouter per batch
- **Tema:** Roterar genom alla tillgängliga färgteman
- **Bakgrund:** Slumpmässigt vald från 5 spelarbilder

### Filnamn-generering
Automatisk generering av beskrivande filnamn:

```typescript
// Matchdag: matchday-Mullsjö-IF-2024-03-15.png
// Målskytt: goal-scorer-Marcus-Andersson.png
// Matchens lirare: player-of-match-Emma-Nilsson.png
// Fallback: Habo-IF-P15-custom-1.png
```

## Användning i komponenter

### Create-sida
```typescript
const generateGraphic = async () => {
  const graphic = await GraphicsService.generateGraphic({
    templateType: templateId,
    teamName: teamData.teamName,
    layoutIndex: parseInt(selectedLayout),
    themeIndex: parseInt(selectedTheme),
    includeWatermark,
    mainText: getOverlayMainText(),
    subText: getOverlaySubText(),
    data: formData
  });

  setPreviewUrl(graphic.dataURL);
};
```

### Bulk-generate-sida
```typescript
const generateBatch = async () => {
  const results = await GraphicsService.generateBatchGraphics(
    {
      templateType: templateId,
      teamName: teamData.teamName,
      includeWatermark: true
    },
    itemsToGenerate
  );

  // Konvertera till UI-format
  const files = results.map(result => ({
    name: result.filename,
    type: templateId,
    blob: result.graphic.blob,
    generated: new Date().toLocaleTimeString(),
    size: '1080x1080'
  }));
  
  setGeneratedFiles(files);
};
```

## Fördelar

### För utvecklare
- **DRY:** Eliminerar duplicerad kod mellan create/bulk-generate
- **Testbar:** Service kan mockas och testas isolerat
- **Konsistent:** Samma renderingslogik överallt
- **Skalbar:** Lätt att lägga till nya template-typer

### För prestanda
- **Optimerad:** Återanvänder graphics engine effektivt
- **Asynkron:** Stödjer progress-tracking för batch-generering
- **Minneseffektiv:** Rensa bort temporära canvaser automatiskt

### För arkitektur
- **Separation:** Håller Habo-specifik logik separerad från generiska bibliotek
- **Abstraktion:** Döljer komplexitet från UI-komponenter
- **Återanvändbar:** Kan användas från flera komponenter

## Migration från gammal kod

### Före (duplicerad logik)
```typescript
// create/page.tsx - 200+ rader duplicerad canvas-kod
// bulk-generate/page.tsx - 300+ rader duplicerad canvas-kod
```

### Efter (service-baserad)
```typescript
// create/page.tsx - 20 rader service-anrop
// bulk-generate/page.tsx - 50 rader service-anrop
// GraphicsService.ts - 400 rader återanvändbar logik
```

## Framtida utökningar

### Planerade funktioner
- **Caching:** Cacha genererade grafiker
- **Templates:** Lagrade templates per lag
- **Scheduling:** Schemalagd generering
- **Analytics:** Tracking av populära template-typer

### Möjliga förbättringar
- **WebWorkers:** Flytta rendering till background threads
- **Progressive loading:** Stegvis rendering för stora batchar
- **Custom layouts:** Användardefinierade layouter per lag

---

**Version:** 1.0  
**Skapad:** 2025-08-28  
**Del av:** Habo IF Grafikgenerator v3.1