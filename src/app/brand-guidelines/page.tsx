'use client';

import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Link,
  Divider,
  Chip,
  Avatar,
  Badge
} from '@heroui/react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';
import { BRAND_GUIDELINES_NAVIGATION } from '@/apps/habo-if/config/navigation';
import Logo from '@/components/ui/Logo';

export default function BrandGuidelinesPage() {
  const brand = HABO_IF_BRAND;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Logo size="md" />
              <span 
                className="text-base font-black uppercase tracking-wider"
                style={{ 
                  color: brand.colors.royalBlue,
                  fontFamily: brand.typography.primary.fontFamily
                }}
              >
                BRAND GUIDELINES
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/generator"
                className="text-gray-600 hover:text-habo-blue transition-colors font-semibold uppercase tracking-wider"
                style={{ 
                  fontSize: '13px',
                  fontFamily: brand.typography.primary.fontFamily
                }}
              >
                Generator
              </Link>
              <Link
                href="/layer-examples"
                className="text-gray-600 hover:text-habo-blue transition-colors font-semibold uppercase tracking-wider"
                style={{ 
                  fontSize: '13px',
                  fontFamily: brand.typography.primary.fontFamily
                }}
              >
                Exempel
              </Link>
            </div>

            <Button 
              as={Link}
              href="/generator"
              size="sm"
              className="text-white font-bold uppercase tracking-wider"
              style={{
                backgroundColor: brand.colors.royalBlue,
                fontFamily: brand.typography.primary.fontFamily,
                fontSize: '13px'
              }}
            >
              SKAPA GRAFIK
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Dynamic Brand Content */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${brand.organization.heroBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center"
        >
          <div className="max-w-5xl mx-auto">
            {/* Large Logo */}
            <div className="mb-8">
              <Logo 
                variant="white" 
                size="xl" 
                className="mx-auto"
                style={{
                  filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))'
                }}
              />
            </div>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 tracking-tight uppercase"
              style={{ 
                color: brand.colors.heritageGold,
                fontFamily: brand.typography.primary.fontFamily,
                letterSpacing: '0.02em',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)'
              }}
            >
              {brand.organization.heroTitle}
              <span 
                className="block mt-2" 
                style={{ 
                  color: 'transparent',
                  fontFamily: brand.typography.primary.fontFamily,
                  WebkitTextStroke: `2px ${brand.colors.heritageGold}`,
                  textStroke: `2px ${brand.colors.heritageGold}`,
                  textShadow: '0 2px 20px rgba(0,0,0,0.5)'
                }}
              >
                {brand.organization.heroSubtitle}
              </span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ 
                color: brand.colors.pureWhite,
                fontFamily: brand.typography.secondary.fontFamily,
                fontStyle: 'italic',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {brand.organization.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                as={Link}
                href="/generator"
                size="lg"
                className="font-bold text-white shadow-lg"
                style={{
                  backgroundColor: brand.colors.royalBlue,
                  fontFamily: brand.typography.primary.fontFamily,
                  fontSize: '14px',
                  letterSpacing: '0.1em'
                }}
              >
                ÖPPNA GRAFIKGENERATOR
              </Button>
              <Button 
                as={Link}
                href="#guidelines"
                size="lg"
                variant="bordered"
                className="font-bold border-2 text-white hover:bg-white hover:text-black transition-colors shadow-lg"
                style={{
                  borderColor: brand.colors.heritageGold,
                  fontFamily: brand.typography.primary.fontFamily,
                  fontSize: '14px',
                  letterSpacing: '0.1em'
                }}
              >
                UTFORSKA RIKTLINJER
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator Arrow */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg 
            className="w-6 h-6 text-white opacity-80" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </section>

      {/* Core Values Section - Neutral Theme with Brand Accents */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Kärnvärden
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {brand.organization.coreValues.map((value, index) => (
                <Card 
                  key={value}
                  className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200"
                  isPressable
                >
                  <CardBody className="text-center p-8">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-white"
                      style={{ backgroundColor: brand.colors.royalBlue }}
                    >
                      {index === 0 ? '😊' : index === 1 ? '📈' : '🤝'}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value}
                    </h3>
                    <p className="text-gray-600">
                      {index === 0 && 'Fotboll ska vara roligt för alla'}
                      {index === 1 && 'Vi blir bättre varje dag'}
                      {index === 2 && 'Tillsammans är vi starkare'}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Guidelines Navigation */}
      <section id="guidelines" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
              Varumärkesriktlinjer
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {brand.organization.brandGuidelinesDescription} för {brand.organization.name}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BRAND_GUIDELINES_NAVIGATION.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    as={Link}
                    href={item.href}
                    isPressable
                    isHoverable
                    className="h-full group hover:shadow-xl transition-all duration-300 border border-gray-200"
                  >
                    <CardHeader className="pb-0 pt-6 px-6 bg-white">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                          style={{ backgroundColor: brand.colors.royalBlue }}
                        >
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                    </CardHeader>
                    <CardBody className="pt-4 px-6 pb-6 bg-white">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div 
                        className="flex items-center text-sm font-medium transition-colors group-hover:underline"
                        style={{ color: brand.colors.royalBlue }}
                      >
                        Läs mer →
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Snabbåtkomst
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border border-gray-200">
                <CardHeader className="p-8" style={{ backgroundColor: brand.colors.royalBlue }}>
                  <h3 className="text-2xl font-bold text-white">
                    Grafikgenerator
                  </h3>
                </CardHeader>
                <CardBody className="p-8">
                  <p className="mb-6 text-gray-600">
                    Skapa professionell grafik för sociala medier med vårt automatiska verktyg. 
                    Följer alla varumärkesriktlinjer automatiskt.
                  </p>
                  <Button 
                    as={Link}
                    href="/generator"
                    size="lg"
                    className="w-full font-bold text-white"
                    style={{ backgroundColor: brand.colors.royalBlue }}
                  >
                    Öppna Generator
                  </Button>
                </CardBody>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader className="p-8" style={{ backgroundColor: brand.colors.heritageGold }}>
                  <h3 className="text-2xl font-bold text-white">
                    Lagledare Portal
                  </h3>
                </CardHeader>
                <CardBody className="p-8">
                  <p className="mb-6 text-gray-600">
                    För lagledare - skapa snabbt matchdagsgrafik, resultat och spelarfokus för ditt lag.
                  </p>
                  <Button 
                    as={Link}
                    href="/teams/login"
                    size="lg"
                    className="w-full font-bold text-white"
                    style={{ backgroundColor: brand.colors.heritageGold }}
                  >
                    Logga in som Lagledare
                  </Button>
                </CardBody>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader className="p-8 bg-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Ladda ner Assets
                  </h3>
                </CardHeader>
                <CardBody className="p-8">
                  <p className="mb-6 text-gray-600">
                    Hämta logotyper, typsnitt och andra resurser du behöver för att 
                    skapa {brand.organization.name}-material.
                  </p>
                  <Button 
                    as={Link}
                    href="/brand-guidelines/downloads"
                    variant="bordered"
                    size="lg"
                    className="w-full font-bold border-2"
                    style={{ 
                      borderColor: brand.colors.royalBlue,
                      color: brand.colors.royalBlue 
                    }}
                  >
                    Till Downloads
                  </Button>
                </CardBody>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo variant="white" size="md" />
            <h3 className="text-xl font-bold">
              {brand.organization.tagline}
            </h3>
          </div>
          <p className="text-gray-400 mb-8">
            {brand.organization.fullName} • Sedan {brand.organization.established}
          </p>
          <Divider className="my-8 bg-gray-700" />
          <p className="text-sm text-gray-400">
            © 2025 {brand.organization.name}. Alla rättigheter förbehållna.
          </p>
        </div>
      </footer>
    </div>
  );
}