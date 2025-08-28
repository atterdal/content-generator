'use client';

import { 
  Paper, 
  Stack,
  Button,
  Divider,
  Badge
} from '@mantine/core';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

export default function TypographyPage() {
  const brand = HABO_IF_BRAND;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Link href="/brand-guidelines" style={{ textDecoration: 'none' }}>
                <img 
                  src="/images/logos/habo-if-2025.png" 
                  alt="Habo IF"
                  className="h-8 object-contain"
                />
              </Link>
              <span 
                className="text-base font-black uppercase tracking-wider"
                style={{ 
                  color: brand.colors.royalBlue,
                  fontFamily: brand.typography.primary.fontFamily
                }}
              >
                TYPOGRAFI
              </span>
            </div>
            
            <Button 
              component={Link}
              href="/brand-guidelines"
              size="sm"
              leftSection={<ArrowLeft size={16} />}
              style={{
                backgroundColor: brand.colors.royalBlue,
                color: 'white',
                fontFamily: brand.typography.primary.fontFamily,
                fontSize: '13px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
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
            Typografi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Habo IFs typografi bygger på kontrast och läsbarhet. Alverata Black för kraftfulla rubriker, vanligtvis i uppercase för maximal impact.
          </p>
        </motion.div>

        {/* Typography Overview */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Paper withBorder>
            <div 
              className="rounded-lg p-12 text-center"
              style={{ background: brand.colors.gradientPrimary }}
            >
              <p 
                className="text-6xl font-black uppercase leading-tight mb-4"
                style={{ 
                  color: brand.colors.heritageGold,
                  fontFamily: brand.typography.primary.fontFamily
                }}
              >
                HABO IF
              </p>
              <p 
                className="text-xl text-white"
                style={{ fontFamily: brand.typography.secondary.fontFamily }}
              >
                Vi brinner blått
              </p>
            </div>
          </Paper>
        </motion.section>

        {/* Primary Typeface */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Paper withBorder>
            <Stack p="xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Primärt typsnitt
                </h2>
                <p className="text-gray-600">
                  {brand.typography.primary.fontFamily.split(',')[0].replace(/"/g, '')} är vårt primära typsnitt för alla rubriker och uppmärksammande element.
                </p>
              </div>
              <div className="space-y-8">
                <div>
                  <p 
                    className="text-8xl font-black uppercase leading-none mb-2"
                    style={{ 
                      fontFamily: brand.typography.primary.fontFamily,
                      color: brand.colors.heritageGold
                    }}
                  >
                    Aa
                  </p>
                  <p className="text-sm text-gray-600">{brand.typography.primary.fontFamily.split(',')[0].replace(/"/g, '')}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Display {brand.typography.primary.sizes.display}px</p>
                    <p 
                      className="text-5xl font-black uppercase"
                      style={{ 
                        fontFamily: brand.typography.primary.fontFamily,
                        color: brand.colors.heritageGold
                      }}
                    >
                      MATCH
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">H1 {brand.typography.primary.sizes.h1}px</p>
                    <p 
                      className="text-2xl font-black uppercase"
                      style={{ 
                        fontFamily: brand.typography.primary.fontFamily,
                        color: brand.colors.heritageGold
                      }}
                    >
                      RUBRIK
                    </p>
                  </div>
                </div>
              </div>
            </Stack>
          </Paper>
        </motion.section>

        {/* Secondary Typeface */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Paper withBorder>
            <Stack p="xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Sekundärt typsnitt
                </h2>
                <p className="text-gray-600">
                  {brand.typography.secondary.fontFamily.split(',')[0].replace(/"/g, '')} för brödtext och längre textstycken. Ger elegans och god läsbarhet.
                </p>
              </div>
              <div className="space-y-8">
                <div>
                  <p 
                    className="text-8xl leading-none mb-2"
                    style={{ 
                      fontFamily: brand.typography.secondary.fontFamily,
                      color: '#6b7280'
                    }}
                  >
                    Aa
                  </p>
                  <p className="text-sm text-gray-600">{brand.typography.secondary.fontFamily.split(',')[0].replace(/"/g, '')}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Body {brand.typography.secondary.sizes.body}px Regular</p>
                    <p 
                      className="text-lg"
                      style={{ 
                        fontFamily: brand.typography.secondary.fontFamily,
                        color: '#374151'
                      }}
                    >
                      Habo IF är en fotbollsklubb grundad {brand.organization.established} i Habo kommun.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Subheader {brand.typography.secondary.sizes.subheader}px Italic</p>
                    <p 
                      className="text-xl italic"
                      style={{ 
                        fontFamily: brand.typography.secondary.fontFamily,
                        color: '#6b7280',
                        fontStyle: 'italic'
                      }}
                    >
                      Lördag 15:00 på Hajmyren
                    </p>
                  </div>
                </div>
              </div>
            </Stack>
          </Paper>
        </motion.section>

        {/* Text Hierarchy */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Paper withBorder>
            <Stack p="xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Texthierarki
                </h2>
                <p className="text-gray-600">
                  Vår texthierarki säkerställer tydlighet och god läsbarhet i alla sammanhang.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 space-y-6">
                <div className="p-4 bg-white rounded border-l-4 shadow-sm" style={{ borderColor: brand.colors.heritageGold }}>
                  <p 
                    className="text-4xl font-black uppercase mb-2"
                    style={{ 
                      fontFamily: brand.typography.primary.fontFamily,
                      color: brand.colors.royalBlue
                    }}
                  >
                    DISPLAY {brand.typography.primary.sizes.display}PX
                  </p>
                  <p className="text-sm text-gray-500">Hero headlines, main titles</p>
                </div>
                
                <div className="p-4 bg-white rounded border-l-4 border-gray-300 shadow-sm">
                  <p 
                    className="text-2xl font-black uppercase mb-2"
                    style={{ 
                      fontFamily: brand.typography.primary.fontFamily,
                      color: brand.colors.royalBlue
                    }}
                  >
                    H1 HEADING {brand.typography.primary.sizes.h1}PX
                  </p>
                  <p className="text-sm text-gray-500">Section headers</p>
                </div>

                <div className="p-4 bg-white rounded border-l-4 border-gray-300 shadow-sm">
                  <p 
                    className="text-xl font-black uppercase mb-2"
                    style={{ 
                      fontFamily: brand.typography.primary.fontFamily,
                      color: brand.colors.royalBlue
                    }}
                  >
                    H2 HEADING {brand.typography.primary.sizes.h2}PX
                  </p>
                  <p className="text-sm text-gray-500">Sub headers</p>
                </div>

                <div className="p-4 bg-white rounded border-l-4 border-gray-300 shadow-sm">
                  <p 
                    className="text-lg italic mb-2"
                    style={{ 
                      fontFamily: brand.typography.secondary.fontFamily,
                      color: brand.colors.heritageGold,
                      fontStyle: 'italic'
                    }}
                  >
                    Subheader {brand.typography.secondary.sizes.subheader}px Italic
                  </p>
                  <p className="text-sm text-gray-500">Match info, event details</p>
                </div>

                <div className="p-4 bg-white rounded border-l-4 border-gray-300 shadow-sm">
                  <p 
                    className="text-base mb-2"
                    style={{ 
                      fontFamily: brand.typography.secondary.fontFamily,
                      color: '#374151'
                    }}
                  >
                    Body text {brand.typography.secondary.sizes.body}px Regular för längre texter och beskrivningar.
                  </p>
                  <p className="text-sm text-gray-500">Standard body text</p>
                </div>
              </div>
            </Stack>
          </Paper>
        </motion.section>

        {/* Usage Examples */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Paper withBorder>
            <Stack p="xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Användningsexempel
                </h2>
                <p className="text-gray-600">
                  Exempel på hur typografin används i praktiken för olika sammanhang.
                </p>
              </div>
              <div className="space-y-8">
                {/* Good Example */}
                <div className="rounded-lg p-8 shadow-lg" style={{ background: brand.colors.gradientPrimary }}>
                  <Badge color="green" className="mb-4">Korrekt</Badge>
                  <h4 
                    className="text-3xl font-black uppercase mb-3"
                    style={{ 
                      color: brand.colors.heritageGold,
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    MATCHDAG
                  </h4>
                  <p 
                    className="text-lg italic mb-4 text-white"
                    style={{ 
                      fontFamily: brand.typography.secondary.fontFamily,
                      fontStyle: 'italic'
                    }}
                  >
                    Lördag 15:00 på Hajmyren
                  </p>
                  <p 
                    className="text-white leading-relaxed"
                    style={{ fontFamily: brand.typography.secondary.fontFamily }}
                  >
                    Habo IF möter IFK Göteborg i en avgörande match för serieledningen. 
                    Kom och stötta laget när vi brinner blått på hemmaplan.
                  </p>
                </div>

                {/* Bad Example */}
                <div className="bg-gray-100 rounded-lg p-8 opacity-60 shadow-lg border">
                  <Badge color="red" className="mb-4">Undvik</Badge>
                  <h4 
                    className="text-lg mb-3 text-gray-600"
                    style={{ fontFamily: brand.typography.secondary.fontFamily }}
                  >
                    matchdag denna lördag
                  </h4>
                  <p 
                    className="text-xs font-black uppercase mb-4 text-gray-400"
                    style={{ fontFamily: brand.typography.primary.fontFamily }}
                  >
                    LÖRDAG 15:00 PÅ HAJMYREN KOMMER HABO IF ATT MÖTA IFK GÖTEBORG
                  </p>
                  <p className="text-gray-500 text-sm leading-tight">
                    Detta exempel visar dålig hierarki med fel fontanvändning och case-behandling.
                  </p>
                </div>
              </div>
            </Stack>
          </Paper>
        </motion.section>
      </main>
    </div>
  );
}