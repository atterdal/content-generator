# Habo IF Grafikgenerator - Projektdokumentation

## Projektöversikt

En webbaserad plattform för att generera professionellt grafiskt material för Habo IFs olika lag. Plattformen möjliggör för lagledare att hantera spelarinformation och automatiskt generera bilder för sociala medier, affischer och annat marknadsföringsmaterial med ett enhetligt designsystem.

## Teknisk Stack

- **Frontend/Backend:** NextJS 14+ (App Router)
- **Databas:** Supabase (PostgreSQL)
- **Autentisering:** Supabase Auth
- **Bildgenerering:** Graphics Engine (Canvas API baserad)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Projektfaser

### Fas 1: MVP/Proof of Concept

**Mål:** Bevisa konceptet med grundläggande funktionalitet och exempeldata

**Omfattning:**
- Enkel hemsida med grundläggande design
- Hårdkodad data för 3 exempelspelare
- En grundläggande bildmall (laguppställning)
- Graphics Engine v3 med smart text-hantering
- Export av genererad bild (PNG/JPG)
- Responsiv design för desktop och mobil

**Leverabler:**
- ✅ Fungerande demo-applikation
- ✅ Grundläggande UI/UX design  
- ✅ Graphics Engine v3 implementerad med agnostisk arkitektur
- ✅ Smart text-hantering med automatisk skalning och line-wrapping
- ✅ Dokumentation av tekniska val

### Fas 2: Databas och Användarhantering

**Mål:** Implementera databasstruktur och grundläggande användarhantering

**Omfattning:**
- Supabase-setup med databasschema
- Grundläggande autentisering (registrering/inloggning)
- CRUD-operationer för spelare
- Enkel användarroll (lagledare)
- Datavalidering och felhantering

**Leverabler:**
- Fungerande databasstruktur
- Autentiseringssystem
- Spelardatahantering
- Användarhandboken (grundläggande)

### Fas 3: Utökad Funktionalitet

**Mål:** Utöka med fler mallar och förbättrad användarupplevelse

**Omfattning:**
- Fler bildmallar (spelarprofiler, statistik, matchdagsgrafik)
- Bilduppladdning för spelare
- Laghantering (flera lag per användare)
- Förbättrad editor för bildanpassning
- Förhandsgranskning av mallar

**Leverabler:**
- 5-8 olika bildmallar
- Bilduppladdningsfunktion
- Laghanteringssystem
- Förbättrad användarupplevelse

### Fas 4: Designsystem och Anpassning

**Mål:** Implementera Habo IFs visuella identitet och anpassningsmöjligheter

**Omfattning:**
- Habo IFs färger, logotyper och typsnitt
- Anpassningsbara mallar (färger, layout)
- Mallbibliotek organiserat efter kategori
- Batch-export av bilder
- Kvalitetskontroll och optimering

**Leverabler:**
- Komplett designsystem
- Varumärkesanpassade mallar
- Batch-exportfunktion
- Optimerad prestanda

### Fas 5: Administration och Skalning

**Mål:** Administratörsfunktioner och förberedelse för skalning

**Omfattning:**
- Administratörsroll för klubbadministration
- Användarhantering på klubbnivå
- Statistik och användningsanalys
- Backup och återställningsfunktioner
- Säkerhetsförbättringar

**Leverabler:**
- Administratörspanel
- Användarhanteringssystem
- Analysverktyg
- Säkerhetsimplementation

### Fas 6: Avancerade Funktioner

**Mål:** Avancerade funktioner och integrationer

**Omfattning:**
- API-integrationer (matcher, tabeller)
- Automatisk schemalagd publicering
- Malldelning mellan lag
- Avancerade designverktyg
- Mobilapp (PWA)
- Integrationer med sociala medier

**Leverabler:**
- API-integrationer
- Schemalagd publicering
- PWA-implementation
- Social media-integrationer

## Systemarkitektur

### Databasschema (Grundläggande)

```sql
-- Användare (hanteras av Supabase Auth)
users (
  id UUID PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMP
)

-- Lag
teams (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  manager_id UUID REFERENCES users(id),
  created_at TIMESTAMP
)

-- Spelare
players (
  id UUID PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  name TEXT NOT NULL,
  jersey_number INTEGER,
  position TEXT,
  image_url TEXT,
  birth_date DATE,
  created_at TIMESTAMP
)

-- Genererade bilder (för historik)
generated_images (
  id UUID PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  template_type TEXT,
  image_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP
)
```

### Mappstruktur (NextJS)

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── teams/
│   ├── players/
│   ├── templates/
│   └── api/
├── components/
│   ├── ui/
│   ├── forms/
│   ├── templates/
│   └── generators/
├── lib/
│   ├── supabase/
│   ├── graphics-engine/
│   │   └── types.ts          # Core Graphics Engine
│   └── utils/
├── apps/
│   └── habo-if/
│       ├── components/
│       │   └── HaboComponents.ts  # Habo IF specifika komponenter
│       └── config/
│           └── brand.ts       # Habo IF brand-konfiguration
└── types/
```

## Säkerhet och Behörigheter

### Användarroller
- **Lagledare:** Kan hantera sitt eget lag och spelare
- **Administratör:** Kan hantera alla lag och användare (Fas 5)

### Säkerhetsåtgärder
- Row Level Security (RLS) i Supabase
- Bilduppladdning med storleks- och formatvalidering
- Rate limiting för API-anrop
- Input-validering på både client och server

## Designprinciper

### Användbarhet
- Intuitiv navigation
- Minimal inlärningskurva
- Snabb återkoppling vid aktioner
- Responsiv design för alla enheter

### Prestanda
- Optimerade bilder och assets
- Lazy loading av mallar
- Caching av genererade bilder
- Snabb första laddning

### Tillgänglighet
- WCAG 2.1 AA-compliance
- Tangentbordsnavigation
- Skärmläsarstöd
- Hög kontrast-läge

## Tekniska Överväganden

### Bildgenerering
- Graphics Engine v3 för dynamisk bildgenerering
- Block/Floater-baserad arkitektur med smart text-hantering
- Agnostiskt system som kan användas för andra organisationer
- WebP-format för optimerade bilder
- PNG/JPG för kompatibilitet

### Prestanda
- Next.js Image Optimization
- CDN för statiska assets (Vercel)
- Databas-indexering för snabba queries
- Caching-strategi för mallar

### Skalbarhet
- Komponentbaserad arkitektur
- API-driven design
- Modulär mallstruktur
- Microservices-redo (framtida expansion)

## Testning

### Fas 1-2: Grundläggande testning
- Manuell testning
- Grundläggande enhetstester
- Cross-browser-testning

### Fas 3+: Utökad testning
- Automatiserade enhetstester
- Integrationstester
- E2E-tester med Playwright
- Performance-testning

## Underhåll och Support

### Dokumentation
- Användarmanual
- Teknisk dokumentation
- API-dokumentation
- Troubleshooting-guide

### Monitoring
- Error tracking (Sentry)
- Performance monitoring
- Användningsstatistik
- Backup-strategi

---

*Detta dokument uppdateras kontinuerligt under projektets gång*