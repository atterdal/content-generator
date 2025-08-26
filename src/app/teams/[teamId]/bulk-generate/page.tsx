'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Checkbox,
  Progress,
  Divider,
  Link,
  Chip
} from '@heroui/react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';
import { createGenericCanvas } from '@/lib/graphics-engine/Canvas';
import { COLOR_THEMES } from '@/types';
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
  createHaboMainHeader
} from '@/apps/habo-if/components/HaboComponents';

interface GenerationTask {
  id: string;
  type: 'player' | 'match';
  name: string;
  status: 'pending' | 'generating' | 'completed' | 'error';
  imageUrl?: string;
  data: any;
}

export default function BulkGeneratePage() {
  const brand = HABO_IF_BRAND;
  const router = useRouter();
  const params = useParams();
  
  const teamId = params?.teamId as string;
  const [teamData, setTeamData] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [tasks, setTasks] = useState<GenerationTask[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

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
    loadData();
  }, [teamId, router]);

  const loadData = () => {
    const savedPlayers = localStorage.getItem(`team-${teamId}-players`);
    const savedMatches = localStorage.getItem(`team-${teamId}-matches`);
    
    if (savedPlayers) {
      const playersData = JSON.parse(savedPlayers);
      setPlayers(playersData);
      
      // Create player tasks
      const playerTasks: GenerationTask[] = playersData.map((player: any) => ({
        id: `player-${player.id}`,
        type: 'player',
        name: `Spelarfokus - ${player.name}`,
        status: 'pending',
        data: player
      }));
      
      setTasks(prev => [...prev, ...playerTasks]);
    }
    
    if (savedMatches) {
      const matchesData = JSON.parse(savedMatches);
      setMatches(matchesData);
      
      // Create match tasks
      const matchTasks: GenerationTask[] = matchesData.map((match: any) => ({
        id: `match-${match.id}`,
        type: 'match',
        name: `Matchdag - ${match.opponent}`,
        status: 'pending',
        data: match
      }));
      
      setTasks(prev => [...prev, ...matchTasks]);
    }
  };

  const toggleTaskSelection = (taskId: string) => {
    const newSelection = new Set(selectedTasks);
    if (newSelection.has(taskId)) {
      newSelection.delete(taskId);
    } else {
      newSelection.add(taskId);
    }
    setSelectedTasks(newSelection);
  };

  const selectAllTasks = () => {
    if (selectedTasks.size === tasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(tasks.map(t => t.id)));
    }
  };

  const generateImage = async (task: GenerationTask): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      
      setTimeout(async () => {
        try {
          // Use random layout and theme for variety
          const layout = ALL_LAYOUTS[Math.floor(Math.random() * ALL_LAYOUTS.length)];
          const theme = COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)];
          
          // Create generic canvas using the new system
          const canvasRenderer = createGenericCanvas(canvas, layout, theme);
          
          // Add background floater
          const backgroundFloater = new Floater(0);
          backgroundFloater.addBackground(async (ctx: any, bounds: any) => {
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
          canvasRenderer.addFloater(backgroundFloater);

          // Add layout-specific blocks
          if (layout.includes('beige')) {
            const beigeBlock = createHaboBeigeBlock('beige', 1, theme);
            canvasRenderer.addBlock(beigeBlock);
          }
          if (layout.includes('blue')) {
            const blueBlock = createHaboGradientBlock('blue', 1, theme);
            canvasRenderer.addBlock(blueBlock);
          }
          if (layout.includes('graphic')) {
            const graphicBlock = createHaboGradientBlock('graphic', 1, theme, { intensity: 'strong' });
            canvasRenderer.addBlock(graphicBlock);
          }
          if (layout.includes('logo')) {
            const logoBackgroundBlock = createHaboBeigeBlock('logo', 1, theme);
            canvasRenderer.addBlock(logoBackgroundBlock);
          }

          // Add pattern floater
          const textPattern = createHaboTextPattern(2, teamData.teamName.toUpperCase(), theme);
          canvasRenderer.addFloater(textPattern);

          // Add hero block
          if (layout.includes('hero')) {
            const heroBlock = createRandomPlayerBlock('hero', 3, theme);
            canvasRenderer.addBlock(heroBlock);
          }

          // Add logo block
          if (layout.includes('logo')) {
            const logoBlock = createHaboLogoBlock('logo', theme, { withBackground: false });
            canvasRenderer.addBlock(logoBlock);
          }

          // Add content-specific overlay
          let overlayComponent: Floater;
          if (task.type === 'player') {
            overlayComponent = createPlayerSpotlightOverlay(
              5, 
              task.data.name,
              `#${task.data.number} - ${task.data.position}`,
              theme, 
              1080
            );
          } else {
            overlayComponent = createMatchOverlay(
              5,
              task.data.opponent,
              `${new Date(task.data.date).toLocaleDateString('sv-SE')} - ${task.data.time}`,
              theme,
              1080
            );
          }
          canvasRenderer.addFloater(overlayComponent);

          // Render and get image data
          await canvasRenderer.renderAll();
          const imageData = canvasRenderer.toDataURL('image/png');
          resolve(imageData);
          
        } catch (error) {
          console.error('Error generating image:', error);
          resolve('data:image/png;base64,'); // Empty fallback
        }
      }, 1000 + Math.random() * 2000); // Simulate realistic generation time
    });
  };

  const generateSelected = async () => {
    if (selectedTasks.size === 0) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    const tasksToGenerate = tasks.filter(t => selectedTasks.has(t.id));
    const totalTasks = tasksToGenerate.length;
    
    for (let i = 0; i < totalTasks; i++) {
      const task = tasksToGenerate[i];
      
      // Update task status to generating
      setTasks(prev => prev.map(t => 
        t.id === task.id ? { ...t, status: 'generating' as const } : t
      ));
      
      try {
        const imageUrl = await generateImage(task);
        
        // Update task status to completed
        setTasks(prev => prev.map(t => 
          t.id === task.id ? { ...t, status: 'completed' as const, imageUrl } : t
        ));
        
      } catch (error) {
        // Update task status to error
        setTasks(prev => prev.map(t => 
          t.id === task.id ? { ...t, status: 'error' as const } : t
        ));
      }
      
      // Update progress
      setProgress(((i + 1) / totalTasks) * 100);
    }
    
    setIsGenerating(false);
  };

  const downloadAll = () => {
    const completedTasks = tasks.filter(t => t.status === 'completed' && t.imageUrl);
    
    completedTasks.forEach((task, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.download = `${teamData.teamName}-${task.name.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.png`;
        link.href = task.imageUrl!;
        link.click();
      }, index * 200); // Stagger downloads
    });
  };

  if (!teamData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Laddar...</div>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Link href={`/teams/${teamId}/manage`}>
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
                  Generera Material
                </h1>
                <p className="text-xs text-gray-600">{teamData.teamName}</p>
              </div>
            </div>
            
            <Button
              as={Link}
              href={`/teams/${teamId}/manage`}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Controls */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <h2 className="text-lg font-semibold">
                  Välj material att generera ({selectedTasks.size} av {tasks.length} valda)
                </h2>
                <div className="flex gap-3">
                  {completedCount > 0 && (
                    <Button
                      color="secondary"
                      variant="flat"
                      onClick={downloadAll}
                    >
                      Ladda ner alla ({completedCount})
                    </Button>
                  )}
                  <Button
                    onClick={selectAllTasks}
                    variant="bordered"
                    size="sm"
                  >
                    {selectedTasks.size === tasks.length ? 'Avmarkera alla' : 'Markera alla'}
                  </Button>
                  <Button
                    className="font-bold text-white"
                    style={{ backgroundColor: brand.colors.royalBlue }}
                    onClick={generateSelected}
                    isDisabled={selectedTasks.size === 0 || isGenerating}
                    isLoading={isGenerating}
                  >
                    Generera valda
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {isGenerating && (
                <div className="mb-4">
                  <Progress 
                    value={progress} 
                    className="mb-2"
                    color="primary"
                  />
                  <p className="text-sm text-gray-600">
                    Genererar bilder... {Math.round(progress)}% klart
                  </p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Tasks List */}
          <Card>
            <CardBody>
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">Inga spelare eller matcher att generera för</p>
                    <Button
                      as={Link}
                      href={`/teams/${teamId}/manage`}
                      variant="bordered"
                    >
                      Lägg till spelare eller matcher
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {/* Player Cards */}
                    {players.length > 0 && (
                      <>
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                          👤 Spelarfokus ({players.length})
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tasks.filter(t => t.type === 'player').map((task) => (
                            <motion.div
                              key={task.id}
                              whileHover={{ scale: 1.02 }}
                              className="border rounded-lg p-4 bg-white hover:shadow-md transition-all"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <Checkbox
                                  isSelected={selectedTasks.has(task.id)}
                                  onValueChange={() => toggleTaskSelection(task.id)}
                                  isDisabled={isGenerating}
                                >
                                  <span className="font-medium">{task.data.name}</span>
                                </Checkbox>
                                <Chip
                                  size="sm"
                                  color={
                                    task.status === 'completed' ? 'success' :
                                    task.status === 'generating' ? 'warning' :
                                    task.status === 'error' ? 'danger' : 'default'
                                  }
                                >
                                  {task.status === 'pending' ? 'Väntar' :
                                   task.status === 'generating' ? 'Genererar' :
                                   task.status === 'completed' ? 'Klar' : 'Fel'}
                                </Chip>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>#{task.data.number} - {task.data.position}</p>
                                {task.data.age && <p>{task.data.age} år</p>}
                              </div>
                              {task.imageUrl && (
                                <div className="mt-3">
                                  <img 
                                    src={task.imageUrl} 
                                    alt={task.name}
                                    className="w-full h-32 object-cover rounded border"
                                  />
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                        <Divider />
                      </>
                    )}

                    {/* Match Cards */}
                    {matches.length > 0 && (
                      <>
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                          ⚽ Matchdagar ({matches.length})
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tasks.filter(t => t.type === 'match').map((task) => (
                            <motion.div
                              key={task.id}
                              whileHover={{ scale: 1.02 }}
                              className="border rounded-lg p-4 bg-white hover:shadow-md transition-all"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <Checkbox
                                  isSelected={selectedTasks.has(task.id)}
                                  onValueChange={() => toggleTaskSelection(task.id)}
                                  isDisabled={isGenerating}
                                >
                                  <span className="font-medium">{task.data.opponent}</span>
                                </Checkbox>
                                <Chip
                                  size="sm"
                                  color={
                                    task.status === 'completed' ? 'success' :
                                    task.status === 'generating' ? 'warning' :
                                    task.status === 'error' ? 'danger' : 'default'
                                  }
                                >
                                  {task.status === 'pending' ? 'Väntar' :
                                   task.status === 'generating' ? 'Genererar' :
                                   task.status === 'completed' ? 'Klar' : 'Fel'}
                                </Chip>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>{new Date(task.data.date).toLocaleDateString('sv-SE')} - {task.data.time}</p>
                                <p>{task.data.location} {task.data.isHome ? '🏠' : '✈️'}</p>
                              </div>
                              {task.imageUrl && (
                                <div className="mt-3">
                                  <img 
                                    src={task.imageUrl} 
                                    alt={task.name}
                                    className="w-full h-32 object-cover rounded border"
                                  />
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}