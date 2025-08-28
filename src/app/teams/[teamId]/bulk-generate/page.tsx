'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Button,
  Checkbox,
  Progress,
  Title,
  Text,
  Group,
  Stack,
  SimpleGrid,
  Box,
  Anchor,
  Flex,
  Badge,
  Alert
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { 
  ArrowLeft,
  Play,
  Download,
  CheckCircle,
  AlertCircle,
  Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import JSZip from 'jszip';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';
import { getBulkCapablePostTypes, MOCK_MATCH_SCHEDULE, MOCK_PLAYERS } from '@/lib/post-types';
import { GraphicsService } from '@/apps/habo-if/services/GraphicsService';

// Dynamic batch templates from post types
const BATCH_TEMPLATES = [
  ...getBulkCapablePostTypes().map(pt => ({
    id: pt.id,
    name: pt.name,
    count: pt.id === 'matchday' ? MOCK_MATCH_SCHEDULE.length : 
           pt.id === 'goal-scorer' || pt.id === 'player-of-match' ? MOCK_PLAYERS.length : 6,
    description: pt.description
  })),
  { id: 'complete-set', name: 'Komplett Set', count: 20, description: 'Alla typer av grafik för säsongen' }
];

export default function BulkGeneratePage() {
  const brand = HABO_IF_BRAND;
  const router = useRouter();
  const params = useParams();
  const teamId = params?.teamId as string;
  
  const [teamData, setTeamData] = useState<any>(null);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedFiles, setGeneratedFiles] = useState<{ id: string; name: string; type: string; generated: string; size: string; blob?: Blob }[]>([]);
  const [currentStep, setCurrentStep] = useState('');

  useEffect(() => {
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
  }, [teamId, router]);

  const handleTemplateToggle = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const generateBatch = async () => {
    if (selectedTemplates.length === 0) {
      notifications.show({
        title: 'Välj mallar',
        message: 'Du måste välja minst en mall för batch-generering',
        color: 'red',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setGeneratedFiles([]);

    try {
      const generatedBlobs: { id: string; name: string; type: string; generated: string; size: string; blob: Blob }[] = [];
      
      // Calculate total steps
      const totalSteps = selectedTemplates.reduce((sum, templateId) => {
        const template = BATCH_TEMPLATES.find(t => t.id === templateId);
        return sum + (template?.count || 0);
      }, 0);

      let completedSteps = 0;

      for (const templateId of selectedTemplates) {
        const template = BATCH_TEMPLATES.find(t => t.id === templateId);
        if (!template) continue;

        setCurrentStep(`Genererar ${template.name}...`);

        // Get items to generate
        let itemsToGenerate: any[] = [];
        if (templateId === 'matchday') {
          itemsToGenerate = MOCK_MATCH_SCHEDULE;
        } else if (templateId === 'goal-scorer' || templateId === 'player-of-match') {
          itemsToGenerate = MOCK_PLAYERS;
        } else {
          itemsToGenerate = Array.from({ length: template.count }, (_, i) => ({ id: i, index: i }));
        }

        // Use GraphicsService to generate batch
        const results = await GraphicsService.generateBatchGraphics(
          {
            templateType: templateId,
            teamName: teamData.teamName,
            includeWatermark: true
          },
          itemsToGenerate
        );

        // Convert results to expected format
        for (const result of results) {
          const file = {
            id: `${templateId}-${completedSteps}`,
            name: result.filename,
            type: templateId,
            generated: new Date().toLocaleTimeString(),
            size: '1080x1080',
            blob: result.graphic.blob
          };
          
          generatedBlobs.push(file);
          setGeneratedFiles(prev => [...prev, file]);
          
          completedSteps++;
          const newProgress = (completedSteps / totalSteps) * 100;
          setProgress(newProgress);
          
          // Small delay to show progress
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }

      setCurrentStep('Klar!');
      notifications.show({
        title: 'Batch-generering slutförd!',
        message: `${completedSteps} grafiker har genererats`,
        color: 'green',
      });

    } catch (error) {
      console.error('Batch generation error:', error);
      notifications.show({
        title: 'Ett fel uppstod',
        message: 'Kunde inte slutföra batch-genereringen',
        color: 'red',
      });
    } finally {
      setIsGenerating(false);
      setCurrentStep('');
    }
  };


  const downloadAll = async () => {
    if (generatedFiles.length === 0) {
      notifications.show({
        title: 'Inga filer att ladda ner',
        message: 'Du måste generera grafik först',
        color: 'yellow',
      });
      return;
    }

    try {
      // Create a new ZIP file
      const zip = new JSZip();
      
      // Add each generated file to the ZIP
      for (const file of generatedFiles) {
        if (file.blob) {
          zip.file(file.name, file.blob);
        }
      }
      
      // Generate the ZIP file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create download link and trigger download
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${teamData.teamName}_grafik_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
      
      notifications.show({
        title: 'Nedladdning klar!',
        message: `${generatedFiles.length} filer laddades ner som ZIP`,
        color: 'green',
      });
    } catch (error) {
      console.error('Download error:', error);
      notifications.show({
        title: 'Nedladdning misslyckades',
        message: 'Ett fel uppstod vid skapandet av ZIP-filen',
        color: 'red',
      });
    }
  };

  if (!teamData) {
    return (
      <Container size="lg" py="xl">
        <Text ta="center" c="dimmed">Laddar...</Text>
      </Container>
    );
  }

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
                Batch-Generering
              </Title>
              <Text size="sm" c="dimmed">{teamData.teamName} - Massproduktion av grafik</Text>
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
          {/* Selection Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper p="lg">
              <Title order={3} mb="md">Välj Mallar</Title>
              <Text size="sm" c="dimmed" mb="lg">
                Välj de mallkategorier du vill generera i batch. Alla layouter och färgteman inkluderas.
              </Text>

              <Stack>
                {BATCH_TEMPLATES.map((template) => (
                  <Paper 
                    key={template.id} 
                    p="md" 
                    style={{ 
                      border: selectedTemplates.includes(template.id) 
                        ? '2px solid var(--mantine-color-blue-5)' 
                        : '1px solid var(--mantine-color-gray-3)',
                      cursor: 'pointer' 
                    }}
                    onClick={() => handleTemplateToggle(template.id)}
                  >
                    <Group justify="space-between">
                      <Group>
                        <Checkbox
                          checked={selectedTemplates.includes(template.id)}
                          onChange={() => handleTemplateToggle(template.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Box>
                          <Text fw={500}>{template.name}</Text>
                          <Text size="sm" c="dimmed">{template.description}</Text>
                        </Box>
                      </Group>
                      <Badge variant="light">{template.count} filer</Badge>
                    </Group>
                  </Paper>
                ))}
              </Stack>

              {selectedTemplates.length > 0 && (
                <Alert icon={<CheckCircle size={16} />} color="blue" mt="md">
                  <Text size="sm">
                    {selectedTemplates.reduce((sum, id) => {
                      const template = BATCH_TEMPLATES.find(t => t.id === id);
                      return sum + (template?.count || 0);
                    }, 0)} filer kommer att genereras
                  </Text>
                </Alert>
              )}

              <Button
                fullWidth
                mt="lg"
                onClick={generateBatch}
                loading={isGenerating}
                disabled={selectedTemplates.length === 0}
                leftSection={<Play size={16} />}
                color="blue.5"
              >
                Starta Batch-Generering
              </Button>
            </Paper>
          </motion.div>

          {/* Progress Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper p="lg">
              <Group justify="space-between" mb="md">
                <Title order={3}>Progress</Title>
                {generatedFiles.length > 0 && (
                  <Badge>{generatedFiles.length} genererade</Badge>
                )}
              </Group>

              {isGenerating && (
                <Stack mb="lg">
                  <Progress value={progress} size="lg" />
                  <Text size="sm" ta="center" c="dimmed">
                    {Math.round(progress)}% - {currentStep}
                  </Text>
                </Stack>
              )}

              {generatedFiles.length > 0 && (
                <>
                  <Group justify="space-between" mb="md">
                    <Text fw={500}>Genererade Filer</Text>
                    <Button 
                      size="sm" 
                      variant="outline"
                      leftSection={<Download size={16} />}
                      onClick={downloadAll}
                    >
                      Ladda ner alla
                    </Button>
                  </Group>

                  <Box style={{ maxHeight: 300, overflowY: 'auto' }}>
                    <Stack gap="xs">
                      {generatedFiles.map((file) => (
                        <Paper key={file.id} p="sm" bg="gray.0">
                          <Group justify="space-between">
                            <Group>
                              <CheckCircle size={16} color="var(--mantine-color-green-6)" />
                              <Box>
                                <Text size="sm" fw={500}>{file.name}</Text>
                                <Text size="xs" c="dimmed">{file.size} - {file.generated}</Text>
                              </Box>
                            </Group>
                            <Badge variant="outline" size="xs">{file.type}</Badge>
                          </Group>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                </>
              )}

              {!isGenerating && generatedFiles.length === 0 && (
                <Paper p="xl" ta="center" bg="gray.0">
                  <Package size={48} color="var(--mantine-color-gray-4)" style={{ margin: '0 auto 1rem' }} />
                  <Text c="dimmed">Inga filer genererade än</Text>
                  <Text size="sm" c="dimmed">Välj mallar och starta batch-genereringen</Text>
                </Paper>
              )}

              {/* Tips */}
              <Alert icon={<AlertCircle size={16} />} color="yellow" mt="lg">
                <Text size="sm" fw={500} mb="xs">Tips för Batch-Generering:</Text>
                <Text size="xs" c="dimmed">
                  • Alla layouter (6 st) genereras för varje mall<br/>
                  • Alla färgteman inkluderas automatiskt<br/>
                  • Filer namnges med mall och variantnummer<br/>
                  • Resultatet levereras som ZIP-fil
                </Text>
              </Alert>
            </Paper>
          </motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
}