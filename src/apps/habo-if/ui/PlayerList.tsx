'use client';

import { Player, GeneratedGraphic } from '@/types';
import { downloadImage, formatFilename, getPlayerGraphics } from '@/lib/utils/downloadUtils';

interface PlayerListProps {
  players: Player[];
  onGenerateGraphic: (player: Player) => void;
  isGenerating: Record<string, boolean>;
  generatedGraphics: GeneratedGraphic[];
  isGeneratingAll?: boolean;
}

export function PlayerList({ 
  players, 
  onGenerateGraphic, 
  isGenerating, 
  generatedGraphics,
  isGeneratingAll = false
}: PlayerListProps) {
  
  const getPlayerGraphicsCount = (playerId: string) => {
    return generatedGraphics.filter(g => g.playerId === playerId).length;
  };

  const getLatestGraphic = (playerId: string) => {
    const playerGraphics = generatedGraphics.filter(g => g.playerId === playerId);
    return playerGraphics.sort((a, b) => b.generatedAt.getTime() - a.generatedAt.getTime())[0];
  };

  const handleDownloadLatest = (player: Player) => {
    const latestGraphic = getLatestGraphic(player.id);
    if (latestGraphic) {
      const filename = formatFilename(player, latestGraphic.generatedAt);
      downloadImage(latestGraphic.imageData, filename);
    }
  };

  const formatPosition = (position: string) => {
    const positionMap: Record<string, string> = {
      'Målvakt': 'MV',
      'Försvarare': 'FÖR',
      'Mittfältare': 'MF',
      'Anfallare': 'ANF'
    };
    return positionMap[position] || position.slice(0, 3).toUpperCase();
  };

  const getPositionColor = (position: string) => {
    const colorMap: Record<string, string> = {
      'Målvakt': 'bg-yellow-100 text-yellow-800',
      'Försvarare': 'bg-blue-100 text-blue-800',
      'Mittfältare': 'bg-green-100 text-green-800',
      'Anfallare': 'bg-red-100 text-red-800'
    };
    return colorMap[position] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="divide-y divide-gray-200">
      {players.map((player) => {
        const isGeneratingGraphic = isGenerating[player.id] || false;
        const graphicsCount = getPlayerGraphicsCount(player.id);
        const latestGraphic = getLatestGraphic(player.id);
        const isButtonDisabled = isGeneratingGraphic || isGeneratingAll;

        return (
          <div key={player.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              
              {/* Player Info */}
              <div className="flex items-center space-x-4">
                {/* Jersey Number */}
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {player.number}
                </div>
                
                {/* Name and Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {player.name}
                  </h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}>
                      {formatPosition(player.position)}
                    </span>
                    {player.age && (
                      <span className="text-sm text-gray-600">
                        {player.age} år
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                {player.stats && (
                  <div className="hidden md:flex items-center space-x-6 ml-8">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{player.stats.goals}</div>
                      <div className="text-xs text-gray-500">Mål</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{player.stats.assists}</div>
                      <div className="text-xs text-gray-500">Assist</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{player.stats.matches}</div>
                      <div className="text-xs text-gray-500">Matcher</div>
                    </div>
                    <div className="flex space-x-1">
                      {player.stats.yellowCards > 0 && (
                        <div className="flex items-center">
                          <div className="w-3 h-4 bg-yellow-400 rounded-sm mr-1"></div>
                          <span className="text-sm">{player.stats.yellowCards}</span>
                        </div>
                      )}
                      {player.stats.redCards > 0 && (
                        <div className="flex items-center ml-2">
                          <div className="w-3 h-4 bg-red-500 rounded-sm mr-1"></div>
                          <span className="text-sm">{player.stats.redCards}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions and Graphics Info */}
              <div className="flex items-center space-x-3">
                {/* Graphics Count */}
                {graphicsCount > 0 && (
                  <div className="text-center">
                    <div className="text-sm font-semibold text-green-600">
                      {graphicsCount} grafik{graphicsCount !== 1 ? 'er' : ''}
                    </div>
                    {latestGraphic && (
                      <div className="text-xs text-gray-500">
                        Senast: {latestGraphic.generatedAt.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                )}

                {/* Download Button */}
                {graphicsCount > 0 && (
                  <button
                    onClick={() => handleDownloadLatest(player)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Ladda ner
                  </button>
                )}

                {/* Generate Button */}
                <button
                  onClick={() => onGenerateGraphic(player)}
                  disabled={isButtonDisabled}
                  className={`
                    inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                    ${isButtonDisabled 
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }
                    transition-colors
                  `}
                >
                  {isGeneratingGraphic ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Genererar...
                    </>
                  ) : (
                    <>
                      <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Generera Grafik
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Stats */}
            {player.stats && (
              <div className="md:hidden mt-4 flex justify-between text-sm">
                <div className="flex space-x-4">
                  <span><strong>{player.stats.goals}</strong> mål</span>
                  <span><strong>{player.stats.assists}</strong> assist</span>
                  <span><strong>{player.stats.matches}</strong> matcher</span>
                </div>
                <div className="flex space-x-2">
                  {player.stats.yellowCards > 0 && (
                    <span className="flex items-center">
                      <div className="w-2 h-3 bg-yellow-400 rounded-sm mr-1"></div>
                      {player.stats.yellowCards}
                    </span>
                  )}
                  {player.stats.redCards > 0 && (
                    <span className="flex items-center">
                      <div className="w-2 h-3 bg-red-500 rounded-sm mr-1"></div>
                      {player.stats.redCards}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {players.length === 0 && (
        <div className="p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Inga spelare</h3>
          <p className="mt-1 text-sm text-gray-500">
            Lägg till spelare för att komma igång.
          </p>
        </div>
      )}
    </div>
  );
}