'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Link,
  Divider,
  Chip,
  Code
} from '@heroui/react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

export default function LayoutsPage() {
  const [layerImages, setLayerImages] = useState<Record<string, string>>({});
  const brand = HABO_IF_BRAND;

  // Simulate loading layer examples - in real app this would come from the layer generator
  useEffect(() => {
    // For now, I'll create placeholder data structure that shows the concept
    // In reality, this would fetch from the layer-examples generator
    const mockLayerImages = {
      'grid-visualization': '/api/placeholder-grid.png',
      'composite-all-layers': '/api/placeholder-composite.png',
      'exploded-view-3d': '/api/placeholder-3d.png',
      'layer0-backgrounds': '/api/placeholder-layer0.png',
      'layer1-blocks': '/api/placeholder-layer1.png',
      'layer2-pattern': '/api/placeholder-layer2.png',
      'layer3-hero': '/api/placeholder-layer3.png',
      'layer4-text': '/api/placeholder-layer4.png',
      'layer5-overlay': '/api/placeholder-layer5.png'
    };
    
    setLayerImages(mockLayerImages);
  }, []);

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
                LAYOUTER
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
            Layouter
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Habo IFs layoutsystem baserat på ett strukturerat 4×6 grid (4 kolumner × 6 rader) som skapar visuell konsistens och professionell känsla.
          </p>
        </motion.div>

        {/* Layout System Overview */}
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
                Layout system
              </h2>
              <p className="text-gray-600">
                Ett strukturerat 4×6 grid som skapar visuell konsistens och professionell känsla.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="bg-white border rounded-lg p-8 relative shadow-sm">
                <div className="grid grid-cols-4 grid-rows-6 gap-2 h-64">
                  {/* Grid visualization */}
                  {Array.from({ length: 24 }, (_, i) => (
                    <div 
                      key={i} 
                      className="border border-red-300 border-dashed flex items-center justify-center text-xs text-gray-400 hover:bg-red-50 transition-colors"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="absolute top-4 left-4">
                  <Chip size="sm" variant="flat">
                    4 kolumner × 6 rader
                  </Chip>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Grid System */}
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
                Grid system
              </h2>
              <p className="text-gray-600">
                Ett strukturerat 4×6 grid som tillåter flexibla layouter samtidigt som det säkerställer konsistens.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="space-y-8">
                {/* Example Layout Breakdown */}
                <Card className="bg-gray-50 shadow-sm">
                  <CardBody className="p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Layout komponenter</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ background: brand.colors.gradientPrimary }}></div>
                        <span>Gradient Primary blocks</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: brand.colors.classicBeige }}></div>
                        <span>Classic beige blocks</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: brand.colors.royalBlue }}></div>
                        <span>Hero image block (2×4)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded border-2 border-gray-300 bg-white"></div>
                        <span>Logo placement</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Grid Rules */}
                <Card className="bg-blue-50 border-blue-200 shadow-sm">
                  <CardBody className="p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Grid regler</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• <strong>Tessellering:</strong> Inga luckor eller överlapp tillåts</li>
                      <li>• <strong>Hero-dominans:</strong> 2×4 hero-block är alltid huvudfokus</li>
                      <li>• <strong>Asymmetri:</strong> Föredras över symmetriska layouts</li>
                      <li>• <strong>Balans:</strong> Max 6 block för att behålla enkelhet</li>
                    </ul>
                  </CardBody>
                </Card>

                {/* Technical Specs Quick Reference */}
                <Card className="shadow-sm">
                  <CardBody className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold" style={{ color: brand.colors.royalBlue }}>1080px</p>
                        <p className="text-xs text-gray-600">Canvas size</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold" style={{ color: brand.colors.heritageGold }}>4×6</p>
                        <p className="text-xs text-gray-600">Grid cells</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold" style={{ color: brand.colors.royalBlue }}>270×180</p>
                        <p className="text-xs text-gray-600">Cell size</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold" style={{ color: brand.colors.heritageGold }}>2×4</p>
                        <p className="text-xs text-gray-600">Hero block</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Layout Examples */}
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
                Layout examples
              </h2>
              <p className="text-gray-600">
                Tre huvudtyper av layouter som täcker olika användningsområden och visuella behov.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="space-y-8">
                {/* Hero Left Layout */}
                <Card className="shadow-sm">
                  <CardBody className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Hero Left</h4>
                    <div className="grid grid-cols-6 grid-rows-4 gap-1 h-32 text-xs mb-3">
                      <div className="col-span-1 row-span-1 flex items-center justify-center text-xs font-medium rounded-sm" 
                           style={{ backgroundColor: brand.colors.classicBeige, color: brand.colors.heritageGold }}>BEIGE TEXT</div>
                      <div className="col-span-2 row-span-1 flex items-center justify-center text-white rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>BLUE TEXTURE</div>
                      <div className="col-span-3 row-span-1 flex items-center justify-center rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}></div>
                      
                      <div className="col-span-2 row-span-3 bg-gray-200 flex items-center justify-center text-gray-600 font-medium rounded-sm">HERO IMAGE 2×4</div>
                      <div className="col-span-1 row-span-2 flex items-center justify-center text-white rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>BLUE</div>
                      <div className="col-span-1 row-span-3 flex items-center justify-center text-white text-vertical rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>VERT</div>
                      <div className="col-span-2 row-span-2 flex items-center justify-center rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}></div>
                      
                      <div className="col-span-1 flex items-center justify-center text-xs font-medium rounded-sm" 
                           style={{ backgroundColor: brand.colors.classicBeige, color: brand.colors.heritageGold }}>LOGO</div>
                      <div className="col-span-1 flex items-center justify-center rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}></div>
                    </div>
                    <p className="text-xs text-gray-500">Hero dominerar vänstra sidan, skapar stark asymmetrisk balans</p>
                  </CardBody>
                </Card>

                {/* Hero Center Layout */}
                <Card className="shadow-sm">
                  <CardBody className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Hero Center</h4>
                    <div className="grid grid-cols-6 grid-rows-4 gap-1 h-32 text-xs mb-3">
                      <div className="col-span-6 row-span-1 flex items-center justify-center text-white rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>BLUE TEXTURE HELA RADEN</div>
                      
                      <div className="col-span-1 row-span-2 flex items-center justify-center text-white rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>BLUE TEXT</div>
                      <div className="col-span-2 row-span-2 bg-gray-200 flex items-center justify-center text-gray-600 font-medium rounded-sm">HERO IMAGE</div>
                      <div className="col-span-2 row-span-2 bg-gray-200 flex items-center justify-center text-gray-600 rounded-sm">2×4</div>
                      <div className="col-span-1 row-span-2 flex items-center justify-center text-xs font-medium rounded-sm" 
                           style={{ backgroundColor: brand.colors.classicBeige, color: brand.colors.heritageGold }}>BEIGE LOGO</div>
                      
                      <div className="col-span-6 row-span-1 flex items-center justify-center text-white rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>BLUE TEXT HELA RADEN</div>
                    </div>
                    <p className="text-xs text-gray-500">Centrerat hero med symmetriska ramar av blått</p>
                  </CardBody>
                </Card>

                {/* Hero Right Layout */}
                <Card className="shadow-sm">
                  <CardBody className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Hero Right</h4>
                    <div className="grid grid-cols-6 grid-rows-4 gap-1 h-32 text-xs mb-3">
                      <div className="col-span-2 row-span-2 flex items-center justify-center text-xs font-medium rounded-sm" 
                           style={{ backgroundColor: brand.colors.classicBeige, color: brand.colors.heritageGold }}>BEIGE TEXT</div>
                      <div className="col-span-2 row-span-1 flex items-center justify-center text-white rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>BLUE TEXTURE</div>
                      <div className="col-span-2 row-span-4 bg-gray-200 flex items-center justify-center text-gray-600 font-medium rounded-sm">HERO IMAGE 2×4</div>
                      
                      <div className="col-span-1 row-span-2 flex items-center justify-center text-white text-vertical rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>VERT</div>
                      <div className="col-span-1 row-span-1 flex items-center justify-center text-xs font-medium rounded-sm" 
                           style={{ backgroundColor: brand.colors.classicBeige, color: brand.colors.heritageGold }}>LOGO</div>
                      
                      <div className="col-span-1 flex items-center justify-center text-vertical rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}></div>
                      <div className="col-span-1 row-span-1 flex items-center justify-center text-white rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>BLUE</div>
                      
                      <div className="col-span-2 row-span-1 flex items-center justify-center text-white rounded-sm" 
                           style={{ background: brand.colors.gradient50deg }}>BLUE TEXTURE</div>
                    </div>
                    <p className="text-xs text-gray-500">Hero på höger sida balanseras av mixed content till vänster</p>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Layer System */}
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
                Layer system
              </h2>
              <p className="text-gray-600">
                Layouterna byggs upp i lager som renderas i specifik ordning för att skapa djup och rikhet.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="space-y-6">
                <Card className="bg-gray-50 shadow-sm">
                  <CardBody className="p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Exploded view</h4>
                    <div className="bg-white rounded p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 text-center py-8">
                        Här skulle en 3D exploded view av lagersystemet visas<br/>
                        från layer-examples generatorn
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      3D isometric view som visar hur alla lager bygger upp den slutliga designen
                    </p>
                  </CardBody>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-gray-50 shadow-sm">
                    <CardBody className="p-4">
                      <h5 className="text-xs font-semibold text-gray-900 mb-3">Layer struktur</h5>
                      <div className="space-y-2 text-xs">
                        {[
                          { layer: 'Layer 0', description: 'Background gradients' },
                          { layer: 'Layer 1', description: 'Color blocks' },
                          { layer: 'Layer 2', description: 'Text pattern' },
                          { layer: 'Layer 3', description: 'Hero image' },
                          { layer: 'Layer 4', description: 'Text & logos' },
                          { layer: 'Layer 5', description: 'Overlay text' }
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between p-2 bg-white rounded border">
                            <span className="font-medium">{item.layer}</span>
                            <span className="text-gray-500">{item.description}</span>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                  
                  <Card className="bg-gray-50 shadow-sm">
                    <CardBody className="p-4">
                      <h5 className="text-xs font-semibold text-gray-900 mb-3">Grid overlay</h5>
                      <div className="bg-white rounded aspect-square border border-gray-200 flex items-center justify-center shadow-sm">
                        <p className="text-lg font-bold text-gray-500 text-center">4×6<br/>grid</p>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Technical Specs */}
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
                Tekniska specifikationer
              </h2>
              <p className="text-gray-600">
                Tekniska krav och specifikationer för korrekt implementering av layoutsystemet.
              </p>
            </CardHeader>
            <CardBody className="p-8 pt-0">
              <div className="space-y-8">
                <Card className="bg-gray-50 shadow-sm">
                  <CardBody className="p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Canvas konfiguration</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Canvas storlek', value: '1080×1080px' },
                        { label: 'Grid celler', value: '4 cols × 6 rows' },
                        { label: 'Cell storlek', value: '270×180px' },
                        { label: 'Hero block', value: '540×720px (2×4)' }
                      ].map((spec, index) => (
                        <div key={index} className="flex justify-between text-sm p-2 bg-white rounded border">
                          <span className="text-gray-600">{spec.label}</span>
                          <Code size="sm">{spec.value}</Code>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-blue-50 border-blue-200 shadow-sm">
                  <CardBody className="p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">CSS Grid implementering</h4>
                    <Code className="text-xs bg-white p-4 rounded border overflow-x-auto block whitespace-pre font-mono">
{`.habo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 1080px;
  height: 1080px;
}

.hero-block {
  grid-column: span 2;
  grid-row: span 4;
}`}
                    </Code>
                  </CardBody>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200 shadow-sm">
                  <CardBody className="p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Layoutgenerering</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• <strong>18 kombinationer:</strong> 6 layouter × 3 färgteman</li>
                      <li>• <strong>Slumpning:</strong> Layout och tema väljs automatiskt</li>
                      <li>• <strong>Tessellering:</strong> Valideras för att undvika luckor</li>
                      <li>• <strong>Hero placering:</strong> Vänster, center eller höger</li>
                    </ul>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}