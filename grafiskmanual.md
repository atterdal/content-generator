# Habo IF - Grafisk Manual
## Digital Grafikgenerator

---

## Övergripande Designfilosofi

Habo IFs grafiska identitet bygger på **kontrast, dramatik och professionalism**. Designsystemet skapar visuellt starka budskap genom att kombinera klubbens traditionella färger med modern grafisk design och dynamiska layouter.

### Kärnprinciper
- **Boldhet över försiktighet** - våga ta plats visuellt
- **Kontrast för läsbarhet** - alltid WCAG AA-kompatibel text
- **Flexibilitet inom struktur** - kreativitet inom tydliga ramar
- **Professionell kvalitet** - alla material ska kännas premium

---

## Färgpalett

### Primära Färger

| Färg | Hex-kod | Användning | Kontrast |
|------|---------|------------|----------|
| **Royal Blue** | `#0629A0` | Huvudfärg, bakgrunder, text | Hög kontrast mot vitt |
| **Heritage Gold** | `#B6975C` | Accenter, text, detaljer | God kontrast mot vitt och blå |
| **Pure White** | `#FFFFFF` | Text på mörka bakgrunder, logotyp | Maximal kontrast |

### Sekundära Färger

| Färg | Hex-kod | Användning |
|------|---------|------------|
| **Blue Void** | `#041b70` | Mörka bakgrunder, dramatiska effekter |
| **Light Blue** | `#4a7bc8` | Gradienter, ljusare accenter |
| **Gradient Primary** | `linear-gradient(135deg, #0629A0 0%, #1a4cb8 100%)` | Knappar, call-to-action |

### Bakgrundsfärger

| Färg | Hex-kod | Användning |
|------|---------|------------|
| **Classic Beige** | `#f0ede6` | Standard bakgrund, neutrala områden |
| **Pure White** | `#FFFFFF` | Alternativ bakgrund, kontrast |
| **Deep Background** | `#faf8f3` | Alternativ beige, mjukare ton |

---

## Grid-system

### Grundläggande Struktur

**Format:** 6 rader × 4 kolumner (6h × 4w)  
**Canvas:** 1080×1080px (kvadratisk för sociala medier)  
**Cell-storlek:** 270px × 180px (rektangulära celler)

### Grid-regler

1. **Totalt 4-6 block per layout** (max 6 block för att behålla enkelhet)
2. **Hero-blocket är alltid 2×4** (2 bred × 4 hög = 8 celler)
3. **Tessellering krävs** - inga luckor eller överlapp tillåts
4. **Asymmetrisk balans** föredras över symmetri

### Block-typer

#### Hero-block (Spelarbild)
- **Storlek:** 2×4 (konstant)
- **Placering:** Vänster, central, eller höger
- **Innehåll:** Spelarbild med blå overlay/filter
- **Syfte:** Huvudfokus i designen

#### Text-block
- **Beige text:** `#B6975C` på beige bakgrund
- **Blå text:** `#FFFFFF` på blå bakgrund  
- **Vertikal text:** Roterad 90° moturs, vit på blå
- **Storlekar:** 1×2 till 4×2 beroende på innehåll

#### Accent-block
- **Blå gradienter:** 50° vinkel från övre vänster
- **Logotyp-block:** Vit cirkel med Habo IF-logotyp
- **Beige block:** Neutrala utrymmen för balans

---

## Layout-system

### Fördefinierade Layouter

#### Layout 1: Hero Vänster
```
[BEIGE TEXT    ][BLUE TEXTURE  ]
[HERO  ][HERO  ][BLUE    ][VERT]
[IMAGE ][IMAGE ][TEXTURE][TEXT]
[BLOCK ][BLOCK ][BLUE    ][VERT]
[      ][      ][TEXTURE][TEXT]
[LOGO  ][      ][        ][    ]
```

#### Layout 2: Hero Central  
```
[BLUE TEXTURE HELA RADEN     ]
[BLUE ][HERO  ][HERO  ][BEIGE]
[TEXT ][IMAGE ][IMAGE ][LOGO ]
[BLUE ][BLOCK ][BLOCK ][BEIGE]
[TEXT ][      ][      ][     ]
[BLUE TEXT HELA RADEN        ]
```

#### Layout 3: Hero Höger
```
[BEIGE][BEIGE ][BLUE TEXTURE  ]
[TEXT ][TEXT  ][HERO  ][HERO  ]
[VERT ][LOGO  ][IMAGE ][IMAGE]
[TEXT ][BLUE  ][BLOCK ][BLOCK]
[VERT ][TEXTUR][      ][      ]
[BLUE TEXTURE ][              ]
```

### Layout-variation

**Slumpning sker på två nivåer:**
1. **Layout-arrangemang** (6 olika fördefinierade layouter)
2. **Färgtema** (3 olika teman: Classic, Deep, Bright)

**Totalt 18 möjliga kombinationer** som säkerställer variation utan att kompromissa med kvaliteten.

---

## Typografi

### Texthierarki

#### Primär text (Rubriker)
- **Storlek:** 24-32px
- **Vikt:** Bold
- **Färg:** `#B6975C` på beige, `#FFFFFF` på blå
- **Användning:** "LOREM IPSUM DOLOR SIT AMET", spelarnamn

#### Sekundär text (Information)
- **Storlek:** 18-24px  
- **Vikt:** Bold
- **Färg:** `#FFFFFF` på blå bakgrund
- **Användning:** Matchinformation, datum, undertexter

#### Vertikal text
- **Rotation:** -90° (moturs)
- **Storlek:** 20-28px
- **Färg:** `#FFFFFF` på blå stripe
- **Användning:** "LOREM IPSUM DOLOR SIT" längs kanter

### Accessibility
- **Minsta kontrast:** 4.5:1 (WCAG AA)
- **Text på blå:** Endast vit (`#FFFFFF`) för maximal läsbarhet
- **Text på beige:** Guld (`#B6975C`) eller blå (`#0629A0`)
- **Minsta textstorlek:** 18px

---

## Bildbehandling

### Spelarbilder (Hero-block)

#### Bildkrav
- **Format:** JPEG eller PNG
- **Upplösning:** Minst 540×720px (för 2×4 block)
- **Orientering:** Porträtt (vertikal)
- **Kvalitet:** Hög skärpa, god belysning

#### Stilar och Filter
1. **Dramatisk** - Intensiv blå ton, hög kontrast
2. **Professionell** - Ren, tydlig, god belysning  
3. **Artistisk** - Mjukare, stämningsfull, atmospheric
4. **High-key** - Ljus, nästan överexponerad känsla

#### Teknisk Implementation
```css
/* Blå overlay för dramatisk effekt */
background: linear-gradient(
  135deg, 
  rgba(6, 41, 160, 0.7) 0%, 
  rgba(4, 27, 112, 0.9) 100%
);
mix-blend-mode: multiply;
```

### Bakgrundstexturer

#### Blå Gradienter
- **Riktning:** 50° från övre vänster till nedre höger
- **Färger:** Ljus blå (`#4a7bc8`) till mörk blå (`#0629A0`)
- **Användning:** Accent-block, dekorativa områden

```css
background: linear-gradient(
  50deg, 
  #4a7bc8 0%, 
  #0629A0 100%
);
```

---

## Logotyp-användning

### Habo IF Logotyp

#### Primär logotyp (färgad)
- **Användning:** På beige eller vita bakgrunder
- **Minimistorlek:** 60×60px
- **Skyddszon:** Minst 20px runt logotypen

#### Sekundär logotyp (vit)
- **Användning:** På blå bakgrunder
- **Samma storleksregler som primär

#### Logotyp i Grid-system
- **Placering:** Alltid i beige block
- **Position:** Vanligtvis övre höger eller nedre vänster i blocket
- **Storlek:** 40% av blockets minsta dimension

---

## Tekniska Specifikationer

### Canvas och Export

#### Sociala Medier (1:1)
- **Canvas:** 1080×1080px
- **Format:** PNG (bästa kvalitet)
- **Användning:** Instagram posts, Facebook

#### Print och Digitalt Material
- **Canvas:** Skalbar baserat på grid-system
- **DPI:** 300 för print, 72 för digitalt
- **Format:** PNG för digitalt, PDF för print

### Grid-implementation

```javascript
// Grid-konfiguration
const gridConfig = {
  cols: 4,
  rows: 6,
  canvasWidth: 1080,
  canvasHeight: 1080,
  cellWidth: 270,  // canvasWidth / cols
  cellHeight: 180  // canvasHeight / rows
};

// Hero-block konfiguration
const heroBlock = {
  width: 2,  // celler
  height: 4, // celler
  pixelWidth: 540,   // 2 × 270
  pixelHeight: 720   // 4 × 180
};
```

---

## Kvalitetskontroll

### Pre-flight Checklist

#### Före Generering
- [ ] Spelarbild uppfyller kvalitetskrav
- [ ] Text är tydlig och läsbar
- [ ] Färgkontrast är godkänd (WCAG AA)
- [ ] Layout tessellerar korrekt

#### Efter Generering
- [ ] All text är läsbar i rätt storlek
- [ ] Habo IF-logotyp är synlig och korrekt placerad
- [ ] Färger matchar brand-guidelines
- [ ] Bildkvalitet är acceptable för medium

### Vanliga Fel att Undvika

❌ **Fel att undvika:**
- Text som är för liten (<18px)
- Låg kontrast mellan text och bakgrund
- Hero-block som inte är exakt 2×4
- Fler än 6 block i en layout
- Symmetriska layouter (undvik perfekt symmetri)

✅ **Bästa praxis:**
- Använd assymetrisk balans
- Låt hero-blocket dominera visuellt
- Håll layouten enkel (4-6 block max)
- Säkerställ god läsbarhet på alla enheter

---

## Exempel på Användning

### Sociala Medier
- **Instagram Posts:** Spelarporträtt, matchdag-information
- **Facebook:** Laguppställningar, resultat
- **Twitter:** Snabba uppdateringar, målcelebreringar

### Print Material
- **Affischer:** Matchannonsering, spelarporträtt
- **Flyers:** Evenemang, medlemsrekrytering
- **Program:** Matchprogram, säsongsinformation

### Digital Material
- **Hemsida:** Banners, nyhetsgrafik
- **Nyhetsbrev:** Headers, featured content
- **Presentationer:** Club presentations, sponsormaterial

---

## Teknisk Implementation

### CSS Variabler
```css
:root {
  --habo-heritage-gold: #B6975C;
  --habo-pure-white: #FFFFFF;
  --habo-royal-blue: #0629A0;
  --habo-blue-void: #041b70;
  --habo-light-blue: #4a7bc8;
  --habo-classic-beige: #f0ede6;
  --habo-gradient-primary: linear-gradient(135deg, #0629A0 0%, #1a4cb8 100%);
  --habo-gradient-50deg: linear-gradient(50deg, #4a7bc8 0%, #0629A0 100%);
}
```

### Grid Klasser
```css
.habo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 1080px;
  height: 1080px;
}

.habo-hero-block {
  grid-column: span 2;
  grid-row: span 4;
}

.habo-text-block {
  background: var(--habo-classic-beige);
  color: var(--habo-heritage-gold);
  font-weight: bold;
}

.habo-blue-block {
  background: var(--habo-gradient-50deg);
  color: var(--habo-pure-white);
}
```

---

## Framtida Utveckling

### Fas 2: Utökade Format
- **16:9 Grid-system** för landskapsformat
- **A4 Grid-system** för print-material
- **Responsiva layouter** för olika skärmstorlekar

### Fas 3: Avancerade Funktioner
- **Animerade element** för digitala kanaler
- **Video-templates** för sociala medier
- **Interaktiva element** för webb

### Fas 4: AI-integration
- **Automatisk bildoptimering** baserat på innehåll
- **Smart layout-förslag** baserat på bildtyp
- **Automatisk text-placering** för optimal läsbarhet

---

## Kontakt och Support

**Utveckling:** Habo IF Digital Team  
**Design:** Baserat på Habo IFs visuella identitet  
**Teknisk Support:** Se projektdokumentation  

**Version:** 1.0  
**Senast uppdaterad:** Augusti 2025  

---

*Denna manual uppdateras kontinuerligt när nya funktioner och förbättringar läggs till i grafikgeneratorn.*