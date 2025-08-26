'use client';

import { useState, useEffect, useRef } from 'react';
import { Player, Team, GeneratedGraphic, ColorTheme } from '@/types';
import { PlayerList } from './PlayerList';
import { downloadAllImagesAsZip } from '@/lib/utils/downloadUtils';
import { PostService } from '../data/postService';
import { COLOR_THEMES } from '@/types';
import { waitForFonts } from '@/lib/utils/fontLoader';
import { MOCK_TEAM, MOCK_PLAYERS } from '../config/mockData';

// Mock data moved to config/mockData.ts

interface DashboardProps {
  initialTeam?: Team;
}

export function Dashboard({ initialTeam = MOCK_TEAM }: DashboardProps) {
  const [team, setTeam] = useState<Team>(initialTeam);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [generatedGraphics, setGeneratedGraphics] = useState<GeneratedGraphic[]>([]);
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Säkerställ att typsnitt är laddade när komponenten mountar
  useEffect(() => {
    waitForFonts().catch(console.error);
  }, []);

  const handleGenerateGraphic = async (player: Player) => {
    if (!canvasRef.current) {
      console.error('Canvas not available');
      return;
    }

    setIsGenerating(prev => ({ ...prev, [player.id]: true }));
    
    try {
      // Snabb kontroll att typsnitt är laddade (CSS gör jobbet)
      await waitForFonts();
      
      // Generera grafik med nya Post-systemet
      const result = await PostService.generatePlayerSpotlightPost(canvasRef.current, player.id);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate graphic');
      }
      
      const imageData = result.image_data!;
      
      const newGraphic: GeneratedGraphic = {
        id: `graphic-${Date.now()}-${player.id}`,
        playerId: player.id,
        imageData: imageData,
        layout: [], // Layout is now internal to generator
        theme: COLOR_THEMES[0], // Theme is now internal to generator  
        generatedAt: new Date()
      };
      
      setGeneratedGraphics(prev => [...prev, newGraphic]);
      
      console.log('Generated graphic for player:', player.name);
      
    } catch (error) {
      console.error('Failed to generate graphic:', error);
      alert(`Kunde inte generera grafik för ${player.name}. Försök igen.`);
    } finally {
      setIsGenerating(prev => ({ ...prev, [player.id]: false }));
    }
  };

  const handleGenerateAllGraphics = async () => {
    setIsGeneratingAll(true);
    
    try {
      // Generera grafik för alla spelare sekventiellt
      for (const player of MOCK_PLAYERS) {
        await handleGenerateGraphic(player);
      }
      
      console.log('Generated graphics for all players');
      
    } catch (error) {
      console.error('Failed to generate all graphics:', error);
    } finally {
      setIsGeneratingAll(false);
    }
  };

  const handleDownloadAll = async () => {
    if (generatedGraphics.length === 0) {
      alert('Inga grafiker att ladda ner. Generera grafiker först.');
      return;
    }

    try {
      await downloadAllImagesAsZip(generatedGraphics, MOCK_PLAYERS, team.name.replace(/\s+/g, '_'));
    } catch (error) {
      console.error('Failed to download ZIP:', error);
      alert('Kunde inte skapa ZIP-fil. Försök igen.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Lagledare Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                {team.name} • Säsong {team.season} • Tränare: {team.coach}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right mr-6">
                <p className="text-sm text-gray-500">Antal spelare</p>
                <p className="text-2xl font-bold text-blue-600">{MOCK_PLAYERS.length}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {/* Download All ZIP Button */}
                <button
                  onClick={handleDownloadAll}
                  disabled={generatedGraphics.length === 0}
                  className={`
                    inline-flex items-center px-4 py-3 border border-transparent text-base font-medium rounded-md
                    ${generatedGraphics.length === 0
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                    }
                    transition-colors
                  `}
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M4 7h16l-1-3H5L4 7zm0 0v12a2 2 0 002 2h12a2 2 0 002-2V7H4z" />
                  </svg>
                  Ladda ner ZIP ({generatedGraphics.length})
                </button>

                {/* Generate All Button */}
                <button
                  onClick={handleGenerateAllGraphics}
                  disabled={isGeneratingAll || Object.values(isGenerating).some(Boolean)}
                  className={`
                    inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md
                    ${isGeneratingAll || Object.values(isGenerating).some(Boolean)
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                    }
                    transition-colors
                  `}
                >
                  {isGeneratingAll ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Genererar alla...
                    </>
                  ) : (
                    <>
                      <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2.828 0 012.828 0L16 16m-2-2l1.586-1.586a2 2.828 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Generera Alla ({MOCK_PLAYERS.length})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Player List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Spelare ({MOCK_PLAYERS.length})
                </h2>
              </div>
              <PlayerList 
                players={MOCK_PLAYERS}
                onGenerateGraphic={handleGenerateGraphic}
                isGenerating={isGenerating}
                generatedGraphics={generatedGraphics}
                isGeneratingAll={isGeneratingAll}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Lagets Statistik
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Registrerade spelare:</span>
                  <span className="font-semibold">
                    {MOCK_PLAYERS.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Senast uppdaterad:</span>
                  <span className="font-semibold">
                    Idag
                  </span>
                </div>
              </div>
            </div>

            {/* Generated Graphics Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Genererade Grafiker
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Totalt skapade:</span>
                  <span className="font-semibold">{generatedGraphics.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Idag:</span>
                  <span className="font-semibold text-green-600">
                    {generatedGraphics.filter(g => 
                      g.generatedAt.toDateString() === new Date().toDateString()
                    ).length}
                  </span>
                </div>
              </div>
              
              {generatedGraphics.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Senaste grafiker:
                  </h4>
                  <div className="space-y-1">
                    {generatedGraphics.slice(-3).reverse().map(graphic => {
                      const player = MOCK_PLAYERS.find(p => p.id === graphic.playerId);
                      return (
                        <div key={graphic.id} className="text-xs text-gray-600">
                          {player?.name} - {graphic.generatedAt.toLocaleDateString()}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Hidden canvas for graphics generation */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
        width={1080}
        height={1080}
      />
    </div>
  );
}