'use client';

import { 
  Card, 
  Button,
  Badge,
  Anchor,
  Checkbox
} from '@mantine/core';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

export default function AccessibilityPage() {
  const brand = HABO_IF_BRAND;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Anchor component={Link} href="/brand-guidelines" underline="never">
                <img 
                  src="/images/logos/habo-if-2025.png" 
                  alt="Habo IF"
                  className="h-8 object-contain"
                />
              </Anchor>
              <span 
                className="text-base font-black uppercase tracking-wider"
                style={{ 
                  color: brand.colors.royalBlue,
                  fontFamily: brand.typography.primary.fontFamily
                }}
              >
                TILLGÄNGLIGHET
              </span>
            </div>
            
            <Button 
              component={Link}
              href="/brand-guidelines"
              size="sm"
              className="text-white font-bold uppercase tracking-wider"
              style={{
                backgroundColor: brand.colors.royalBlue,
                fontFamily: brand.typography.primary.fontFamily,
                fontSize: '13px'
              }}
            >
              TILLBAKA
            </Button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tillgänglighet
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Habo IFs designsystem följer WCAG 2.1 AA-riktlinjer för att säkerställa att alla material är tillgängliga för personer med funktionsnedsättningar.
          </p>
        </motion.div>

        {/* Accessibility Overview */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border border-gray-200">
            <Card.Section className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                WCAG-principer
              </h2>
              <p className="text-gray-600">
                Våra riktlinjer följer WCAG 2.1 AA-standard för optimal tillgänglighet.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Color Contrast */}
                <Card className="shadow-sm">
                  <Card.Section className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto"
                         style={{ backgroundColor: brand.colors.royalBlue }}>
                      🎨
                    </div>
                    <h4 className="font-semibold mb-2">Färgkontrast</h4>
                    <p className="text-sm text-gray-600 mb-4">Minst 4.5:1 kontrastförhållande för normal text</p>
                    <Badge
                      size="sm"
                      style={{ color: brand.colors.heritageGold }}
                      variant="light"
                    >
                      WCAG AA
                    </Badge>
                  </Card.Section>
                </Card>

                {/* Typography */}
                <Card className="shadow-sm">
                  <Card.Section className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto"
                         style={{ backgroundColor: brand.colors.heritageGold }}>
                      📝
                    </div>
                    <h4 className="font-semibold mb-2">Typografi</h4>
                    <p className="text-sm text-gray-600 mb-4">Minst 18px textstorlek för optimal läsbarhet</p>
                    <Badge
                      size="sm"
                      style={{ color: brand.colors.royalBlue }}
                      variant="light"
                    >
                      {brand.typography.secondary.sizes.body}px minimum
                    </Badge>
                  </Card.Section>
                </Card>

                {/* Focus States */}
                <Card className="shadow-sm">
                  <Card.Section className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto"
                         style={{ backgroundColor: brand.colors.royalBlue }}>
                      🎯
                    </div>
                    <h4 className="font-semibold mb-2">Fokus</h4>
                    <p className="text-sm text-gray-600 mb-4">Tydliga fokusindikationer för tangentbordsnavigering</p>
                    <Badge
                      size="sm"
                      style={{ color: brand.colors.heritageGold }}
                      variant="light"
                    >
                      2px outline
                    </Badge>
                  </Card.Section>
                </Card>
              </div>
            </Card.Section>
          </Card>
        </motion.section>

        {/* Color Contrast */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border border-gray-200">
            <Card.Section className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Färgkontrast
              </h2>
              <p className="text-gray-600">
                Alla färgkombinationer i Habo IFs palett uppfyller WCAG AA-krav för tillgänglighet.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="space-y-8">
                {/* Good Contrasts */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-green-600 text-lg">✓</span>
                    <h4 className="text-lg font-semibold text-green-800">Godkända kombinationer</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Royal Blue on White */}
                    <Card className="shadow-sm" style={{ backgroundColor: brand.colors.pureWhite }}>
                      <Card.Section className="p-6">
                        <h5 
                          className="text-xl font-black uppercase mb-2"
                          style={{ 
                            fontFamily: brand.typography.primary.fontFamily,
                            color: brand.colors.royalBlue
                          }}
                        >
                          ROYAL BLUE
                        </h5>
                        <p 
                          className="text-sm mb-3"
                          style={{ 
                            fontFamily: brand.typography.secondary.fontFamily,
                            color: brand.colors.royalBlue
                          }}
                        >
                          På vit bakgrund
                        </p>
                        <Badge size="sm" color="green" variant="light">
                          Kontrast: 8.2:1 ✓
                        </Badge>
                      </Card.Section>
                    </Card>

                    {/* Heritage Gold on White */}
                    <Card className="shadow-sm" style={{ backgroundColor: brand.colors.pureWhite }}>
                      <Card.Section className="p-6">
                        <h5 
                          className="text-xl font-black uppercase mb-2"
                          style={{ 
                            fontFamily: brand.typography.primary.fontFamily,
                            color: brand.colors.heritageGold
                          }}
                        >
                          HERITAGE GOLD
                        </h5>
                        <p 
                          className="text-sm mb-3"
                          style={{ 
                            fontFamily: brand.typography.secondary.fontFamily,
                            color: brand.colors.heritageGold
                          }}
                        >
                          På vit bakgrund
                        </p>
                        <Badge size="sm" color="green" variant="light">
                          Kontrast: 5.1:1 ✓
                        </Badge>
                      </Card.Section>
                    </Card>

                    {/* White on Royal Blue */}
                    <Card className="shadow-sm" style={{ backgroundColor: brand.colors.royalBlue }}>
                      <Card.Section className="p-6">
                        <h5 
                          className="text-xl font-black uppercase mb-2 text-white"
                          style={{ fontFamily: brand.typography.primary.fontFamily }}
                        >
                          VIT TEXT
                        </h5>
                        <p 
                          className="text-sm text-white mb-3"
                          style={{ fontFamily: brand.typography.secondary.fontFamily }}
                        >
                          På blå bakgrund
                        </p>
                        <Badge size="sm" color="green" variant="light">
                          Kontrast: 8.2:1 ✓
                        </Badge>
                      </Card.Section>
                    </Card>
                  </div>
                </div>

                {/* Background Colors */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Bakgrundsfärger</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Classic Beige */}
                    <Card className="shadow-sm" style={{ backgroundColor: brand.colors.classicBeige }}>
                      <Card.Section className="p-6">
                        <h5 
                          className="text-lg font-black uppercase mb-2"
                          style={{ 
                            fontFamily: brand.typography.primary.fontFamily,
                            color: brand.colors.royalBlue
                          }}
                        >
                          CLASSIC BEIGE
                        </h5>
                        <p 
                          className="text-sm mb-3"
                          style={{ 
                            fontFamily: brand.typography.secondary.fontFamily,
                            color: brand.colors.heritageGold
                          }}
                        >
                          Neutral bakgrund för text-block
                        </p>
                        <div className="flex flex-col gap-1">
                          <Badge size="sm" color="green" variant="light">
                            Kontrast med blå: 7.8:1 ✓
                          </Badge>
                          <Badge size="sm" color="green" variant="light">
                            Kontrast med guld: 4.9:1 ✓
                          </Badge>
                        </div>
                      </Card.Section>
                    </Card>

                    {/* Deep Background */}
                    <Card className="shadow-sm border" style={{ backgroundColor: brand.colors.deepBackground }}>
                      <Card.Section className="p-6">
                        <h5 
                          className="text-lg font-black uppercase mb-2"
                          style={{ 
                            fontFamily: brand.typography.primary.fontFamily,
                            color: brand.colors.royalBlue
                          }}
                        >
                          DEEP BACKGROUND
                        </h5>
                        <p 
                          className="text-sm mb-3"
                          style={{ 
                            fontFamily: brand.typography.secondary.fontFamily,
                            color: brand.colors.heritageGold
                          }}
                        >
                          Alternativ beige-ton
                        </p>
                        <div className="flex flex-col gap-1">
                          <Badge size="sm" color="green" variant="light">
                            Kontrast med blå: 8.1:1 ✓
                          </Badge>
                          <Badge size="sm" color="green" variant="light">
                            Kontrast med guld: 5.2:1 ✓
                          </Badge>
                        </div>
                      </Card.Section>
                    </Card>
                  </div>
                </div>
              </div>
            </Card.Section>
          </Card>
        </motion.section>

        {/* Typography Accessibility */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border border-gray-200">
            <Card.Section className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Typografisk tillgänglighet
              </h2>
              <p className="text-gray-600">
                Typografiska riktlinjer som säkerställer läsbarhet för alla användare.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="space-y-8">
                {/* Font Sizes */}
                <Card className="bg-gray-50 shadow-sm">
                  <Card.Section className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Minsta textstorlekar</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <h5 
                          className="font-black uppercase mb-2"
                          style={{ 
                            fontFamily: brand.typography.primary.fontFamily,
                            color: brand.colors.royalBlue,
                            fontSize: `${brand.typography.primary.sizes.display}px`
                          }}
                        >
                          Aa
                        </h5>
                        <p className="text-sm text-gray-600">Display: {brand.typography.primary.sizes.display}px</p>
                      </div>
                      <div className="text-center">
                        <h5 
                          className="font-black uppercase mb-2"
                          style={{ 
                            fontFamily: brand.typography.primary.fontFamily,
                            color: brand.colors.royalBlue,
                            fontSize: `${brand.typography.primary.sizes.h1}px`
                          }}
                        >
                          Aa
                        </h5>
                        <p className="text-sm text-gray-600">H1: {brand.typography.primary.sizes.h1}px</p>
                      </div>
                      <div className="text-center">
                        <h5 
                          className="font-black uppercase mb-2"
                          style={{ 
                            fontFamily: brand.typography.primary.fontFamily,
                            color: brand.colors.royalBlue,
                            fontSize: `${brand.typography.primary.sizes.h2}px`
                          }}
                        >
                          Aa
                        </h5>
                        <p className="text-sm text-gray-600">H2: {brand.typography.primary.sizes.h2}px</p>
                      </div>
                      <div className="text-center">
                        <p 
                          className="mb-2"
                          style={{ 
                            fontFamily: brand.typography.secondary.fontFamily,
                            color: brand.colors.royalBlue,
                            fontSize: `${brand.typography.secondary.sizes.body}px`
                          }}
                        >
                          Aa
                        </p>
                        <p className="text-sm text-gray-600">Body: {brand.typography.secondary.sizes.body}px</p>
                      </div>
                    </div>
                  </Card.Section>
                </Card>

                {/* Reading Guidelines */}
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="shadow-sm">
                    <Card.Section className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Läsbarhet</h4>
                      <div className="space-y-3">
                        {[
                          {
                            title: 'Maximal radlängd',
                            description: 'Högst 65 tecken per rad för optimal läsbarhet'
                          },
                          {
                            title: 'Radavstånd',
                            description: '1.5× textstorleken för god läsbarhet'
                          },
                          {
                            title: 'Teckensnitt',
                            description: 'PT Serif för längre textstycken'
                          }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Badge size="sm" color="green" className="mt-0.5">✓</Badge>
                            <div>
                              <p className="font-medium text-gray-900">{item.title}</p>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Section>
                  </Card>

                  <Card className="shadow-sm">
                    <Card.Section className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Hierarki</h4>
                      <div className="space-y-3">
                        {[
                          {
                            title: 'Tydlig struktur',
                            description: 'Logisk hierarki med h1, h2, h3 taggar'
                          },
                          {
                            title: 'Fokusordning',
                            description: 'Rubriker innan brödtext, logisk läsordning'
                          },
                          {
                            title: 'Alt-text',
                            description: 'Alla bilder har beskrivande alternativtext'
                          }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Badge size="sm" color="blue" variant="light" className="mt-0.5">i</Badge>
                            <div>
                              <p className="font-medium text-gray-900">{item.title}</p>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Section>
                  </Card>
                </div>
              </div>
            </Card.Section>
          </Card>
        </motion.section>

        {/* Implementation Guidelines */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border border-gray-200">
            <Card.Section className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Implementation
              </h2>
              <p className="text-gray-600">
                Praktiska riktlinjer för att implementera tillgänglig design i alla Habo IF-material.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="space-y-8">
                {/* Digital Guidelines */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Digital material</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-green-50 border-green-200 shadow-sm">
                      <Card.Section className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-600 text-lg">✓</span>
                          <h5 className="font-medium text-green-800">Rekommenderat</h5>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>• Använd semantiska HTML-element</li>
                          <li>• Inkludera alt-text på alla bilder</li>
                          <li>• Testa med skärmläsare</li>
                          <li>• Säkerställ tangentbordsnavigering</li>
                          <li>• Använd ARIA-attribut när nödvändigt</li>
                        </ul>
                      </Card.Section>
                    </Card>
                    <Card className="bg-red-50 border-red-200 shadow-sm">
                      <Card.Section className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-red-600 text-lg">✗</span>
                          <h5 className="font-medium text-red-800">Undvik</h5>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>• Färg som enda sätt att förmedla information</li>
                          <li>• Automatisk videouppspelning med ljud</li>
                          <li>• För låg färgkontrast</li>
                          <li>• Blinkande eller snabbt rörligt innehåll</li>
                          <li>• Text i bilder utan alternativ</li>
                        </ul>
                      </Card.Section>
                    </Card>
                  </div>
                </div>

                {/* Print Guidelines */}
                <Card className="bg-blue-50 border-blue-200 shadow-sm">
                  <Card.Section className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Tryckt material</h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Textstorlek</h5>
                        <p className="text-sm text-gray-600">Minst 12pt för brödtext, 14pt för äldre målgrupper</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Papperskvalitet</h5>
                        <p className="text-sm text-gray-600">Matt finish för att minska reflex och förbättra läsbarhet</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Layout</h5>
                        <p className="text-sm text-gray-600">Tydlig hierarki, god vitrymd mellan element</p>
                      </div>
                    </div>
                  </Card.Section>
                </Card>

                {/* Testing Checklist */}
                <Card className="bg-gray-50 shadow-sm">
                  <Card.Section className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Checklista för tillgänglighet</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Färg & Kontrast</h5>
                        <div className="space-y-2">
                          <Checkbox size="sm" label="Alla textfärger har minst 4.5:1 kontrast" />
                          <Checkbox size="sm" label="Information förmedlas inte endast genom färg" />
                          <Checkbox size="sm" label="Fokusindikatorer är tydligt synliga" />
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Struktur & Navigation</h5>
                        <div className="space-y-2">
                          <Checkbox size="sm" label="Logisk rubrikhierarki (h1, h2, h3)" />
                          <Checkbox size="sm" label="Alt-text på alla informationsbärande bilder" />
                          <Checkbox size="sm" label="Kan navigeras endast med tangentbord" />
                        </div>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </div>
            </Card.Section>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}