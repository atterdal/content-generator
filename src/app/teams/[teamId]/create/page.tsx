'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
  Link,
  Switch,
  Divider
} from '@heroui/react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';
import { createGenericCanvas } from '@/lib/graphics-engine/Canvas';
import { ColorTheme, COLOR_THEMES } from '@/types';
import { ALL_LAYOUTS } from '@/lib/graphics-engine/test';
import { Block, Floater } from '@/lib/graphics-engine/types';
import {
  createHaboBeigeBlock,
  createHaboGradientBlock,
  createRandomPlayerBlock,
  createHaboLogoBlock,
  createHaboTextPattern,
  createMatchOverlay,
  createPlayerSpotlightOverlay,
  createTrainingOverlay,
  createHaboMainHeader
} from '@/apps/habo-if/components/HaboComponents';

// Team colors configuration
const TEAM_COLORS = {
  'p15': { primary: '#0629A0', secondary: '#B6975C' },
  'f15': { primary: '#0629A0', secondary: '#B6975C' },
  'p13': { primary: '#0629A0', secondary: '#B6975C' },
  'f13': { primary: '#0629A0', secondary: '#B6975C' },
  'herr-a': { primary: '#0629A0', secondary: '#B6975C' },
  'dam-a': { primary: '#0629A0', secondary: '#B6975C' }
};

// Template configurations - removed defaultLayout so all layouts are available
const TEMPLATES = {
  matchday: {
    name: 'Matchdag',
    fields: ['opponent', 'date', 'time', 'location', 'message']
  },
  result: {
    name: 'Resultat',
    fields: ['opponent', 'homeScore', 'awayScore', 'scorers', 'message']
  },
  training: {
    name: 'Träning',
    fields: ['date', 'time', 'location', 'focus', 'message']
  },
  player: {
    name: 'Spelarfokus',
    fields: ['playerName', 'position', 'number', 'message', 'stats']
  },
  event: {
    name: 'Event',
    fields: ['eventName', 'date', 'time', 'location', 'description']
  },
  news: {
    name: 'Nyheter',
    fields: ['headline', 'subheadline', 'message', 'date']
  }
};

// Layout options - using actual layouts from graphics engine
const LAYOUTS = [
  { id: 0, name: 'Hero Vänster', description: 'Bild vänster, element höger' },
  { id: 1, name: 'Hero Central', description: 'Centrerad hero med ram' },
  { id: 2, name: 'Hero Höger', description: 'Element vänster, bild höger' },
  { id: 3, name: 'Hero Central Vertikal', description: 'Vertikal centrerad layout' },
  { id: 4, name: 'Hero Övre Vänster', description: 'Hero i övre vänstra hörnet' },
  { id: 5, name: 'Hero Höger Asymmetrisk', description: 'Asymmetrisk höger layout' }
];

export default function TeamCreatePage() {
  const brand = HABO_IF_BRAND;
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const teamId = params?.teamId as string;
  const templateId = searchParams?.get('template') || 'matchday';
  const playerId = searchParams?.get('player');
  
  const [teamData, setTeamData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  // Form state
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [includePlayer, setIncludePlayer] = useState(!!playerId);
  const [includeWatermark, setIncludeWatermark] = useState(true);

  useEffect(() => {
    // Check authentication
    const authData = sessionStorage.getItem('teamAuth');
    if (!authData) {
      router.push('/teams/login');
      return;
    }

    const auth = JSON.parse(authData);
    if (auth.teamId !== teamId) {
      router.push('/teams/login');
      return;
    }

    setTeamData(auth);
  }, [teamId, templateId, router]);

  const generateGraphic = async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // Get selected layout and theme
      const layout = ALL_LAYOUTS[selectedLayout];
      const theme = COLOR_THEMES[selectedTheme];
      
      // Create generic canvas using the new system
      const canvas = createGenericCanvas(canvasRef.current, layout, theme);
      
      // Create all blocks and floaters exactly like haboLayerGenerator.ts
      const blocks: Block[] = [];
      const floaters: Floater[] = [];

      // Layer 0: Background floater
      const backgroundFloater = new Floater(0);
      backgroundFloater.addBackground(async (ctx: any, bounds: any) => {
        // Same background handler as haboLayerGenerator
        const backgroundElements = [
          '/images/elements/Edward3.jpg',
          '/images/elements/Robert1.jpg',
          '/images/elements/Edward-Movement.jpg',
          '/images/elements/Robert-Movement-wide.jpg'
        ];
        
        const selectedBg = backgroundElements[Math.floor(Math.random() * backgroundElements.length)];
        
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const scale = Math.max(
              bounds.width / img.width,
              bounds.height / img.height
            ) * 1.2;
            
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            const offsetX = (bounds.width - scaledWidth) / 2;
            const offsetY = (bounds.height - scaledHeight) / 2;
            
            ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
            
            // Add blue overlay
            ctx.fillStyle = `${theme.blue}70`;
            ctx.fillRect(0, 0, bounds.width, bounds.height);
            
            resolve();
          };
          
          img.onerror = () => {
            // Fallback gradient
            const gradient = ctx.createLinearGradient(0, 0, bounds.width * 0.8, bounds.height * 0.8);
            gradient.addColorStop(0, theme.blue);
            gradient.addColorStop(1, theme.blueLight || theme.blue);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, bounds.width, bounds.height);
            resolve();
          };
          
          img.src = selectedBg;
        });
      });
      canvas.addFloater(backgroundFloater);

      // Layer 1: Color blocks
      if (layout.includes('beige')) {
        const beigeBlock = createHaboBeigeBlock('beige', 1, theme);
        canvas.addBlock(beigeBlock);
      }
      if (layout.includes('blue')) {
        const blueBlock = createHaboGradientBlock('blue', 1, theme);
        canvas.addBlock(blueBlock);
      }
      if (layout.includes('graphic')) {
        const graphicBlock = createHaboGradientBlock('graphic', 1, theme, { intensity: 'strong' });
        canvas.addBlock(graphicBlock);
      }
      if (layout.includes('logo')) {
        const logoBackgroundBlock = createHaboBeigeBlock('logo', 1, theme);
        canvas.addBlock(logoBackgroundBlock);
      }

      // Layer 2: Pattern floater (if watermark enabled)
      if (includeWatermark) {
        const textPattern = createHaboTextPattern(2, teamData.teamName.toUpperCase(), theme);
        canvas.addFloater(textPattern);
      }

      // Layer 3: Hero block
      if (layout.includes('hero')) {
        const heroBlock = createRandomPlayerBlock('hero', 3, theme);
        canvas.addBlock(heroBlock);
      }

      // Layer 4: Logo block
      if (layout.includes('logo')) {
        const logoBlock = createHaboLogoBlock('logo', theme, { withBackground: false });
        canvas.addBlock(logoBlock);
      }

      // Layer 5: Overlay based on template type
      let overlayComponent: Floater;
      switch (templateId) {
        case 'matchday':
          overlayComponent = createMatchOverlay(5, getOverlayMainText(), getOverlaySubText(), theme, 1080);
          break;
        case 'player':
          overlayComponent = createPlayerSpotlightOverlay(5, getOverlayMainText(), getOverlaySubText(), theme, 1080);
          break;
        case 'training':
          overlayComponent = createTrainingOverlay(5, getOverlayMainText(), getOverlaySubText(), theme, 1080);
          break;
        default:
          overlayComponent = createHaboMainHeader(5, getOverlayMainText(), getOverlaySubText(), theme, 1080);
      }
      canvas.addFloater(overlayComponent);

      // Render all layers and get image data
      await canvas.renderAll();
      const imageData = canvas.toDataURL('image/png');
      setPreviewUrl(imageData);
      
    } catch (error) {
      console.error('Error generating graphic:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Helper functions to get text based on template
  const getVerticalText = (): string => {
    switch (templateId) {
      case 'matchday': return 'MATCHDAG';
      case 'result': return 'RESULTAT';
      case 'player': return 'SPELARE';
      case 'training': return 'TRÄNING';
      case 'event': return 'EVENT';
      case 'news': return 'NYHETER';
      default: return 'HABO IF';
    }
  };
  
  const getMainText = (): string => {
    switch (templateId) {
      case 'matchday': return `${formData.time || '15:00'} ${formData.date || 'IDAG'}`;
      case 'result': return `${formData.homeScore || '0'}-${formData.awayScore || '0'}`;
      case 'player': return `#${formData.number || '00'} ${formData.position || 'SPELARE'}`;
      case 'training': return `TRÄNING ${formData.time || '18:00'}`;
      case 'event': return formData.eventName || 'EVENT';
      case 'news': return formData.headline || 'NYHETER';
      default: return teamData?.teamName || 'HABO IF';
    }
  };
  
  const getOverlayMainText = (): string => {
    switch (templateId) {
      case 'matchday': return formData.opponent || 'MOTSTÅNDARE';
      case 'result': return formData.opponent || 'MOTSTÅNDARE';
      case 'player': return formData.playerName || 'SPELARNAMN';
      case 'training': return formData.focus || 'TRÄNING';
      case 'event': return formData.eventName || 'EVENT';
      case 'news': return formData.headline || 'RUBRIK';
      default: return teamData?.teamName || 'HABO IF';
    }
  };
  
  const getOverlaySubText = (): string => {
    switch (templateId) {
      case 'matchday': return formData.location || 'HAJMYREN';
      case 'result': return formData.scorers || '';
      case 'player': return formData.message || '';
      case 'training': return formData.location || 'HAJMYREN';
      case 'event': return formData.location || '';
      case 'news': return formData.subheadline || '';
      default: return formData.message || '';
    }
  };

  const downloadImage = () => {
    if (!previewUrl) return;
    
    const link = document.createElement('a');
    link.download = `${teamData.teamName}-${templateId}-${Date.now()}.png`;
    link.href = previewUrl;
    link.click();
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!teamData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Laddar...</div>
      </div>
    );
  }

  const template = TEMPLATES[templateId as keyof typeof TEMPLATES];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Link href={`/teams/${teamId}/dashboard`}>
                <img 
                  src="/images/logos/habo-if-2025.png" 
                  alt="Habo IF"
                  className="h-8 object-contain"
                />
              </Link>
              <div>
                <h1 
                  className="text-xl font-black uppercase tracking-wider"
                  style={{ 
                    color: brand.colors.royalBlue,
                    fontFamily: brand.typography.primary.fontFamily
                  }}
                >
                  Skapa {template?.name || 'Grafik'}
                </h1>
                <p className="text-xs text-gray-600">{teamData.teamName}</p>
              </div>
            </div>
            
            <Button
              as={Link}
              href={`/teams/${teamId}/dashboard`}
              variant="bordered"
              size="sm"
            >
              ← Tillbaka
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-0 pt-6 px-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Innehåll
                </h2>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-4">
                  {/* Template-specific fields */}
                  {template?.fields.includes('opponent') && (
                    <Input
                      label="Motståndare"
                      labelPlacement="outside"
                      placeholder="t.ex. Mullsjö IF"
                      value={formData.opponent || ''}
                      onChange={(e) => handleFieldChange('opponent', e.target.value)}
                      variant="bordered"
                      classNames={{
                        label: "text-foreground",
                        input: "bg-transparent",
                        inputWrapper: "bg-default-100"
                      }}
                    />
                  )}
                  
                  {template?.fields.includes('date') && (
                    <Textarea
                      label="Datum"
                      placeholder="YYYY-MM-DD"
                      value={formData.date || ''}
                      onChange={(e) => handleFieldChange('date', e.target.value)}
                      variant="bordered"
                      minRows={1}
                      maxRows={1}
                    />
                  )}
                  
                  {template?.fields.includes('time') && (
                    <Textarea
                      label="Tid"
                      placeholder="15:00"
                      value={formData.time || ''}
                      onChange={(e) => handleFieldChange('time', e.target.value)}
                      variant="bordered"
                      minRows={1}
                      maxRows={1}
                    />
                  )}
                  
                  {template?.fields.includes('location') && (
                    <Textarea
                      label="Plats"
                      placeholder="Hajmyren"
                      value={formData.location || ''}
                      onChange={(e) => handleFieldChange('location', e.target.value)}
                      variant="bordered"
                      minRows={1}
                      maxRows={1}
                    />
                  )}
                  
                  {template?.fields.includes('homeScore') && (
                    <div className="grid grid-cols-2 gap-4">
                      <Textarea
                        label={teamData.teamName}
                        placeholder="0"
                        value={formData.homeScore || ''}
                        onChange={(e) => handleFieldChange('homeScore', e.target.value)}
                        variant="bordered"
                        minRows={1}
                        maxRows={1}
                      />
                      <Textarea
                        label="Motståndare"
                        placeholder="0"
                        value={formData.awayScore || ''}
                        onChange={(e) => handleFieldChange('awayScore', e.target.value)}
                        variant="bordered"
                        minRows={1}
                        maxRows={1}
                      />
                    </div>
                  )}
                  
                  {template?.fields.includes('scorers') && (
                    <Textarea
                      label="Målskyttar"
                      placeholder="Andersson 23', Eriksson 67'"
                      value={formData.scorers || ''}
                      onChange={(e) => handleFieldChange('scorers', e.target.value)}
                      variant="bordered"
                      minRows={1}
                      maxRows={1}
                    />
                  )}
                  
                  {template?.fields.includes('playerName') && (
                    <Textarea
                      label="Spelarnamn"
                      placeholder="Emma Andersson"
                      value={formData.playerName || ''}
                      onChange={(e) => handleFieldChange('playerName', e.target.value)}
                      variant="bordered"
                      minRows={1}
                      maxRows={1}
                    />
                  )}
                  
                  {template?.fields.includes('position') && (
                    <Select
                      label="Position"
                      placeholder="Välj position"
                      selectedKeys={formData.position ? [formData.position] : []}
                      onSelectionChange={(keys) => handleFieldChange('position', [...keys][0] as string)}
                      variant="bordered"
                    >
                      <SelectItem key="Målvakt">Målvakt</SelectItem>
                      <SelectItem key="Försvarare">Försvarare</SelectItem>
                      <SelectItem key="Mittfältare">Mittfältare</SelectItem>
                      <SelectItem key="Anfallare">Anfallare</SelectItem>
                    </Select>
                  )}
                  
                  {template?.fields.includes('number') && (
                    <Input
                      label="Nummer"
                      placeholder="10"
                      value={formData.number || ''}
                      onChange={(e) => handleFieldChange('number', e.target.value)}
                      variant="bordered"
                      type="number"
                    />
                  )}
                  
                  {template?.fields.includes('message') && (
                    <Textarea
                      label="Meddelande"
                      placeholder="Skriv ditt meddelande här..."
                      value={formData.message || ''}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      variant="bordered"
                      minRows={3}
                    />
                  )}
                  
                  {template?.fields.includes('headline') && (
                    <Input
                      label="Rubrik"
                      placeholder="Stor nyhet!"
                      value={formData.headline || ''}
                      onChange={(e) => handleFieldChange('headline', e.target.value)}
                      variant="bordered"
                    />
                  )}
                  
                  {template?.fields.includes('subheadline') && (
                    <Input
                      label="Underrubrik"
                      placeholder="Mer information..."
                      value={formData.subheadline || ''}
                      onChange={(e) => handleFieldChange('subheadline', e.target.value)}
                      variant="bordered"
                    />
                  )}
                </div>

                <Divider className="my-6" />

                {/* Style Options */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700">Stilval</h3>
                  
                  <Select
                    label="Layout"
                    placeholder="Välj layout"
                    selectedKeys={[selectedLayout.toString()]}
                    onSelectionChange={(keys) => setSelectedLayout(Number([...keys][0]))}
                    variant="bordered"
                  >
                    {LAYOUTS.map(layout => (
                      <SelectItem key={layout.id.toString()} value={layout.id.toString()}>
                        {layout.name}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <Select
                    label="Färgtema"
                    placeholder="Välj färgtema"
                    selectedKeys={[selectedTheme.toString()]}
                    onSelectionChange={(keys) => setSelectedTheme(Number([...keys][0]))}
                    variant="bordered"
                  >
                    {COLOR_THEMES.map((theme, index) => (
                      <SelectItem key={index.toString()} value={index.toString()}>
                        {theme.name}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Vattenmärke</span>
                    <Switch
                      isSelected={includeWatermark}
                      onValueChange={setIncludeWatermark}
                      size="sm"
                    />
                  </div>
                </div>

                <Divider className="my-6" />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full font-bold text-white"
                    style={{ backgroundColor: brand.colors.royalBlue }}
                    onClick={generateGraphic}
                    isLoading={isGenerating}
                  >
                    Generera Grafik
                  </Button>
                  
                  {previewUrl && (
                    <Button
                      className="w-full"
                      variant="bordered"
                      onClick={downloadImage}
                    >
                      Ladda ner PNG
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-0 pt-6 px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Förhandsvisning
                  </h2>
                  <Chip size="sm" variant="flat">
                    1080×1080px
                  </Chip>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4 text-gray-300">📸</div>
                        <p className="text-gray-500">
                          Fyll i formuläret och klicka "Generera Grafik"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Canvas (hidden) */}
                <canvas
                  ref={canvasRef}
                  width={1080}
                  height={1080}
                  className="hidden"
                />
                
                {/* Quick Tips */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Tips:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Håll texterna korta för bäst läsbarhet</li>
                    <li>• Använd lagfärger för igenkänning</li>
                    <li>• Lägg till vattenmärke för professionell look</li>
                    <li>• Exportera som PNG för sociala medier</li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}