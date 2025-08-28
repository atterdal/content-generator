'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  Container,
  Paper,
  Button,
  TextInput,
  Textarea,
  Select,
  Badge,
  Switch,
  Divider,
  Title,
  Text,
  Group,
  Stack,
  Box,
  SimpleGrid,
  Anchor,
  Flex
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ArrowLeft, Wand2, Download, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';
import { COLOR_THEMES } from '@/types';
import { GraphicsService } from '@/apps/habo-if/services/GraphicsService';

// Template configurations
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

// Layout options
const LAYOUTS = [
  { value: '0', label: 'Hero Vänster' },
  { value: '1', label: 'Hero Central' },
  { value: '2', label: 'Hero Höger' },
  { value: '3', label: 'Hero Central Vertikal' },
  { value: '4', label: 'Hero Övre Vänster' },
  { value: '5', label: 'Hero Höger Asymmetrisk' }
];

export default function TeamCreateMantinePage() {
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
  const [selectedLayout, setSelectedLayout] = useState('0');
  const [selectedTheme, setSelectedTheme] = useState('0');
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
    if (!teamData) return;
    
    setIsGenerating(true);
    
    try {
      const graphic = await GraphicsService.generateGraphic({
        templateType: templateId,
        teamName: teamData.teamName,
        layoutIndex: parseInt(selectedLayout),
        themeIndex: parseInt(selectedTheme),
        includeWatermark,
        mainText: getOverlayMainText(),
        subText: getOverlaySubText(),
        data: formData
      });

      setPreviewUrl(graphic.dataURL);

      notifications.show({
        title: 'Grafik genererad!',
        message: 'Din grafik är nu klar för nedladdning',
        color: 'green',
      });
      
    } catch (error) {
      console.error('Error generating graphic:', error);
      notifications.show({
        title: 'Ett fel uppstod',
        message: 'Kunde inte generera grafiken',
        color: 'red',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Helper functions to get text based on template
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

    notifications.show({
      title: 'Nedladdning startad!',
      message: 'Bilden sparas i din nedladdningsmapp',
      color: 'blue',
    });
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!teamData) {
    return (
      <Container size="lg" py="xl">
        <Text ta="center" c="dimmed">Laddar...</Text>
      </Container>
    );
  }

  const template = TEMPLATES[templateId as keyof typeof TEMPLATES];

  return (
    <Box bg="gray.0" mih="100vh">
      {/* Page Header */}
      <Container size="lg" py="md">
        <Paper p="lg" mb="xl">
          <Flex justify="space-between" align="center">
            <Box>
              <Title 
                order={2} 
                tt="uppercase" 
                c="blue.5"
                style={{ 
                  fontFamily: brand.typography.primary.fontFamily,
                  letterSpacing: '0.05em'
                }}
              >
                Skapa {template?.name || 'Grafik'}
              </Title>
              <Text size="sm" c="dimmed">{teamData.teamName}</Text>
            </Box>
            
            <Button
              component="a"
              href={`/teams/${teamId}/dashboard`}
              variant="outline"
              leftSection={<ArrowLeft size={16} />}
              size="sm"
            >
              Tillbaka
            </Button>
          </Flex>
        </Paper>
      </Container>

      {/* Main Content */}
      <Container size="lg" pb="xl">
        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper p="lg">
              <Title order={3} mb="md">Innehåll</Title>
              
              <Stack>
                {/* Template-specific fields */}
                {template?.fields.includes('opponent') && (
                  <TextInput
                    label="Motståndare"
                    placeholder="t.ex. Mullsjö IF"
                    value={formData.opponent || ''}
                    onChange={(e) => handleFieldChange('opponent', e.target.value)}
                  />
                )}
                
                {template?.fields.includes('date') && (
                  <TextInput
                    label="Datum"
                    placeholder="YYYY-MM-DD"
                    value={formData.date || ''}
                    onChange={(e) => handleFieldChange('date', e.target.value)}
                  />
                )}
                
                {template?.fields.includes('time') && (
                  <TextInput
                    label="Tid"
                    placeholder="15:00"
                    value={formData.time || ''}
                    onChange={(e) => handleFieldChange('time', e.target.value)}
                  />
                )}
                
                {template?.fields.includes('location') && (
                  <TextInput
                    label="Plats"
                    placeholder="Hajmyren"
                    value={formData.location || ''}
                    onChange={(e) => handleFieldChange('location', e.target.value)}
                  />
                )}
                
                {template?.fields.includes('playerName') && (
                  <TextInput
                    label="Spelarnamn"
                    placeholder="Emma Andersson"
                    value={formData.playerName || ''}
                    onChange={(e) => handleFieldChange('playerName', e.target.value)}
                  />
                )}
                
                {template?.fields.includes('message') && (
                  <Textarea
                    label="Meddelande"
                    placeholder="Skriv ditt meddelande här..."
                    value={formData.message || ''}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    minRows={3}
                  />
                )}

                <Divider my="md" />

                {/* Style Options */}
                <Title order={4} mb="sm">Stilval</Title>
                
                <Select
                  label="Layout"
                  data={LAYOUTS}
                  value={selectedLayout}
                  onChange={setSelectedLayout}
                />
                
                <Select
                  label="Färgtema"
                  data={COLOR_THEMES.map((theme, index) => ({
                    value: index.toString(),
                    label: theme.name.charAt(0).toUpperCase() + theme.name.slice(1)
                  }))}
                  value={selectedTheme}
                  onChange={setSelectedTheme}
                />
                
                <Group justify="space-between">
                  <Text size="sm">Vattenmärke</Text>
                  <Switch
                    checked={includeWatermark}
                    onChange={(event) => setIncludeWatermark(event.currentTarget.checked)}
                  />
                </Group>

                <Divider my="md" />

                {/* Action Buttons */}
                <Stack>
                  <Button
                    fullWidth
                    onClick={generateGraphic}
                    loading={isGenerating}
                    leftSection={<Wand2 size={16} />}
                    color="blue.5"
                  >
                    Generera Grafik
                  </Button>
                  
                  {previewUrl && (
                    <Button
                      fullWidth
                      onClick={downloadImage}
                      variant="outline"
                      leftSection={<Download size={16} />}
                    >
                      Ladda ner PNG
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Paper>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper p="lg">
              <Group justify="space-between" mb="md">
                <Title order={3}>Förhandsvisning</Title>
                <Badge>1080×1080px</Badge>
              </Group>
              
              <Box 
                style={{ 
                  aspectRatio: '1/1', 
                  backgroundColor: 'var(--mantine-color-gray-1)',
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Stack align="center" ta="center">
                    <ImageIcon size={64} color="var(--mantine-color-gray-4)" />
                    <Text c="dimmed">
                      Fyll i formuläret och klicka "Generera Grafik"
                    </Text>
                  </Stack>
                )}
              </Box>
              
              {/* Canvas (hidden) */}
              <canvas
                ref={canvasRef}
                width={1080}
                height={1080}
                style={{ display: 'none' }}
              />
              
              {/* Quick Tips */}
              <Paper p="md" mt="md" bg="blue.0">
                <Title order={5} c="blue.7" mb="sm">Tips:</Title>
                <Text size="sm" c="blue.7">
                  • Håll texterna korta för bäst läsbarhet<br/>
                  • Använd lagfärger för igenkänning<br/>
                  • Lägg till vattenmärke för professionell look<br/>
                  • Exportera som PNG för sociala medier
                </Text>
              </Paper>
            </Paper>
          </motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
}