# TODO för Graphics Engine

Här är en lista över planerade uppgifter, buggfixar och framtida funktioner för detta projekt.

---

## ✅ Färdigt (Nyligen Slutfört)

- [x] **Graphics Engine Refaktorering**: Flyttat all specialkod till generella funktioner
- [x] **Smart Text-hantering**: Implementerat intelligent scaling och line-wrapping i `addText`
- [x] **Agnostiskt System**: Separerat Habo IF-specifik kod från generell funktionalitet  
- [x] **Förenklad API**: `addText`, `addBackground`, `addImage` för både Block och Floater
- [x] **Overlay-förenkling**: Overlay är nu bara en Floater med två `addText` element
- [x] **Text Transform**: Stöd för uppercase/lowercase/capitalize/none
- [x] **Typsnitt Integration**: Korrekt hantering av HABO_IF fonts (Alverata primary, PT Serif secondary)
- [x] **Position Control**: Offset-parametrar för exakt textpositionering

---

## Hög Prioritet / Pågående

- [ ] **Grid-overlay visualisering**: Spräng-vy med grid-lines för utveckling
- [ ] **Error Handling**: Bättre felhantering när bilder inte laddas
- [ ] **Performance**: Optimera rendering för stora canvas
- [ ] **Font Preloading**: Säkerställ att fonts laddas innan rendering

---

## Medium Prioritet

- [ ] **Responsive Images**: Smart bildhantering baserat på canvas-storlek
- [ ] **Animation Support**: Grundläggande animationsstöd mellan layers
- [ ] **Template System**: Fördefinierade mallar för vanliga layouts
- [ ] **Export Optimization**: Bättre komprimering och format-stöd

---

## Låg Prioritet / Framtida Funktioner

- [ ] **Multi-language**: Stöd för andra språk än svenska
- [ ] **Theme Variations**: Olika färgteman för olika säsonger
- [ ] **Bulk Operations**: Batch-generering av flera bilder
- [ ] **Advanced Typography**: Mer avancerad texthantering (kerning, leading, etc.)
- [ ] **Plugin System**: Möjlighet att utöka med plugins

---

## Dokumentation

- [x] **Graphics Engine Docs**: Uppdaterad dokumentation för nya systemet
- [ ] **API Reference**: Komplett referens för alla funktioner
- [ ] **Examples Gallery**: Showcase av alla möjligheter
- [ ] **Migration Guide**: Guide för att migrera från gamla systemet

---

## Arkitektur / Teknisk Skuld

- [ ] **TypeScript Strikta**: Slå på striktare TypeScript-regler
- [ ] **Test Coverage**: Enhetstester för alla graphics engine funktioner  
- [ ] **CI/CD Pipeline**: Automatiserade tester och deployment
- [ ] **Performance Monitoring**: Mätning av renderingstid och minnesanvändning

---

## Kända Buggar

Inga kända buggar för närvarande! 🎉

---

## Färdiga Milstolpar

### v3.0 - Graphics Engine Refactor ✅
- Komplett omskrivning till agnostiskt system
- Smart text-hantering med intelligent line-wrapping
- Förenklad API med konsistent namngivning
- Separation mellan generell och organisationsspecifik kod