# Habo IF Grafikgenerator

En professionell webbaserad grafikgenerator för Habo IF som följer den visuella identiteten enligt den grafiska manualen.

## 🚀 Kom igång

### Installation
```bash
npm install
```

### Miljövariabler
Skapa `.env.local` med dina Supabase-uppgifter:
```env
NEXT_PUBLIC_SUPABASE_URL=din_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_anon_key
SUPABASE_SERVICE_ROLE_KEY=din_service_role_key
```

### Utveckling
```bash
npm run dev        # Startar utvecklingsserver
npm run build      # Bygger för produktion
npm run lint       # Kör ESLint
npm run typecheck  # Kör TypeScript typkontroll
```

Öppna [http://localhost:3000](http://localhost:3000)

## 📐 Arkitektur

### Graphics Engine
Systemet bygger på en agnostisk graphics engine med Block/Floater-arkitektur:

- **Block**: Grid-positionerade element (bilder, färgblock, logotyper)
- **Floater**: Canvas-täckande element (bakgrunder, overlays, mönster)
- **Layer-system**: 0-5 lager för strukturerad rendering

### Huvudkomponenter

```
src/
├── apps/habo-if/                # Habo IF-specifik kod
│   ├── components/
│   │   └── HaboComponents.ts    # Habo IF komponenter
│   ├── generators/
│   │   └── haboLayerGenerator.ts # Layer-generering för Habo IF
│   └── config/
│       └── brand.ts              # Varumärkeskonfiguration
│
├── lib/graphics-engine/          # Agnostisk graphics engine
│   ├── Canvas.ts                 # Canvas rendering (createGenericCanvas)
│   ├── types.ts                  # Block/Floater klasser
│   ├── layouts.ts                # Standard layouter (6 st)
│   ├── layerExporter.ts          # Export av individuella lager
│   └── exploded3d.ts             # 3D-visualiseringar
│
└── app/                          # Next.js App Router
    ├── teams/                    # Lagledarsystem
    │   ├── login/                # Inloggning
    │   ├── [teamId]/
    │   │   ├── dashboard/        # Lagdashboard
    │   │   └── create/           # Skapa grafik
    │   └── layer-examples/       # Utvecklingsverktyg
    └── brand-guidelines/         # Varumärkesriktlinjer
```

## 🎨 Användning

### För lagledare
1. Logga in på `/teams/login`
2. Välj mall eller spelare från dashboard
3. Anpassa innehåll och stil
4. Exportera som PNG för sociala medier

### För utvecklare
- `/layer-examples` - Visualisera och testa lager
- Använd `haboLayerGenerator.ts` för alla genereringar
- Följ Block/Floater-mönstret för nya komponenter

## 🛠️ Teknisk Stack

- **Framework:** Next.js 15 med App Router
- **TypeScript:** För typsäkerhet
- **UI:** Mantine (migrereras från HeroUI)
- **Ikoner:** Lucide React
- **Styling:** Tailwind CSS + Mantine
- **Canvas:** Fabric.js
- **Databas:** Supabase

## 📋 Utvecklingsriktlinjer

### Ikoner
**VIKTIGT:** Använd ALLTID Lucide React ikoner istället för emojis i UI-komponenter.

```typescript
// ✅ RÄTT - Använd Lucide React
import { Volleyball, LogIn, AlertCircle, User } from 'lucide-react';
<Volleyball size={16} />
<LogIn size={20} />

// ❌ FEL - Använd INTE emojis
<span>⚽</span>
```

Lucide dokumentation: https://lucide.dev/icons/

## 📋 Designprinciper

### Grid-system
- **Format:** 4 kolumner × 6 rader
- **Canvas:** 1080×1080px
- **Cell:** 270×180px

### Färgpalett
- **Royal Blue:** #0629A0
- **Heritage Gold:** #B6975C
- **Classic Beige:** #f0ede6
- **Pure White:** #FFFFFF

### Layer-hierarki
```
Layer 5: Overlays
Layer 4: Text och logotyper
Layer 3: Hero-blocks (spelarbilder)
Layer 2: Textmönster
Layer 1: Färg- och gradientblock
Layer 0: Bakgrunder
```

## 🔧 API-referens

### Skapa grafik
```typescript
import { createGenericCanvas } from '@/lib/graphics-engine/Canvas';
import { createHaboMainHeader } from '@/apps/habo-if/components/HaboComponents';

const canvas = createGenericCanvas(canvasElement, layout, theme);
const header = createHaboMainHeader(5, "RUBRIK", "Undertext", theme, 1080);
canvas.addFloater(header);
await canvas.renderAll();
```

### Exportera lager
```typescript
import { exportHaboLayerExamples } from '@/apps/habo-if/generators/haboLayerGenerator';

const layers = await exportHaboLayerExamples(canvas, {
  postType: 'matchday',
  layoutId: 'layout-1',
  themeIndex: 0
});
```

## 📝 Status

### ✅ Implementerat
- Graphics Engine med Block/Floater-system
- Smart texthantering med line-wrapping
- Lagledarsystem med dashboard
- Layer-export och 3D-visualisering
- 6 standard layouter
- Responsiv design

### 🔄 Pågående
- Performance-optimering
- Utökade post-typer

### 📋 Planerat
- Batch-generering
- Schemaläggning
- API-integrationer

## 🤝 Support

För teknisk support, se [Graphics-Engine.md](./Graphics-Engine.md) för detaljerad dokumentation av renderingssystemet.

---

**Version:** 3.0  
**Utvecklad för:** Habo IF  
**Licens:** Privat