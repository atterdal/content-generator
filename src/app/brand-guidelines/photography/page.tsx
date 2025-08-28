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

const playerImages = [
  {
    src: '/images/elements/Edward3.jpg',
    name: 'Edward',
    style: 'Dramatisk porträtt'
  },
  {
    src: '/images/elements/Robert1.jpg',
    name: 'Robert',
    style: 'Professionell studio'
  },
  {
    src: '/images/elements/Ester-Movement.jpg',
    name: 'Ester',
    style: 'Action & rörelse'
  },
  {
    src: '/images/elements/Robert-Movement-wide.jpg',
    name: 'Robert',
    style: 'Landskapsformat'
  }
];

export default function PhotographyPage() {
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
                FOTOGRAFI
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
            Fotografi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Habo IFs fotografi fokuserar på autentiska spelarporträtt som fångar rörelse, passion och lagets karaktär.
          </p>
        </motion.div>

        {/* Photography Overview */}
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
                  Spelarporträtt
                </h2>
                <p className="text-gray-600">
                  Exempel på professionella spelarbilder som används i vårt grafiska material.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {playerImages.slice(0, 2).map((image, index) => (
                  <motion.div 
                    key={image.src} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <Paper shadow="md">
                      <div className="aspect-[3/4] rounded-lg overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Paper>
                    <div>
                      <h4 
                        className="text-lg font-black uppercase"
                        style={{ 
                          fontFamily: brand.typography.primary.fontFamily,
                          color: brand.colors.royalBlue
                        }}
                      >
                        {image.name}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ 
                          fontFamily: brand.typography.secondary.fontFamily,
                          color: brand.colors.heritageGold
                        }}
                      >
                        {image.style}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Stack>
          </Paper>
        </motion.section>

        {/* Photo Styles */}
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
                  Fotostilar
                </h2>
                <p className="text-gray-600">
                  Olika stilar för spelarporträtt som passar olika sammanhang och användningsområden.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {playerImages.map((image, index) => (
                  <motion.div 
                    key={image.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <Paper shadow="md" className="hover:shadow-lg transition-shadow">
                      <div className="aspect-[3/4] rounded-lg overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Paper>
                    <div>
                      <h4 
                        className="text-sm font-black uppercase"
                        style={{ 
                          fontFamily: brand.typography.primary.fontFamily,
                          color: brand.colors.royalBlue
                        }}
                      >
                        {image.style}
                      </h4>
                      <p 
                        className="text-xs"
                        style={{ 
                          fontFamily: brand.typography.secondary.fontFamily,
                          color: brand.colors.heritageGold
                        }}
                      >
                        {image.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Stack>
          </Paper>
        </motion.section>

        {/* Photo Guidelines */}
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
                  Fotoriktlinjer
                </h2>
                <p className="text-gray-600">
                  Riktlinjer för hur spelarbilder ska tas, redigeras och användas i Habo IFs grafiska material.
                </p>
              </div>
              <div className="space-y-8">
                {/* Technical Requirements */}
                <Paper className="bg-gray-50" shadow="sm">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Tekniska krav</h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Format</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Porträtt (vertikal) för hero-block</li>
                          <li>• Minst 540×720px upplösning</li>
                          <li>• JPEG eller PNG format</li>
                          <li>• God skärpa och belysning</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Komposition</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Spelaren ska dominera bilden</li>
                          <li>• Tydlig bakgrundsseparation</li>
                          <li>• Autentiska uttryck och poses</li>
                          <li>• Fokus på rörelse och energi</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Efterbehandling</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Färgkorrektion för enhetlighet</li>
                          <li>• Kontraststyrka för dramatisk känsla</li>
                          <li>• Beskärning för 2×4 hero-block</li>
                          <li>• Export för webbanvändning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Paper>

                {/* Usage Examples */}
                <div className="grid md:grid-cols-2 gap-8">
                  <Paper shadow="sm">
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">I grid-system</h4>
                      <div className="aspect-[2/3] rounded-lg overflow-hidden relative shadow-md" style={{ background: brand.colors.gradientPrimary }}>
                        <img
                          src="/images/elements/Edward3.jpg"
                          alt="Edward i grid-system"
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <img
                            src="/images/logos/habo-if-2025-white.png"
                            alt="Habo IF"
                            className="h-8 object-contain"
                          />
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <h5 
                            className="text-white text-lg font-black uppercase"
                            style={{ fontFamily: brand.typography.primary.fontFamily }}
                          >
                            EDWARD
                          </h5>
                          <p 
                            className="text-white text-sm italic"
                            style={{ fontFamily: brand.typography.secondary.fontFamily }}
                          >
                            Målvakt
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">Spelarbild i 2×4 hero-block med overlay-text</p>
                    </div>
                  </Paper>

                  <Paper shadow="sm">
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Utan overlay</h4>
                      <div className="aspect-[2/3] rounded-lg overflow-hidden border shadow-md">
                        <img
                          src="/images/elements/Robert1.jpg"
                          alt="Robert utan overlay"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-3">Ren spelarbild för vissa layouter</p>
                    </div>
                  </Paper>
                </div>

                {/* Style Guidelines */}
                <Paper className="bg-blue-50 border-blue-200" shadow="sm">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Stilriktlinjer</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-600 text-lg">✓</span>
                          <h5 className="font-medium text-green-800">Gör så här</h5>
                        </div>
                        <div className="space-y-2">
                          {[
                            'Fånga autentiska uttryck och rörelser',
                            'Använd god belysning för tydlighet',
                            'Håll konsistent färgbalans',
                            'Fokusera på spelarens karaktär'
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Badge color="green" variant="light" className="mt-0.5">✓</Badge>
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-red-600 text-lg">✗</span>
                          <h5 className="font-medium text-red-800">Undvik detta</h5>
                        </div>
                        <div className="space-y-2">
                          {[
                            'Överbearbetade filter eller effekter',
                            'Oprofessionell bakgrund eller miljö',
                            'Dålig bildkvalitet eller oskärpa',
                            'Inkonsistent belysning mellan bilder'
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Badge color="red" variant="light" className="mt-0.5">✗</Badge>
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            </Stack>
          </Paper>
        </motion.section>
      </main>
    </div>
  );
}