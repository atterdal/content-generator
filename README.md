# Habo IF Grafikgenerator

En professionell webbaserad grafikgenerator för Habo IF som följer den visuella identiteten enligt den grafiska manualen.

## Funktioner

- 🎨 **Flexibel layout-motor** med CSS Grid-baserat system
- 🎯 **3 färgteman** (Classic, Deep, Bright) för variation  
- 📐 **Flödes-baserad design** med Floaters och Blocks
- 🌈 **Automatisk gradientgenerering** enligt designsystemet
- 📝 **Intelligenta post-typer** (Matchday, Training, Result, Player Spotlight)
- 🔤 **Responsiv textskalning** med multiline-stöd
- 📱 **Responsiv design** för alla enheter
- 💾 **PNG-export** i 1080×1080px format
- 🗄️ **Databas-integration** för dynamiskt innehåll

## Designprinciper

### Grid-system
- **Format:** 4 kolumner × 6 rader (4×6)
- **Canvas:** 1080×1080px (kvadratisk)
- **Cell-storlek:** 270×180px

### Färgpalett
- **Royal Blue:** #0629A0
- **Heritage Gold:** #B6975C  
- **Classic Beige:** #f0ede6
- **Pure White:** #FFFFFF

### Nya Design System v3

#### Floaters (Canvas-wide)
- **Background Floater:** Fullskärms bakgrunder (färg, gradient, bild)
- **Pattern Floater:** Repeterade textmönster över hela canvas
- **Overlay Floater:** Centrerade textöverlager med responsiv skalning

#### Blocks (Grid-positioned)
- **Color Blocks:** Beige och gradient-block enligt layouter
- **Hero Blocks:** Spelarbild med intelligent passning
- **Text Blocks:** Flexibel text med multiline-stöd
- **Logo Blocks:** Logotyper med storleksbegränsning
- **Transparent Blocks:** Genomskinliga områden för komposition

#### Responsiv Textskalning
- **Intelligent multiline:** Automatisk radbrytning vid långa texter
- **Oberoende skalning:** Main- och sub-headers skalas individuellt
- **Smart orddelning:** Respekterar mellanslag vs bindestreck
- **Canvas-anpassad storlek:** Max 90% av canvas-bredd

## Teknisk Stack

- **Framework:** Next.js 15 (App Router)
- **TypeScript:** För typsäkerhet
- **UI Library:** HeroUI (NextUI fork) - Modern komponentbibliotek
- **Styling:** Tailwind CSS + HeroUI Theme System
- **Canvas:** HTML5 Canvas API
- **Databas:** Supabase (PostgreSQL)
- **Deployment:** Vercel-ready

## Kom igång

1. **Installera dependencies:**
   ```bash
   npm install
   ```

2. **Konfigurera miljövariabler:**
   Skapa `.env.local` med dina Supabase-uppgifter:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=din_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=din_anon_key
   SUPABASE_SERVICE_ROLE_KEY=din_service_role_key
   ```

3. **Starta utvecklingsserver:**
   ```bash
   npm run dev
   ```

4. **Öppna i webbläsare:**
   Navigera till [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Startar utvecklingsserver
- `npm run build` - Bygger för produktion
- `npm run start` - Startar produktionsserver
- `npm run lint` - Kör ESLint
- `npm run typecheck` - Kör TypeScript typkontroll

## Projektstruktur

```
src/
├── app/                 # Next.js App Router
│   ├── brand-guidelines/   # Brand guidelines med HeroUI
│   │   ├── colors/        # Färgpalett och användning
│   │   ├── typography/    # Typografi och hierarki
│   │   ├── logo/          # Logotyper och riktlinjer
│   │   ├── layouts/       # Grid-system och layouter
│   │   ├── photography/   # Fotografi och bildstil
│   │   ├── accessibility/ # WCAG och tillgänglighet
│   │   ├── applications/  # Tillämpningsexempel
│   │   ├── tone-voice/    # Ton och röst
│   │   └── who-we-are/    # Om Habo IF
│   └── generator/       # Grafikgenerator
├── components/          # React komponenter
│   ├── ui/             # UI-komponenter
│   │   ├── Dashboard.tsx    # Huvudkomponent för lagledare
│   │   └── PlayerList.tsx   # Spelarlista med genereringsknappar
├── lib/                 # Hjälpbibliotek
│   ├── design-system-v3/    # Nya designsystemet
│   │   ├── Canvas.ts        # Canvas rendering-motor
│   │   ├── builder.ts       # Fluent API för layout-bygge
│   │   └── types.ts         # TypeScript-typer för designsystemet
│   ├── database/           # Databas-logik
│   │   ├── postService.ts  # Post-genereringsservice
│   │   ├── postGenerator.ts # Post-innehållsgenerering
│   │   └── types.ts        # Databas-typer
│   ├── downloadUtils.ts   # ZIP-nedladdning
│   ├── fontLoader.ts     # Font-laddning
│   └── supabase.ts       # Supabase-konfiguration
├── types/               # TypeScript-typer
└── globals.css          # Globala CSS-variabler
```

## Utvecklingsfaser

### ✅ Fas 1: Designsystem v3 (Slutförd)
- Nya Canvas-baserade rendering-motor
- Flödes-baserad arkitektur (Floaters + Blocks)
- CSS Grid-driven layoutsystem
- Responsiv textskalning med multiline
- PNG-export funktionalitet

### ✅ Fas 2: Databas och Post-system (Slutförd)
- Supabase-integration
- Intelligenta post-typer (Match, Träning, Resultat, Spelar-spotlight)
- Dynamisk innehållsgenerering
- Context-baserad textanpassning

### ✅ Fas 3: Lagledare Dashboard (Slutförd)
- Dashboard för lagledare
- Batch-generering av grafiker
- ZIP-nedladdning av alla bilder
- Player spotlight med testdata

### ✅ Fas 4: Brand Guidelines 2.0 (Slutförd)
- HeroUI hybrid theme-system implementerat
- 9 brand guidelines-sidor konverterade till modern design
- Professionell card-baserad layout
- Motion animations för smooth transitions
- Konsistent navigation och responsive design

### 🔄 Fas 5: Lagledarsystem (Pågående)
- Lagledarinlogg med autentisering
- Team-specifika dashboards
- Social media post-generator för lag
- Batch-generering av lagspecifikt innehåll
- Roll-baserad åtkomstkontroll

### 📋 Fas 6: Produktion och Utbyggnad (Kommande)
- Fler post-typer och mallar
- Administratörsfunktioner
- Statistik och analytics
- Schemaläggning av posts

## Design System v3 - Teknisk Översikt

### Canvas Rendering Motor
Det nya designsystemet är byggt kring en kraftfull Canvas-motor som hanterar:

- **Layer-baserad rendering:** Element renderas i sekventiella lager (0-5)
- **Grid-parsing:** Intelligent tolkning av CSS Grid-mallar från databasen  
- **Bounding box-hantering:** Exakt positionering av element i pixel-rum
- **Flödes-optimering:** Parallell rendering av oberoende element

### Responsiv Text-teknologi
Avancerad textskalning som hanterar:

- **Multiline-algoritmer:** Smart radbrytning vid ordgränser
- **Proportionell skalning:** Bevarar visuell hierarki mellan text-element  
- **Context-medvetenhet:** Olika beteende för mellanslag vs bindestreck
- **Canvas-begränsningar:** Garanterar att text aldrig överskrider canvas-gränser

### Post-type System
Databas-drivet innehållssystem med:

- **Template-ärvning:** Grundmallar med överskridning per post-typ
- **Dynamic Content Building:** Kontextuell textgenerering baserat på data
- **Visibility Control:** Probabilistisk visning av element för variation

## Design Guidelines

Projektet följer Habo IF Grafisk Manual med fokus på:

- **Boldhet över försiktighet**
- **Kontrast för läsbarhet** (WCAG AA)
- **Flexibilitet inom struktur**
- **Professionell kvalitet**
- **Responsiv anpassning** för alla textlängder

## Kvalitetskontroll

### Pre-flight Checklist v3
- [ ] Färgkontrast är WCAG AA-kompatibel
- [ ] Grid-layout parsas korrekt från databas
- [ ] Responsiv text skalas inom canvas-gränser (max 90%)
- [ ] Multiline-text bryts intelligent vid ordgränser
- [ ] Main- och sub-headers skalas oberoende
- [ ] Mellanslag-baserad vs bindestreck-baserad text hanteras korrekt
- [ ] Layer-rendering följer specificerad ordning
- [ ] Habo IF-logotyp är synlig och proportionerlig
- [ ] Post-typ kontext appliceras korrekt

## Dokumentation

- **[DESIGN-SYSTEM-V3.md](./DESIGN-SYSTEM-V3.md)** - Detaljerad teknisk dokumentation av designsystemet
- **README.md** (detta dokument) - Projektöversikt och kom igång-guide

## Support

För teknisk support och frågor, se projektdokumentationen.

**Version:** 2.0 (Design System v3)  
**Utvecklad för:** Habo IF  
**Teknik:** Next.js + TypeScript + Supabase + Canvas API
