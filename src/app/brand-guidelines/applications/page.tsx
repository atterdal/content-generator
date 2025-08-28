'use client';

import { 
  Card, 
  Button,
  Anchor
} from '@mantine/core';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

export default function ApplicationsPage() {
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
                TILLÄMPNINGAR
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
            Tillämpningar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Habo IFs grafiska profil tillämpas konsekvent över alla medier - från sociala medier till trycksaker och digital skyltning.
          </p>
        </motion.div>

        {/* Overview Examples */}
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
                Överblick
              </h2>
              <p className="text-gray-600">
                Exempel på hur grafisk profil tillämpas över olika medieformat.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="grid grid-cols-2 gap-6">
                {/* Instagram Post Example */}
                <Card className="shadow-md" style={{ background: brand.colors.gradientPrimary }}>
                  <Card.Section className="rounded-lg aspect-square p-8 relative">
                    <div className="absolute top-4 right-4">
                      <img 
                        src="/images/logos/habo-if-2025-white.png" 
                        alt="Habo IF"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div className="h-full flex flex-col justify-end">
                      <h3 
                        className="text-lg font-black uppercase mb-2 text-white"
                        style={{ fontFamily: brand.typography.primary.fontFamily }}
                      >
                        MATCHDAG
                      </h3>
                      <p 
                        className="text-sm text-white opacity-90"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        Instagram 1080×1080px
                      </p>
                    </div>
                  </Card.Section>
                </Card>

                {/* Business Card Example */}
                <Card className="shadow-md" style={{ backgroundColor: brand.colors.classicBeige }}>
                  <Card.Section className="rounded-lg aspect-square p-8 relative">
                    <div className="absolute top-4 right-4">
                      <img 
                        src="/images/logos/habo-if-2025.png" 
                        alt="Habo IF"
                        className="h-8 object-contain"
                      />
                    </div>
                    <div className="h-full flex flex-col justify-end">
                      <h3 
                        className="text-lg font-black uppercase mb-2"
                        style={{ 
                          fontFamily: brand.typography.primary.fontFamily,
                          color: brand.colors.royalBlue
                        }}
                      >
                        VISITKORT
                      </h3>
                      <p 
                        className="text-sm opacity-80"
                        style={{ 
                          fontFamily: brand.typography.secondary.fontFamily,
                          color: brand.colors.heritageGold
                        }}
                      >
                        85×55mm print format
                      </p>
                    </div>
                  </Card.Section>
                </Card>
              </div>
            </Card.Section>
          </Card>
        </motion.section>

        {/* Social Media */}
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
                Sociala medier
              </h2>
              <p className="text-gray-600">
                Konsekvent tillämpning av grafisk profil över sociala medieplattformar för stark varumärkeskännedom.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Instagram Post */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <Card className="shadow-lg" style={{ background: brand.colors.gradientPrimary }}>
                      <Card.Section className="aspect-square p-6">
                        <div className="h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 
                                className="text-white text-xl font-black uppercase"
                                style={{ fontFamily: brand.typography.primary.fontFamily }}
                              >
                                MATCH
                              </h4>
                              <p 
                                className="text-white/80 text-sm italic"
                                style={{ fontFamily: brand.typography.secondary.fontFamily }}
                              >
                                Lördag 15:00
                              </p>
                            </div>
                            <img src="/images/logos/habo-if-2025-white.png" alt="Logo" className="w-8 h-8" />
                          </div>
                          <div className="text-right">
                            <p 
                              className="text-white text-xs"
                              style={{ fontFamily: brand.typography.secondary.fontFamily }}
                            >
                              Hajmyren, Habo
                            </p>
                          </div>
                        </div>
                      </Card.Section>
                    </Card>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Instagram Post</h5>
                      <p className="text-sm text-gray-600">1080×1080px - Kvadratisk format</p>
                      <p className="text-xs text-gray-500 mt-1">För matchannonsering och event</p>
                    </div>
                  </motion.div>

                  {/* Facebook Cover */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <Card className="shadow-lg" style={{ background: brand.colors.gradientDark }}>
                      <Card.Section className="aspect-[16/9] p-6">
                        <div className="h-full flex items-center justify-between">
                          <div>
                            <h4 
                              className="text-2xl font-black uppercase mb-2"
                              style={{ 
                                fontFamily: brand.typography.primary.fontFamily,
                                color: brand.colors.heritageGold
                              }}
                            >
                              HABO IF
                            </h4>
                            <p 
                              className="text-white text-sm"
                              style={{ fontFamily: brand.typography.secondary.fontFamily }}
                            >
                              {brand.organization.tagline}
                            </p>
                          </div>
                          <img src="/images/logos/habo-if-2025-white.png" alt="Logo" className="w-12 h-12" />
                        </div>
                      </Card.Section>
                    </Card>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Facebook Cover</h5>
                      <p className="text-sm text-gray-600">1200×628px - Widescreen format</p>
                      <p className="text-xs text-gray-500 mt-1">För sideomslag och huvudbild</p>
                    </div>
                  </motion.div>

                  {/* Story Template */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <Card className="shadow-lg" style={{ backgroundColor: brand.colors.classicBeige }}>
                      <Card.Section className="aspect-[9/16] p-4">
                        <div className="h-full flex flex-col justify-between">
                          <div className="text-center">
                            <img src="/images/logos/habo-if-2025.png" alt="Logo" className="w-12 h-12 mx-auto mb-3" />
                            <h4 
                              className="text-lg font-black uppercase"
                              style={{ 
                                fontFamily: brand.typography.primary.fontFamily,
                                color: brand.colors.royalBlue
                              }}
                            >
                              RESULTAT
                            </h4>
                          </div>
                          <div className="text-center">
                            <p 
                              className="text-3xl font-black"
                              style={{ 
                                fontFamily: brand.typography.primary.fontFamily,
                                color: brand.colors.royalBlue
                              }}
                            >
                              3-1
                            </p>
                            <p 
                              className="text-sm mt-2"
                              style={{ 
                                fontFamily: brand.typography.secondary.fontFamily,
                                color: brand.colors.heritageGold
                              }}
                            >
                              VS IFK Göteborg
                            </p>
                          </div>
                        </div>
                      </Card.Section>
                    </Card>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Story Template</h5>
                      <p className="text-sm text-gray-600">1080×1920px - Vertical format</p>
                      <p className="text-xs text-gray-500 mt-1">För Instagram/Facebook Stories</p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Media Guidelines */}
                <Card className="bg-gray-50 shadow-sm">
                  <Card.Section className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Sociala medier riktlinjer</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Format och storlekar</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• <strong>Instagram Post:</strong> 1080×1080px (1:1)</li>
                          <li>• <strong>Instagram Story:</strong> 1080×1920px (9:16)</li>
                          <li>• <strong>Facebook Cover:</strong> 1200×628px (16:9)</li>
                          <li>• <strong>Twitter Header:</strong> 1500×500px (3:1)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Innehållsriktlinjer</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Använd alltid korrekt logotyp</li>
                          <li>• Säkerställ läsbarhet på mobil</li>
                          <li>• Följ färgpalett konsekvent</li>
                          <li>• Använd Alverata Black för rubriker</li>
                        </ul>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </div>
            </Card.Section>
          </Card>
        </motion.section>

        {/* Print Materials */}
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
                Trycksaker
              </h2>
              <p className="text-gray-600">
                Professionella trycksaker som stärker varumärket och skapar trovärdighet i alla sammanhang.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Business Cards */}
                  <Card className="shadow-sm" style={{ backgroundColor: brand.colors.classicBeige }}>
                    <Card.Section className="aspect-[1.618/1] p-4">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <img src="/images/logos/habo-if-2025.png" alt="Logo" className="w-8 h-8 mb-2" />
                        </div>
                        <div>
                          <h4 
                            className="text-sm font-black uppercase"
                            style={{ 
                              fontFamily: brand.typography.primary.fontFamily,
                              color: brand.colors.royalBlue
                            }}
                          >
                            MARCUS ERIKSSON
                          </h4>
                          <p 
                            className="text-xs mt-1"
                            style={{ 
                              fontFamily: brand.typography.secondary.fontFamily,
                              color: brand.colors.heritageGold
                            }}
                          >
                            Ordförande
                          </p>
                        </div>
                      </div>
                    </Card.Section>
                  </Card>

                  {/* Letterhead */}
                  <Card className="shadow-sm border">
                    <Card.Section className="aspect-[1/1.41] p-6" style={{ backgroundColor: brand.colors.pureWhite }}>
                      <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                          <img src="/images/logos/habo-if-2025.png" alt="Logo" className="w-10 h-10" />
                          <div className="text-right text-xs" style={{ color: brand.colors.heritageGold }}>
                            <p style={{ fontFamily: brand.typography.secondary.fontFamily }}>habo-if.se</p>
                          </div>
                        </div>
                        <div className="flex-1 border-t pt-4" style={{ borderColor: brand.colors.classicBeige }}>
                          <div className="space-y-2">
                            <div className="h-2 rounded" style={{ backgroundColor: brand.colors.classicBeige, width: '80%' }}></div>
                            <div className="h-2 rounded" style={{ backgroundColor: brand.colors.classicBeige, width: '60%' }}></div>
                            <div className="h-2 rounded" style={{ backgroundColor: brand.colors.classicBeige, width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                    </Card.Section>
                  </Card>

                  {/* Poster */}
                  <Card className="shadow-sm" style={{ background: brand.colors.gradientPrimary }}>
                    <Card.Section className="aspect-[2/3] p-6">
                      <div className="h-full flex flex-col justify-between text-center">
                        <div>
                          <h4 
                            className="text-lg font-black uppercase mb-2"
                            style={{ 
                              fontFamily: brand.typography.primary.fontFamily,
                              color: brand.colors.heritageGold
                            }}
                          >
                            HEMMAMATCH
                          </h4>
                          <p 
                            className="text-white text-sm"
                            style={{ fontFamily: brand.typography.secondary.fontFamily }}
                          >
                            Lördag 15:00
                          </p>
                        </div>
                        <div>
                          <img src="/images/logos/habo-if-2025-white.png" alt="Logo" className="w-12 h-12 mx-auto mb-2" />
                          <p 
                            className="text-white text-xs"
                            style={{ fontFamily: brand.typography.secondary.fontFamily }}
                          >
                            Hajmyren, Habo
                          </p>
                        </div>
                      </div>
                    </Card.Section>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Visitkort</h5>
                    <p className="text-sm text-gray-600">85×55mm standard format</p>
                    <p className="text-xs text-gray-500 mt-1">300 DPI, CMYK tryck</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Brevpapper</h5>
                    <p className="text-sm text-gray-600">A4 210×297mm format</p>
                    <p className="text-xs text-gray-500 mt-1">Officiell korrespondens</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Affisch</h5>
                    <p className="text-sm text-gray-600">A3 297×420mm format</p>
                    <p className="text-xs text-gray-500 mt-1">Evenemang och matchannonser</p>
                  </div>
                </div>

                {/* Print Specifications */}
                <Card className="bg-blue-50 border-blue-200 shadow-sm">
                  <Card.Section className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Tryckspecifikationer</h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Färgprofil</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• CMYK för tryck</li>
                          <li>• RGB för digital</li>
                          <li>• PMS för specialfärger</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Upplösning</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 300 DPI minimum</li>
                          <li>• Vektorgrafik föredras</li>
                          <li>• 3mm utfall för tryck</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Material</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Matt bestruket papper</li>
                          <li>• 300g/m² för visitkort</li>
                          <li>• 130g/m² för affischer</li>
                        </ul>
                      </div>
                    </div>
                  </Card.Section>
                </Card>
              </div>
            </Card.Section>
          </Card>
        </motion.section>

        {/* Digital Applications */}
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
                Digitala tillämpningar
              </h2>
              <p className="text-gray-600">
                Digitala tillämpningar som säkerställer konsistent varumärkesupplevelse online.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Website Header */}
                  <Card className="shadow-sm" style={{ background: brand.colors.gradientPrimary }}>
                    <Card.Section className="aspect-[2/1] p-6">
                      <div className="h-full flex items-center justify-between">
                        <div>
                          <h4 
                            className="text-xl font-black uppercase mb-2"
                            style={{ 
                              fontFamily: brand.typography.primary.fontFamily,
                              color: brand.colors.heritageGold
                            }}
                          >
                            HABO IF
                          </h4>
                          <p 
                            className="text-white text-sm"
                            style={{ fontFamily: brand.typography.secondary.fontFamily }}
                          >
                            Officiell hemsida
                          </p>
                        </div>
                        <img src="/images/logos/habo-if-2025-white.png" alt="Logo" className="w-16 h-16" />
                      </div>
                    </Card.Section>
                  </Card>

                  {/* Email Signature */}
                  <Card className="shadow-sm border">
                    <Card.Section className="p-4" style={{ backgroundColor: brand.colors.pureWhite }}>
                      <div className="flex items-center gap-4">
                        <img src="/images/logos/habo-if-2025.png" alt="Logo" className="w-8 h-8" />
                        <div>
                          <h5 
                            className="text-sm font-bold"
                            style={{ 
                              fontFamily: brand.typography.primary.fontFamily,
                              color: brand.colors.royalBlue
                            }}
                          >
                            MARCUS ERIKSSON
                          </h5>
                          <p 
                            className="text-xs"
                            style={{ 
                              fontFamily: brand.typography.secondary.fontFamily,
                              color: brand.colors.heritageGold
                            }}
                          >
                            Ordförande, Habo IF
                          </p>
                          <p className="text-xs text-gray-600">marcus@habo-if.se | 0123-456789</p>
                        </div>
                      </div>
                    </Card.Section>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-8 text-center">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Webbsida header</h5>
                    <p className="text-sm text-gray-600">1920×600px standard header</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">E-post signatur</h5>
                    <p className="text-sm text-gray-600">HTML format för alla officiella mail</p>
                  </div>
                </div>

                {/* Usage Guidelines */}
                <Card className="bg-green-50 border-green-200 shadow-sm">
                  <Card.Section className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Användningsriktlinjer</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-600 text-lg">✓</span>
                          <h5 className="font-medium text-green-800">Gör så här</h5>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Använd korrekt färgkombinationer</li>
                          <li>• Säkerställ läsbarhet på alla enheter</li>
                          <li>• Följ hierarkiska typografi</li>
                          <li>• Behåll logotypens skyddszon</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-red-600 text-lg">✗</span>
                          <h5 className="font-medium text-red-800">Undvik detta</h5>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Blanda olika teman i samma design</li>
                          <li>• Använda för låg kontrast</li>
                          <li>• Förvränga logotyp eller typografi</li>
                          <li>• Ignorera grid-systemets struktur</li>
                        </ul>
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