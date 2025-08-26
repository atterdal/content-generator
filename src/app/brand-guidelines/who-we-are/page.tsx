'use client';

import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Link
} from '@heroui/react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

export default function WhoWeArePage() {
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
                VILKA VI ÄR
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
            Vilka vi är
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Habo IF är mer än en fotbollsklubb. Vi är en gemenskap som brinner blått och bygger framtidens idrottare med glädje, utveckling och sammanhållning.
          </p>
        </motion.div>

        {/* Our History */}
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
                Vår historia
              </h2>
              <p className="text-gray-600">
                Habo IF grundades 1926 av idrottsentusiaster som ville skapa något större än sig själva.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className="text-center text-white shadow-lg"
                    style={{ background: brand.colors.gradient50deg }}
                  >
                    <CardBody className="p-12">
                      <p 
                        className="text-8xl font-black uppercase mb-4"
                        style={{ 
                          color: brand.colors.heritageGold,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        1926
                      </p>
                      <p 
                        className="text-xl italic"
                        style={{ 
                          fontFamily: brand.typography.secondary.fontFamily,
                          fontStyle: 'italic'
                        }}
                      >
                        Grundades i Habo
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ fontFamily: brand.typography.secondary.fontFamily }}
                  >
                    Habo Idrottsförening grundades 1926 av en grupp idrottsentusiaster som ville 
                    skapa något större än sig själva. Från de första matcherna på enkla grusplaner 
                    till dagens moderna Hajmyren har vi alltid haft samma vision.
                  </p>
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ fontFamily: brand.typography.secondary.fontFamily }}
                  >
                    Under snart 100 år har vi varit en central del av Habo kommun, inte bara som 
                    fotbollsklubb utan som en mötesplats där generationer har vuxit upp tillsammans. 
                    Vi har fostrat spelare, ledare och supporters som bär våra värderingar vidare.
                  </p>
                  <p 
                    className="text-lg italic leading-relaxed text-gray-600"
                    style={{ 
                      fontFamily: brand.typography.secondary.fontFamily,
                      fontStyle: 'italic'
                    }}
                  >
                    Vår historia är inte bara skriven i resultat och tabellplaceringar, 
                    utan i alla de människor som valt att brinna blått tillsammans med oss.
                  </p>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Core Values */}
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
                Våra kärnvärden
              </h2>
              <p className="text-gray-600">
                Tre grundpelare som formar allt vi gör på Habo IF.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Glädje */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow">
                    <CardBody className="p-8">
                      <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                        <span className="text-2xl">😊</span>
                      </div>
                      <h3 
                        className="text-2xl font-black uppercase tracking-wider mb-4"
                        style={{ 
                          color: brand.colors.royalBlue,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        GLÄDJE
                      </h3>
                      <p 
                        className="text-gray-700 leading-relaxed mb-4"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        Fotboll ska vara roligt. Vi tror på att skapa en miljö där alla trivs, 
                        skrattar och känner glädje i det vi gör tillsammans. När vi har roligt 
                        spelar vi bättre fotboll.
                      </p>
                      <ul className="text-sm space-y-2" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">•</span>
                          <span>Positiv atmosfär på träningar</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">•</span>
                          <span>Firande av framsteg, stora som små</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">•</span>
                          <span>Lek och kreativitet i fotbollsspelet</span>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Utveckling */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow">
                    <CardBody className="p-8">
                      <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mb-6">
                        <span className="text-2xl">📈</span>
                      </div>
                      <h3 
                        className="text-2xl font-black uppercase tracking-wider mb-4"
                        style={{ 
                          color: brand.colors.royalBlue,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        UTVECKLING
                      </h3>
                      <p 
                        className="text-gray-700 leading-relaxed mb-4"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        Vi tror på kontinuerlig utveckling för alla - spelare, ledare och förening. 
                        Varje träning och match är en möjlighet att bli bättre än igår.
                      </p>
                      <ul className="text-sm space-y-2" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Individuell utveckling för varje spelare</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Utbildning av ledare och tränare</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>Ständig förbättring av verksamheten</span>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Gemenskap */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow">
                    <CardBody className="p-8">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: brand.colors.royalBlue }}>
                        <span className="text-2xl text-white">🤝</span>
                      </div>
                      <h3 
                        className="text-2xl font-black uppercase tracking-wider mb-4"
                        style={{ 
                          color: brand.colors.royalBlue,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        GEMENSKAP
                      </h3>
                      <p 
                        className="text-gray-700 leading-relaxed mb-4"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        Vi är starkast tillsammans. Habo IF är en plats där alla känner sig 
                        välkomna, respekterade och del av något större än sig själva.
                      </p>
                      <ul className="text-sm space-y-2" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Inkludering och mångfald</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Stöd för varandra på och utanför plan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Familj och vänskap genom fotboll</span>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Our Mission */}
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
                Vår mission
              </h2>
              <p className="text-gray-600">
                Vad vi strävar efter att åstadkomma varje dag.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <Card 
                    className="text-white shadow-lg"
                    style={{ background: brand.colors.gradient50deg }}
                  >
                    <CardBody className="p-12">
                      <p 
                        className="text-2xl md:text-3xl leading-relaxed italic mb-6"
                        style={{ 
                          fontFamily: brand.typography.secondary.fontFamily,
                          fontStyle: 'italic'
                        }}
                      >
                        "Att skapa en fotbollsklubb där alla kan utvecklas, ha roligt och 
                        bygga livslånga vänskaper genom den sport vi älskar."
                      </p>
                      <div className="w-16 h-1 mx-auto" style={{ backgroundColor: brand.colors.heritageGold }}></div>
                    </CardBody>
                  </Card>
                </motion.div>
                
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {[
                    {
                      title: "FÖR SPELARNA",
                      text: "Vi ger varje spelare möjlighet att utvecklas både som fotbollsspelare och som människa, oavsett ålder eller nivå.",
                      delay: 0
                    },
                    {
                      title: "FÖR FAMILJER",
                      text: "Vi skapar en trygg och inkluderande miljö där hela familjer kan vara delaktiga och känna sig hemma.",
                      delay: 0.1
                    },
                    {
                      title: "FÖR HABO",
                      text: "Vi bidrar till att göra Habo till en ännu bättre plats att leva och växa upp i genom vårt idrottsengagemang.",
                      delay: 0.2
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: item.delay }}
                      viewport={{ once: true }}
                    >
                      <h3 
                        className="text-xl font-black uppercase tracking-wider mb-4"
                        style={{ 
                          color: brand.colors.royalBlue,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-gray-700 leading-relaxed"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Our Vision */}
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
                Vår vision
              </h2>
              <p className="text-gray-600">
                Vart vi är på väg och vad vi vill bli.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <p 
                      className="text-4xl font-black uppercase leading-tight mb-6"
                      style={{ 
                        color: brand.colors.heritageGold,
                        fontFamily: brand.typography.primary.fontFamily
                      }}
                    >
                      ATT BLI SMÅLANDS MEST RESPEKTERADE FOTBOLLSKLUBB
                    </p>
                    <div className="w-16 h-1 mb-6" style={{ backgroundColor: brand.colors.royalBlue }}></div>
                    <p 
                      className="text-lg leading-relaxed"
                      style={{ fontFamily: brand.typography.secondary.fontFamily }}
                    >
                      Inte för att vi vinner flest matcher eller har mest pengar, utan för att 
                      vi gör fotboll på rätt sätt. Med respekt, utveckling och glädje som grund.
                    </p>
                  </motion.div>
                  
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="shadow-sm">
                        <CardBody className="p-6">
                          <h4 
                            className="text-lg font-black uppercase tracking-wider mb-3"
                            style={{ 
                              color: brand.colors.royalBlue,
                              fontFamily: brand.typography.primary.fontFamily
                            }}
                          >
                            2030: VÅRT MÅL
                          </h4>
                          <ul className="space-y-2 text-sm" style={{ fontFamily: brand.typography.secondary.fontFamily }}>
                            <li>• 500+ aktiva medlemmar</li>
                            <li>• Representanter på regional och nationell nivå</li>
                            <li>• Egen fotbollsskola och tränarutbildning</li>
                            <li>• Modernaste anläggningar i regionen</li>
                            <li>• Hållbar ekonomi och miljötänk</li>
                          </ul>
                        </CardBody>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Card className="shadow-sm">
                        <CardBody className="p-6">
                          <h4 
                            className="text-lg font-black uppercase tracking-wider mb-3"
                            style={{ 
                              color: brand.colors.royalBlue,
                              fontFamily: brand.typography.primary.fontFamily
                            }}
                          >
                            LÅNGSIKTIGT
                          </h4>
                          <p 
                            className="text-sm leading-relaxed"
                            style={{ fontFamily: brand.typography.secondary.fontFamily }}
                          >
                            Att vara den klubb som andra ser upp till och vill samarbeta med. 
                            En förebild för hur fotboll ska bedrivas med hjärta och hjärna.
                          </p>
                        </CardBody>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* What Makes Us Special */}
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
                Vad gör oss unika
              </h2>
              <p className="text-gray-600">
                De egenskaper som skiljer Habo IF från andra klubbar.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  {[
                    {
                      title: "HAJMYREN - VÅR HEMMAARENA",
                      text: "Mer än en fotbollsplan - det är hjärtat av vår verksamhet. Här tränar våra yngsta spelare bredvid A-laget, och här skapas de minnen som varar livet ut."
                    },
                    {
                      title: "VÅR TRÄNARFILOSOFI",
                      text: "Vi tror på att utveckla kompletta fotbollsspelare. Teknik, taktik och fysik är viktigt, men minst lika viktigt är att utveckla kreativitet, självständighet och lagkänsla."
                    },
                    {
                      title: "GENERATIONSÖVERSKRIDANDE",
                      text: "Hos oss spelar gamla Habo IF-legender golf med dagens A-lagsspelare. Våra supporters är ofta föräldrar till spelare som själva växte upp i klubben. Detta skapar en unik kontinuitet och sammanhållning."
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h3 
                        className="text-xl font-black uppercase tracking-wider mb-4"
                        style={{ 
                          color: brand.colors.heritageGold,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-gray-700 leading-relaxed"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Card 
                    className="text-white shadow-lg"
                    style={{ background: brand.colors.gradient50deg }}
                  >
                    <CardBody className="p-12">
                      <p 
                        className="text-5xl font-black uppercase mb-6"
                        style={{ 
                          color: brand.colors.heritageGold,
                          fontFamily: brand.typography.primary.fontFamily
                        }}
                      >
                        VI BRINNER BLÅTT
                      </p>
                      <p 
                        className="text-xl italic mb-8"
                        style={{ 
                          fontFamily: brand.typography.secondary.fontFamily,
                          fontStyle: 'italic'
                        }}
                      >
                        Det är mer än vårt slagord
                      </p>
                      <p 
                        className="leading-relaxed opacity-90"
                        style={{ fontFamily: brand.typography.secondary.fontFamily }}
                      >
                        Det är känslan av tillhörighet, stoltheten över vår klubb och 
                        passionen som driver oss framåt varje dag. När du drar på dig 
                        Habo IF-tröjan bär du med dig historien och framtiden.
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}