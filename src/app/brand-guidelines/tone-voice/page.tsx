'use client';

import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Link,
  Divider,
  Chip
} from '@heroui/react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

export default function ToneVoicePage() {
  const brand = HABO_IF_BRAND;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Link href="/brand-guidelines">
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
                TON & RÖST
              </span>
            </div>
            
            <Button 
              as={Link}
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
            Ton & Röst
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Hur vi kommunicerar är lika viktigt som vad vi säger. Habo IFs röst speglar våra värderingar och skapar en känsla av tillhörighet.
          </p>
        </motion.div>

        {/* Our Voice */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border border-gray-200">
            <CardHeader className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Vår röst
              </h2>
              <p className="text-gray-600">
                Tre grundläggande egenskaper som definierar hur vi kommunicerar.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Authentic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className="text-white shadow-lg"
                    style={{ background: brand.colors.gradient50deg }}
                  >
                    <CardBody className="p-8">
                      <h3 
                        className="text-2xl font-black uppercase tracking-wider mb-4"
                        style={{ 
                          color: brand.colors.heritageGold,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        ÄKTA
                      </h3>
                      <p 
                        className="leading-relaxed mb-6"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        Vi låtsas inte vara något vi inte är. Vår kommunikation speglar våra 
                        verkliga värderingar och erfarenheter från Hajmyren.
                      </p>
                      <ul className="space-y-2 text-sm opacity-90">
                        <li>• Pratar om både segrar och nederlag</li>
                        <li>• Erkänner utmaningar och firar framsteg</li>
                        <li>• Delar verkliga berättelser från klubben</li>
                      </ul>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Inclusive */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className="shadow-lg"
                    style={{ 
                      background: 'white',
                      border: `2px solid ${brand.colors.heritageGold}`
                    }}
                  >
                    <CardBody className="p-8">
                      <h3 
                        className="text-2xl font-black uppercase tracking-wider mb-4"
                        style={{ 
                          color: brand.colors.royalBlue,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        INKLUDERANDE
                      </h3>
                      <p 
                        className="leading-relaxed mb-6 text-gray-700"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        Alla ska känna sig välkomna i våra budskap, oavsett ålder, kön, 
                        bakgrund eller fotbollskunskap.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Använder "vi" istället för "ni"</li>
                        <li>• Förklarar fotbollstermer när det behövs</li>
                        <li>• Representerar hela vår mångfald</li>
                      </ul>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Passionate */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className="bg-yellow-400 shadow-lg"
                  >
                    <CardBody className="p-8">
                      <h3 
                        className="text-2xl font-black uppercase tracking-wider mb-4"
                        style={{ 
                          color: brand.colors.royalBlue,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        PASSIONERAD
                      </h3>
                      <p 
                        className="leading-relaxed mb-6 text-gray-800"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        Vår kärlek till fotboll och klubben lyser igenom i allt vi skriver 
                        och säger. Men alltid med respekt för motståndare.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Entusiasm utan arrogans</li>
                        <li>• Stolthet över våra spelare</li>
                        <li>• Respekt för alla i fotbollsfamiljen</li>
                      </ul>
                    </CardBody>
                  </Card>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Tone Guidelines */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border border-gray-200">
            <CardHeader className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Tonguider
              </h2>
              <p className="text-gray-600">
                Konkreta exempel på hur vi ska och inte ska kommunicera.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 
                    className="text-xl font-black uppercase tracking-wider mb-6"
                    style={{ 
                      color: '#22c55e',
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    SÅ HÄR LÅTER VI
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        title: "Välkomnande & Inkluderande",
                        quote: "Kom som du är, vi ses på Hajmyren!",
                        description: "Ingen känner sig utanför när vi kommunicerar."
                      },
                      {
                        title: "Stolt men Ödmjuk",
                        quote: "Vi är stolta över våra spelare och det vi åstadkommit tillsammans.",
                        description: "Vi firar framgångar utan att glömma respekten."
                      },
                      {
                        title: "Personlig & Mänsklig",
                        quote: "Bakom varje spelare finns en historia värd att berätta.",
                        description: "Vi fokuserar på människorna bakom spelet."
                      },
                      {
                        title: "Framåtblickande & Positiv",
                        quote: "Varje träning är en chans att bli bättre.",
                        description: "Även nederlag blir möjligheter till utveckling."
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 bg-white rounded-lg border-l-4 border-green-500 shadow-sm"
                      >
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p 
                          className="text-sm italic mb-2 text-green-700"
                          style={{ fontFamily: brand.typography.secondary.fontFamily, fontStyle: 'italic' }}
                        >
                          "{item.quote}"
                        </p>
                        <p className="text-xs text-gray-600" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 
                    className="text-xl font-black uppercase tracking-wider mb-6"
                    style={{ 
                      color: '#dc2626',
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    SÅ HÄR LÅTER VI INTE
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        title: "Arrogant eller Nedlåtande",
                        quote: "Vi är bättre än alla andra lag i regionen.",
                        description: "Respekt för motståndare är grundläggande."
                      },
                      {
                        title: "Exkluderande eller Elitistisk",
                        quote: "Det här är bara för våra bästa spelare.",
                        description: "Alla ska känna sig välkomna i vår klubb."
                      },
                      {
                        title: "Negativ eller Klagande",
                        quote: "Domarna var helt värdelösa i den matchen.",
                        description: "Vi behåller respekten även i besvikelse."
                      },
                      {
                        title: "Opersonlig eller Kall",
                        quote: "Klubben har beslutat att genomföra följande åtgärder...",
                        description: "Vi kommunicerar som människor, inte som institution."
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 bg-white rounded-lg border-l-4 border-red-500 shadow-sm"
                      >
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p 
                          className="text-sm italic mb-2 text-red-700"
                          style={{ fontFamily: brand.typography.secondary.fontFamily, fontStyle: 'italic' }}
                        >
                          "{item.quote}"
                        </p>
                        <p className="text-xs text-gray-600" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Communication Channels */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border border-gray-200">
            <CardHeader className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Kommunikationskanaler
              </h2>
              <p className="text-gray-600">
                Hur vi anpassar vår ton för olika kanaler och sammanhang.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Social Media */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 
                    className="text-xl font-black uppercase tracking-wider mb-6"
                    style={{ 
                      color: brand.colors.royalBlue,
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    SOCIALA MEDIER
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        title: "Instagram & Facebook",
                        color: "text-blue-600",
                        tone: "Entusiastisk, visuell, personlig",
                        example: "Våra U15-tjejer visar upp ren magi på Hajmyren! ⚽✨ #HaboIF #VibrinnerBlått"
                      },
                      {
                        title: "Twitter/X",
                        color: "text-blue-400",
                        tone: "Snabb, informativ, engagerande",
                        example: "90' - Mål! Marcus Andersson avgör för A-laget! 2-1 till Habo IF! 🔥"
                      }
                    ].map((channel, index) => (
                      <Card key={index} className="shadow-sm">
                        <CardBody className="p-6">
                          <h4 className={`font-semibold mb-3 ${channel.color}`}>{channel.title}</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium mb-1">Ton:</p>
                              <p className="text-sm text-gray-600" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                                {channel.tone}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Exempel:</p>
                              <p 
                                className="text-sm italic text-gray-700"
                                style={{ fontFamily: brand.typography.secondary.fontFamily, fontStyle: 'italic' }}
                              >
                                "{channel.example}"
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Website & Newsletter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 
                    className="text-xl font-black uppercase tracking-wider mb-6"
                    style={{ 
                      color: brand.colors.royalBlue,
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    WEBB & NYHETSBREV
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        title: "Hemsida",
                        color: "text-green-600",
                        tone: "Informativ, välkomnande, professionell",
                        example: "Välkommen till Habo IF - där fotbollsdrömmar blir verklighet sedan 1926."
                      },
                      {
                        title: "Nyhetsbrev",
                        color: "text-yellow-600",
                        tone: "Personlig, uppdaterande, gemenskap",
                        example: "Hej Habo IF-familjen! Vilken vecka vi haft på Hajmyren..."
                      }
                    ].map((channel, index) => (
                      <Card key={index} className="shadow-sm">
                        <CardBody className="p-6">
                          <h4 className={`font-semibold mb-3 ${channel.color}`}>{channel.title}</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium mb-1">Ton:</p>
                              <p className="text-sm text-gray-600" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                                {channel.tone}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Exempel:</p>
                              <p 
                                className="text-sm italic text-gray-700"
                                style={{ fontFamily: brand.typography.secondary.fontFamily, fontStyle: 'italic' }}
                              >
                                "{channel.example}"
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Official Communications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 
                    className="text-xl font-black uppercase tracking-wider mb-6"
                    style={{ 
                      color: brand.colors.royalBlue,
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    OFFICIELLA MEDDELANDEN
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        title: "Pressmeddelanden",
                        color: "text-purple-600",
                        tone: "Professionell men mänsklig, faktabaserad",
                        example: "Habo IF är stolta att meddela vårt nya samarbete med..."
                      },
                      {
                        title: "Interna meddelanden",
                        color: "text-gray-600",
                        tone: "Direkt, tydlig, respektfull",
                        example: "Kära föräldrar och spelare, vi behöver prata om..."
                      }
                    ].map((channel, index) => (
                      <Card key={index} className="shadow-sm">
                        <CardBody className="p-6">
                          <h4 className={`font-semibold mb-3 ${channel.color}`}>{channel.title}</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium mb-1">Ton:</p>
                              <p className="text-sm text-gray-600" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                                {channel.tone}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Exempel:</p>
                              <p 
                                className="text-sm italic text-gray-700"
                                style={{ fontFamily: brand.typography.secondary.fontFamily, fontStyle: 'italic' }}
                              >
                                "{channel.example}"
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Language Guidelines */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border border-gray-200">
            <CardHeader className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Språkguider
              </h2>
              <p className="text-gray-600">
                Specifika ordval och fraser som hjälper oss kommunicera konsekvent.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 
                    className="text-xl font-black uppercase tracking-wider mb-6"
                    style={{ 
                      color: brand.colors.royalBlue,
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    ORDVAL & FRASER
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        instead: 'Istället för "supporters" säg:',
                        suggestion: '"Habo IF-familjen", "våra fantastiska supportrar", "er som står bakom oss"'
                      },
                      {
                        instead: 'Istället för "förlust" säg:',
                        suggestion: '"lärorik match", "steg i utvecklingen", "dagen när vi lärde oss mest"'
                      },
                      {
                        instead: 'Istället för "tränare" säg:',
                        suggestion: '"vår coach Marcus", "lagledningen", namn på person när det är möjligt'
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 bg-white rounded-lg shadow-sm"
                      >
                        <h4 className="font-semibold mb-3">{item.instead}</h4>
                        <p 
                          className="text-sm italic text-blue-600"
                          style={{ fontFamily: brand.typography.secondary.fontFamily, fontStyle: 'italic' }}
                        >
                          {item.suggestion}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 
                    className="text-xl font-black uppercase tracking-wider mb-6"
                    style={{ 
                      color: brand.colors.royalBlue,
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    VÅRA SIGNATURER
                  </h3>
                  
                  <div className="space-y-6">
                    <Card 
                      className="shadow-sm"
                      style={{ borderLeft: `4px solid ${brand.colors.heritageGold}` }}
                    >
                      <CardBody className="p-6">
                        <h4 className="font-semibold mb-3">Huvudslagord</h4>
                        <p 
                          className="text-2xl font-black uppercase mb-2"
                          style={{ 
                            color: brand.colors.royalBlue,
                            fontFamily: brand.typography.primary.fontFamily
                          }}
                        >
                          VI BRINNER BLÅTT
                        </p>
                        <p className="text-sm text-gray-600" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                          Vårt känslomässiga löfte - passion, stolthet, gemenskap
                        </p>
                      </CardBody>
                    </Card>
                    
                    <Card className="shadow-sm">
                      <CardBody className="p-6">
                        <h4 className="font-semibold mb-3">Hashtags</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Chip size="sm" color="primary" variant="flat">#HaboIF</Chip>
                          <Chip size="sm" color="primary" variant="flat">#VibrinnerBlått</Chip>
                          <Chip size="sm" color="primary" variant="flat">#Hajmyren</Chip>
                        </div>
                        <p className="text-xs text-gray-600" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                          Använd konsekvent, max 3 hashtags per inlägg
                        </p>
                      </CardBody>
                    </Card>
                    
                    <Card className="shadow-sm">
                      <CardBody className="p-6">
                        <h4 className="font-semibold mb-3">Avslutningsfraser</h4>
                        <ul className="space-y-2 text-sm" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                          <li>• "Vi ses på Hajmyren!"</li>
                          <li>• "Tillsammans är vi starkare"</li>
                          <li>• "Med hjärta för Habo"</li>
                          <li>• "Blått är vår färg, gemenskap är vår styrka"</li>
                        </ul>
                      </CardBody>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Content Examples */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border border-gray-200">
            <CardHeader className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Innehållsexempel
              </h2>
              <p className="text-gray-600">
                Konkreta exempel på bra och dålig kommunikation i praktiken.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 
                    className="text-xl font-black uppercase tracking-wider mb-6"
                    style={{ 
                      color: '#22c55e',
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    BRA EXEMPEL
                  </h3>
                  
                  <div className="space-y-8">
                    {[
                      {
                        title: "Matchresultat",
                        content: "Vilken fight våra U17-killar visade idag! Trots att vi kom efter tidigt kämpade sig laget tillbaka och Marcus Svensson blev matchhjälte med sitt avgörande mål i 89:e minuten. Det här är Habo IF-andan när den är som bäst! 💪⚽ #HaboIF #VibrinnerBlått",
                        note: "Visar stolthet, berättar historia, inkluderar känslor"
                      },
                      {
                        title: "Tränarintervju",
                        content: "Anna Pettersson har lett våra P13 i tre år och hennes passion smittar av sig. 'Det bästa med att träna på Habo IF är att se när spelarna plötsligt förstår något nytt. Det glittret i ögonen - det är därför jag gör det här.' Tack Anna för allt du ger våra unga spelare! 🙏",
                        note: "Personligt, citat som visar värderingar, tacksamhet"
                      }
                    ].map((example, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-green-500"
                      >
                        <h4 className="font-semibold mb-2 text-green-700">{example.title}</h4>
                        <p 
                          className="italic mb-3"
                          style={{ fontFamily: brand.typography.secondary.fontFamily, fontStyle: 'italic' }}
                        >
                          "{example.content}"
                        </p>
                        <p className="text-xs text-gray-600">{example.note}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 
                    className="text-xl font-black uppercase tracking-wider mb-6"
                    style={{ 
                      color: '#dc2626',
                      fontFamily: brand.typography.primary.fontFamily
                    }}
                  >
                    UNDVIK DETTA
                  </h3>
                  
                  <div className="space-y-8">
                    {[
                      {
                        title: "Matchresultat",
                        content: "Habo IF besegrade XYZ FC med 3-2. Målen gjordes av M. Svensson (89'). Nästa match spelas på torsdag 19:00.",
                        note: "Kalt, opersonligt, ingen känslomässig koppling"
                      },
                      {
                        title: "Efter förlust",
                        content: "Besvikna över resultatet idag. Domaren tog helt fel beslut vid 0-1 målet och vår motståndare spelade otroligt smutsigt. Vi förtjänade att vinna den här matchen.",
                        note: "Klagande, skyller på andra, dålig förlorare"
                      }
                    ].map((example, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-red-500"
                      >
                        <h4 className="font-semibold mb-2 text-red-700">{example.title}</h4>
                        <p 
                          className="italic mb-3"
                          style={{ fontFamily: brand.typography.secondary.fontFamily, fontStyle: 'italic' }}
                        >
                          "{example.content}"
                        </p>
                        <p className="text-xs text-gray-600">{example.note}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}