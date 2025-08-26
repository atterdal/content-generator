'use client';

import React, { useState, useRef } from 'react';
import { Download, Shuffle } from 'lucide-react';
// TODO: Update to use new graphics-engine or remove if no longer needed
// import { GraphicsGenerator } from '@/lib/canvas/generator';
// import { getRandomLayout } from '@/lib/layouts';
import { COLOR_THEMES } from '@/types';

const GraphicsGeneratorComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateGraphics = async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const generator = new GraphicsGenerator(canvasRef.current);
      const randomLayout = getRandomLayout();
      const randomTheme = COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)];
      
      const imageData = await generator.generateLayout(randomLayout, randomTheme);
      setGeneratedImage(imageData);
    } catch (error) {
      console.error('Failed to generate graphics:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.download = `habo-if-graphics-${Date.now()}.png`;
    link.href = generatedImage;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Habo IF Grafikgenerator
          </h1>
          <p className="text-gray-600 text-lg">
            Generera professionell grafik för Habo IF enligt den visuella identiteten
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Designsystem</h2>
              <div className="space-y-3 text-sm">
                <div><strong>Grid-system:</strong> 6 rader × 4 kolumner</div>
                <div><strong>Canvas:</strong> 1080×1080px (kvadratisk)</div>
                <div><strong>Hero-block:</strong> Alltid 2×4 celler</div>
                <div><strong>Layouter:</strong> 6 fördefinierade varianter</div>
                <div><strong>Färgteman:</strong> Classic, Deep, Bright</div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <div className="text-xs text-blue-700">
                  <strong>Totalt 18 kombinationer</strong><br/>
                  Säkerställer variation utan att kompromissa kvalitet
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Färgpalett</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="w-full h-6 bg-blue-600 rounded mb-1"></div>
                  <div className="font-medium">Royal Blue</div>
                  <div className="text-gray-500">#0629A0</div>
                </div>
                <div>
                  <div className="w-full h-6 rounded mb-1" style={{backgroundColor: '#B6975C'}}></div>
                  <div className="font-medium">Heritage Gold</div>
                  <div className="text-gray-500">#B6975C</div>
                </div>
                <div>
                  <div className="w-full h-6 rounded mb-1" style={{backgroundColor: '#f0ede6'}}></div>
                  <div className="font-medium">Classic Beige</div>
                  <div className="text-gray-500">#f0ede6</div>
                </div>
                <div>
                  <div className="w-full h-6 bg-white border rounded mb-1"></div>
                  <div className="font-medium">Pure White</div>
                  <div className="text-gray-500">#FFFFFF</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <button
                onClick={generateGraphics}
                disabled={isGenerating}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center"
              >
                <Shuffle className="w-5 h-5 mr-2" />
                {isGenerating ? 'Genererar...' : 'Generera Grafik'}
              </button>
              
              {generatedImage && (
                <button
                  onClick={downloadImage}
                  className="w-full mt-3 py-3 px-4 border-2 border-yellow-600 text-yellow-600 rounded-lg font-medium hover:bg-yellow-50 transition-all flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Ladda ner PNG (1080×1080)
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Genererad Grafik</h2>
            
            {generatedImage ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={generatedImage} 
                  alt="Generated Habo IF Graphics"
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center aspect-square flex flex-col justify-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-lg grid grid-cols-4 gap-1 p-2">
                  {Array(16).fill(0).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-sm ${
                        i === 4 || i === 5 || i === 8 || i === 9 ? 'bg-blue-400' : 
                        i % 3 === 0 ? 'bg-blue-300' : 
                        'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-gray-500 mb-2">Klicka på &quot;Generera Grafik&quot;</p>
                <p className="text-sm text-gray-400">för att skapa professionell Habo IF-grafik</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <canvas 
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default GraphicsGeneratorComponent;