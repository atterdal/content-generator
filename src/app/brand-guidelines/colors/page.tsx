'use client';

import { useState } from 'react';
import { 
  Card, 
  Button,
  Badge,
  Anchor
} from '@mantine/core';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

export default function ColorsPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const brand = HABO_IF_BRAND;

  const handleCopyColor = async (color: string, name: string) => {
    await navigator.clipboard.writeText(color);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };

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
                FÄRGER
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
            Färger
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Habo IFs färgpalett bygger på kontrast och dramatik. Royal Blue som grund, Heritage Gold för accenter och Pure White för läsbarhet.
          </p>
        </motion.div>

        {/* Color Overview */}
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
                Huvudfärger
              </h2>
              <p className="text-gray-600">
                Våra tre grundfärger som definierar Habo IFs visuella identitet.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="grid grid-cols-3 gap-6">
                <div 
                  className="aspect-square rounded-lg cursor-pointer transition-transform hover:scale-105 shadow-md"
                  style={{ backgroundColor: brand.colors.royalBlue }}
                  onClick={() => handleCopyColor(brand.colors.royalBlue, 'Royal Blue')}
                >
                  {copiedColor === 'Royal Blue' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="bg-white rounded px-3 py-1 shadow-lg">
                        <span className="text-xs font-medium text-gray-900">Kopierad!</span>
                      </div>
                    </div>
                  )}
                </div>
                <div 
                  className="aspect-square rounded-lg cursor-pointer transition-transform hover:scale-105 shadow-md"
                  style={{ backgroundColor: brand.colors.heritageGold }}
                  onClick={() => handleCopyColor(brand.colors.heritageGold, 'Heritage Gold')}
                >
                  {copiedColor === 'Heritage Gold' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="bg-white rounded px-3 py-1 shadow-lg">
                        <span className="text-xs font-medium text-gray-900">Kopierad!</span>
                      </div>
                    </div>
                  )}
                </div>
                <div 
                  className="aspect-square rounded-lg border-2 border-gray-200 cursor-pointer transition-transform hover:scale-105 shadow-md"
                  style={{ backgroundColor: brand.colors.pureWhite }}
                  onClick={() => handleCopyColor(brand.colors.pureWhite, 'Pure White')}
                >
                  {copiedColor === 'Pure White' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="bg-gray-900 rounded px-3 py-1 shadow-lg">
                        <span className="text-xs font-medium text-white">Kopierad!</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card.Section>
          </Card>
        </motion.section>

        {/* Primary Colors Detail */}
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
                Färgspecifikationer
              </h2>
              <p className="text-gray-600">
                Detaljerade värden och användningsområden för våra huvudfärger.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="space-y-8">
                {/* Royal Blue */}
                <div className="grid grid-cols-3 gap-6">
                  <div 
                    className="aspect-square rounded-lg cursor-pointer relative overflow-hidden shadow-md"
                    style={{ backgroundColor: brand.colors.royalBlue }}
                    onClick={() => handleCopyColor(brand.colors.royalBlue, 'Royal Blue')}
                  >
                    {copiedColor === 'Royal Blue' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white rounded px-3 py-1 shadow-lg">
                          <span className="text-xs font-medium text-gray-900">Kopierad!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Royal Blue</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCopyColor(brand.colors.royalBlue, 'Royal Blue')}
                        className="flex items-center justify-between w-full text-left text-sm text-gray-600 hover:text-gray-900"
                      >
                        <span>HEX</span>
                        <span className="font-mono">{brand.colors.royalBlue}</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Huvudfärg för bakgrunder och text på ljusa ytor
                    </p>
                  </div>
                </div>

                {/* Heritage Gold */}
                <div className="grid grid-cols-3 gap-6">
                  <div 
                    className="aspect-square rounded-lg cursor-pointer relative overflow-hidden shadow-md"
                    style={{ backgroundColor: brand.colors.heritageGold }}
                    onClick={() => handleCopyColor(brand.colors.heritageGold, 'Heritage Gold')}
                  >
                    {copiedColor === 'Heritage Gold' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white rounded px-3 py-1 shadow-lg">
                          <span className="text-xs font-medium text-gray-900">Kopierad!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Heritage Gold</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCopyColor(brand.colors.heritageGold, 'Heritage Gold')}
                        className="flex items-center justify-between w-full text-left text-sm text-gray-600 hover:text-gray-900"
                      >
                        <span>HEX</span>
                        <span className="font-mono">{brand.colors.heritageGold}</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Accenter, rubriker på blå bakgrund, premium-känsla
                    </p>
                  </div>
                </div>

                {/* Pure White */}
                <div className="grid grid-cols-3 gap-6">
                  <div 
                    className="aspect-square rounded-lg border-2 border-gray-200 cursor-pointer relative overflow-hidden shadow-md"
                    style={{ backgroundColor: brand.colors.pureWhite }}
                    onClick={() => handleCopyColor(brand.colors.pureWhite, 'Pure White')}
                  >
                    {copiedColor === 'Pure White' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-gray-900 rounded px-3 py-1 shadow-lg">
                          <span className="text-xs font-medium text-white">Kopierad!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Pure White</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCopyColor(brand.colors.pureWhite, 'Pure White')}
                        className="flex items-center justify-between w-full text-left text-sm text-gray-600 hover:text-gray-900"
                      >
                        <span>HEX</span>
                        <span className="font-mono">{brand.colors.pureWhite}</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Text på mörka bakgrunder, negativ logotyp
                    </p>
                  </div>
                </div>
              </div>
            </Card.Section>
          </Card>
        </motion.section>

        {/* Secondary Colors */}
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
                Sekundära färger
              </h2>
              <p className="text-gray-600">
                Stödfärger som kompletterar huvudpaletten och skapar djup i designen.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div 
                    className="aspect-square rounded-lg cursor-pointer mb-3 transition-transform hover:scale-105 shadow-md"
                    style={{ backgroundColor: brand.colors.blueVoid }}
                    onClick={() => handleCopyColor(brand.colors.blueVoid, 'Blue Void')}
                  >
                    {copiedColor === 'Blue Void' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-white rounded px-2 py-1 shadow-lg">
                          <span className="text-xs font-medium text-gray-900">Kopierad!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Blue Void</h4>
                  <p className="text-xs font-mono text-gray-600">{brand.colors.blueVoid}</p>
                  <p className="text-xs text-gray-500 mt-2">Mörka bakgrunder</p>
                </div>

                <div className="text-center">
                  <div 
                    className="aspect-square rounded-lg cursor-pointer mb-3 transition-transform hover:scale-105 shadow-md"
                    style={{ backgroundColor: brand.colors.gradientStart }}
                    onClick={() => handleCopyColor(brand.colors.gradientStart, 'Gradient Start')}
                  >
                    {copiedColor === 'Gradient Start' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-white rounded px-2 py-1 shadow-lg">
                          <span className="text-xs font-medium text-gray-900">Kopierad!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Gradient Start</h4>
                  <p className="text-xs font-mono text-gray-600">{brand.colors.gradientStart}</p>
                  <p className="text-xs text-gray-500 mt-2">Gradient början</p>
                </div>

                <div className="text-center">
                  <div 
                    className="aspect-square rounded-lg cursor-pointer mb-3 transition-transform hover:scale-105 shadow-md"
                    style={{ backgroundColor: brand.colors.gradientEnd }}
                    onClick={() => handleCopyColor(brand.colors.gradientEnd, 'Gradient End')}
                  >
                    {copiedColor === 'Gradient End' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-white rounded px-2 py-1 shadow-lg">
                          <span className="text-xs font-medium text-gray-900">Kopierad!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Gradient End</h4>
                  <p className="text-xs font-mono text-gray-600">{brand.colors.gradientEnd}</p>
                  <p className="text-xs text-gray-500 mt-2">Gradient slut</p>
                </div>
              </div>
              
              {/* Gradient Examples */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div 
                    className="aspect-[2/1] rounded-lg cursor-pointer mb-3 transition-transform hover:scale-105 shadow-md"
                    style={{ background: brand.colors.gradientPrimary }}
                    onClick={() => handleCopyColor(brand.colors.gradientPrimary, 'Gradient Primary')}
                  >
                    {copiedColor === 'Gradient Primary' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-white rounded px-2 py-1 shadow-lg">
                          <span className="text-xs font-medium text-gray-900">Kopierad!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Gradient Primary</h4>
                  <p className="text-xs text-gray-500">Start → End</p>
                </div>

                <div className="text-center">
                  <div 
                    className="aspect-[2/1] rounded-lg cursor-pointer mb-3 transition-transform hover:scale-105 shadow-md"
                    style={{ background: brand.colors.gradientDark }}
                    onClick={() => handleCopyColor(brand.colors.gradientDark, 'Gradient Dark')}
                  >
                    {copiedColor === 'Gradient Dark' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-white rounded px-2 py-1 shadow-lg">
                          <span className="text-xs font-medium text-gray-900">Kopierad!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Gradient Dark</h4>
                  <p className="text-xs text-gray-500">Void → Start</p>
                </div>
              </div>
              
              {/* Background Colors */}
              <div className="mt-8 max-w-md mx-auto">
                <div className="text-center">
                  <div 
                    className="aspect-[3/1] rounded-lg cursor-pointer mb-3 border border-gray-200 transition-transform hover:scale-105 shadow-md"
                    style={{ backgroundColor: brand.colors.classicBeige }}
                    onClick={() => handleCopyColor(brand.colors.classicBeige, 'Classic Beige')}
                  >
                    {copiedColor === 'Classic Beige' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-gray-900 rounded px-2 py-1 shadow-lg">
                          <span className="text-xs font-medium text-white">Kopierad!</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Classic Beige</h4>
                  <p className="text-xs font-mono text-gray-600">{brand.colors.classicBeige}</p>
                  <p className="text-xs text-gray-500">Neutrala ytor och bakgrunder</p>
                </div>
              </div>
            </Card.Section>
          </Card>
        </motion.section>

        {/* Color Usage */}
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
                Användning
              </h2>
              <p className="text-gray-600">
                Riktlinjer för hur färgerna används korrekt i olika sammanhang.
              </p>
            </Card.Section>
            <Card.Section className="p-8 pt-0">
              <div className="space-y-8">
                {/* On Blue Background */}
                <div className="rounded-lg p-8 shadow-lg" style={{ background: brand.colors.gradientPrimary }}>
                  <Badge size="sm" color="green" className="mb-4">Korrekt</Badge>
                  <h4 
                    className="text-2xl font-black uppercase mb-3"
                    style={{ 
                      color: brand.colors.heritageGold,
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    HABO IF MATCHDAG
                  </h4>
                  <p 
                    className="text-white leading-relaxed"
                    style={{ fontFamily: brand.typography.secondary.fontFamily }}
                  >
                    På blå bakgrund använder vi Heritage Gold för rubriker och 
                    vit text för optimal läsbarhet.
                  </p>
                </div>

                {/* On Light Background */}
                <div className="rounded-lg p-8 shadow-lg border" style={{ backgroundColor: brand.colors.classicBeige }}>
                  <Badge size="sm" color="green" className="mb-4">Korrekt</Badge>
                  <h4 
                    className="text-2xl font-black uppercase mb-3"
                    style={{ 
                      color: brand.colors.royalBlue,
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    HABO IF NYHETER
                  </h4>
                  <p 
                    className="text-gray-700 leading-relaxed"
                    style={{ fontFamily: brand.typography.secondary.fontFamily }}
                  >
                    På ljus bakgrund används Royal Blue för rubriker och 
                    <span style={{ color: brand.colors.heritageGold, fontWeight: 'bold' }}> Heritage Gold för accenter</span>.
                  </p>
                </div>
              </div>
            </Card.Section>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}