'use client';

import { useState } from 'react';
import { 
  Paper, 
  Stack,
  Button,
  Divider,
  Badge,
  Card
} from '@mantine/core';
import Link from 'next/link';
import { ArrowLeft, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

export default function LogoGuidelinesPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const brand = HABO_IF_BRAND;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

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
                LOGOTYP
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
            Logotyp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Habo IF-logotypen är hjärtat i vår visuella identitet. Den används konsekvent över alla material för att bygga igenkänning och förtroende.
          </p>
        </motion.div>

        {/* Logo Variants */}
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
                  Logotypvarianter
                </h2>
                <p className="text-gray-600">
                  Två huvudvarianter av logotypen för olika bakgrunder och sammanhang.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Primary Logo */}
                <div>
                  <div className="bg-white rounded-2xl p-16 shadow-lg border mb-8 text-center">
                    <img 
                      src="/images/logos/habo-if-2025.png" 
                      alt="Habo IF Logo - Färgad version"
                      className="w-40 h-40 mx-auto object-contain"
                    />
                  </div>
                  <div>
                    <h4 
                      className="text-xl font-semibold mb-3" 
                      style={{ 
                        fontFamily: brand.typography.primary.fontFamily,
                        textTransform: brand.typography.primary.case === 'uppercase' ? 'uppercase' : 'none'
                      }}
                    >
                      Primär logotyp
                    </h4>
                    <p className="text-gray-700 mb-4" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                      Används på vita eller ljusa bakgrunder. Föredragen version när det är möjligt.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        component="a"
                        href="/images/logos/habo-if-2025.png" 
                        download
                        size="sm"
                        variant="outline"
                        className="font-medium"
                        style={{ borderColor: brand.colors.royalBlue, color: brand.colors.royalBlue }}
                      >
                        📁 Ladda ner PNG
                      </Button>
                    </div>
                  </div>
                </div>

                {/* White Logo */}
                <div>
                  <div 
                    className="rounded-2xl p-16 shadow-lg mb-8 text-center"
                    style={{ background: brand.colors.gradientPrimary }}
                  >
                    <img 
                      src="/images/logos/habo-if-2025-white.png" 
                      alt="Habo IF Logo - Vit version"
                      className="w-40 h-40 mx-auto object-contain"
                    />
                  </div>
                  <div>
                    <h4 
                      className="text-xl font-semibold mb-3" 
                      style={{ 
                        fontFamily: brand.typography.primary.fontFamily,
                        textTransform: brand.typography.primary.case === 'uppercase' ? 'uppercase' : 'none'
                      }}
                    >
                      Vit logotyp
                    </h4>
                    <p className="text-gray-700 mb-4" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                      Används på mörka eller blå bakgrunder för optimal kontrast och läsbarhet.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        component="a"
                        href="/images/logos/habo-if-2025-white.png" 
                        download
                        size="sm"
                        variant="outline"
                        className="font-medium"
                        style={{ borderColor: brand.colors.royalBlue, color: brand.colors.royalBlue }}
                      >
                        📁 Ladda ner PNG
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Stack>
          </Paper>
        </motion.section>

        {/* Usage Guidelines */}
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
                  Användningsriktlinjer
                </h2>
                <p className="text-gray-600">
                  Riktlinjer för korrekt användning av Habo IF-logotypen i olika sammanhang och material.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-green-600 text-lg">✓</span>
                    <h4 className="text-lg font-semibold text-green-700">Gör så här</h4>
                  </div>
                  <div className="space-y-4">
                    <Paper className="bg-green-50 border-green-200" shadow="sm">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <Badge color="green" className="mt-1">✓</Badge>
                          <div>
                            <h5 className="font-semibold text-green-800 mb-1">Behåll skyddszonen</h5>
                            <p className="text-sm text-green-700">Minst 20px fri yta runt logotypen på alla sidor</p>
                          </div>
                        </div>
                      </div>
                    </Paper>
                    
                    <Paper className="bg-green-50 border-green-200" shadow="sm">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <Badge color="green" className="mt-1">✓</Badge>
                          <div>
                            <h5 className="font-semibold text-green-800 mb-1">Rätt bakgrund</h5>
                            <p className="text-sm text-green-700">Färgad version på vita/beige, vit version på blå bakgrund</p>
                          </div>
                        </div>
                      </div>
                    </Paper>

                    <Paper className="bg-green-50 border-green-200" shadow="sm">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <Badge color="green" className="mt-1">✓</Badge>
                          <div>
                            <h5 className="font-semibold text-green-800 mb-1">God kontrast</h5>
                            <p className="text-sm text-green-700">Säkerställ att logotypen är tydligt synlig mot bakgrunden</p>
                          </div>
                        </div>
                      </div>
                    </Paper>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-red-600 text-lg">✗</span>
                    <h4 className="text-lg font-semibold text-red-700">Undvik detta</h4>
                  </div>
                  <div className="space-y-4">
                    <Paper className="bg-red-50 border-red-200" shadow="sm">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <Badge color="red" className="mt-1">✗</Badge>
                          <div>
                            <h5 className="font-semibold text-red-800 mb-1">Ändra färger</h5>
                            <p className="text-sm text-red-700">Ändra aldrig logotypens färger eller proportioner</p>
                          </div>
                        </div>
                      </div>
                    </Paper>
                    
                    <Paper className="bg-red-50 border-red-200" shadow="sm">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <Badge color="red" className="mt-1">✗</Badge>
                          <div>
                            <h5 className="font-semibold text-red-800 mb-1">För liten storlek</h5>
                            <p className="text-sm text-red-700">Använd aldrig mindre än 60×60px storlek</p>
                          </div>
                        </div>
                      </div>
                    </Paper>

                    <Paper className="bg-red-50 border-red-200" shadow="sm">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <Badge color="red" className="mt-1">✗</Badge>
                          <div>
                            <h5 className="font-semibold text-red-800 mb-1">Förvräng logotypen</h5>
                            <p className="text-sm text-red-700">Rotera, sträck eller förvräng aldrig logotypen</p>
                          </div>
                        </div>
                      </div>
                    </Paper>
                  </div>
                </div>
              </div>
            </Stack>
          </Paper>
        </motion.section>

        {/* Technical Specifications */}
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
                  Tekniska specifikationer
                </h2>
                <p className="text-gray-600">
                  Detaljerade krav för logotypens tekniska implementation och användning.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Paper shadow="sm">
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto"
                         style={{ backgroundColor: brand.colors.royalBlue }}>
                      📏
                    </div>
                    <h4 className="font-semibold mb-2">Minimum storlek</h4>
                    <p className="text-sm text-gray-600 mb-4">60×60px för digital användning</p>
                    <Button
                      size="sm"
                      variant="light"
                      leftSection={<Copy size={12} />}
                      onClick={() => handleCopy('60×60px')}
                      className="text-xs font-mono"
                    >
                      {copiedText === '60×60px' ? 'Kopierad!' : '60×60px'}
                    </Button>
                  </div>
                </Paper>
                
                <Paper shadow="sm">
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto"
                         style={{ backgroundColor: brand.colors.heritageGold }}>
                      🎯
                    </div>
                    <h4 className="font-semibold mb-2">Skyddszon</h4>
                    <p className="text-sm text-gray-600 mb-4">Minst 20px fri yta runt logotypen</p>
                    <Button
                      size="sm"
                      variant="light"
                      leftSection={<Copy size={12} />}
                      onClick={() => handleCopy('20px')}
                      className="text-xs font-mono"
                    >
                      {copiedText === '20px' ? 'Kopierad!' : '20px'}
                    </Button>
                  </div>
                </Paper>

                <Paper shadow="sm">
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto"
                         style={{ backgroundColor: brand.colors.royalBlue }}>
                      📄
                    </div>
                    <h4 className="font-semibold mb-2">Format</h4>
                    <p className="text-sm text-gray-600 mb-4">PNG med transparens, SVG för skalbarhet</p>
                    <div className="text-xs text-gray-500 font-mono">PNG/SVG</div>
                  </div>
                </Paper>

                <Paper shadow="sm">
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto"
                         style={{ backgroundColor: brand.colors.heritageGold }}>
                      🖨️
                    </div>
                    <h4 className="font-semibold mb-2">Print kvalitet</h4>
                    <p className="text-sm text-gray-600 mb-4">300 DPI för tryck material</p>
                    <Button
                      size="sm"
                      variant="light"
                      leftSection={<Copy size={12} />}
                      onClick={() => handleCopy('300 DPI')}
                      className="text-xs font-mono"
                    >
                      {copiedText === '300 DPI' ? 'Kopierad!' : '300 DPI'}
                    </Button>
                  </div>
                </Paper>
              </div>
            </Stack>
          </Paper>
        </motion.section>

        {/* Grid System Usage */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Paper className="border border-gray-200">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Logotyp i Grid-systemet
              </h2>
              <p className="text-gray-600">
                Hur logotypen integreras och används inom Habo IFs grid-baserade designsystem.
              </p>
            </div>
            <div className="p-8 pt-0">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Placering</h4>
                  <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                    Logotypen placeras alltid i beige block, vanligtvis i övre höger 
                    eller nedre vänster del av blocket.
                  </p>
                  <Paper className="bg-yellow-50 border-yellow-200">
                    <div className="p-3">
                      <p className="text-yellow-800 text-xs font-medium">
                        💡 Tips: Storlek ska vara 40% av blockets minsta dimension
                      </p>
                    </div>
                  </Paper>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Storlekar i grid</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Standard grid: 40% av block</li>
                    <li>• Hero användning: 80×80px</li>
                    <li>• Mindre block: 60×60px</li>
                    <li>• Print material: 300 DPI</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Exempel</h4>
                  <div className="p-6 rounded-lg text-center border"
                       style={{ backgroundColor: brand.colors.classicBeige }}>
                    <img 
                      src="/images/logos/habo-if-2025.png" 
                      alt="Logo exempel"
                      className="w-16 h-16 mx-auto object-contain mb-2"
                    />
                    <p className="text-xs" style={{ color: brand.colors.heritageGold }}>
                      Logo i beige block
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </motion.section>

        {/* Downloads */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Paper className="border-2 shadow-lg" style={{ borderColor: brand.colors.royalBlue }}>
            <div className="p-12 text-center">
              <h3 
                className="text-2xl font-semibold mb-4" 
                style={{ 
                  color: brand.colors.royalBlue, 
                  fontFamily: brand.typography.primary.fontFamily,
                  textTransform: brand.typography.primary.case === 'uppercase' ? 'uppercase' : 'none'
                }}
              >
                Ladda ner logotypfiler
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                Alla logotypfiler i högupplöst format för digital och tryck användning.
              </p>
            </div>
            <div className="p-12 pt-0">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Button 
                  component="a"
                  href="/images/logos/habo-if-2025.png" 
                  download
                  variant="default"
                  className="font-medium"
                  style={{ borderColor: brand.colors.royalBlue, color: brand.colors.royalBlue }}
                >
                  📁 PNG Färgad
                </Button>
                <Button 
                  component="a"
                  href="/images/logos/habo-if-2025-white.png" 
                  download
                  variant="outline"
                  className="font-medium"
                  style={{ borderColor: brand.colors.royalBlue, color: brand.colors.royalBlue }}
                >
                  📁 PNG Vit
                </Button>
                <Button 
                  variant="light"
                  disabled
                  className="font-medium text-gray-500"
                >
                  🎨 SVG (Kommer)
                </Button>
              </div>
            </div>
          </Paper>
        </motion.section>
      </main>
    </div>
  );
}