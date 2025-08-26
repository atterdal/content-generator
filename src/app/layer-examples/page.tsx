'use client';

import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  getCanvasPresets,
  calculateCanvasSize,
  exportLayerByLayer,
  exportComposite
} from '@/lib/graphics-engine/layerExporter';
import { generateExploded3DView, generateExploded3DViewWithGrid } from '@/lib/graphics-engine/exploded3d';
import { COLOR_THEMES } from '@/types';

// Helper function to generate grid visualization
async function generateGridVisualization(canvas: HTMLCanvasElement, canvasOptions: any): Promise<string> {
  // Set canvas size
  canvas.width = canvasOptions.width;
  canvas.height = canvasOptions.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context');
  
  // Clear with white background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillRect(0, 0, canvasOptions.width, canvasOptions.height);
  
  // Draw grid overlay (4x6 grid)
  drawGridOverlay(ctx, canvasOptions.width, canvasOptions.height, 4, 6);
  
  return canvas.toDataURL('image/png');
}

// Helper function to draw grid overlay
function drawGridOverlay(ctx: CanvasRenderingContext2D, width: number, height: number, cols: number, rows: number) {
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  
  ctx.save();
  ctx.strokeStyle = '#FF0000'; // Red grid lines
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]); // Dashed lines
  
  // Draw vertical lines
  for (let i = 0; i <= cols; i++) {
    const x = i * cellWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  // Draw horizontal lines
  for (let i = 0; i <= rows; i++) {
    const y = i * cellHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  ctx.restore();
}

interface OrganizationConfig {
  name: string;
  exportFunction: any;
  generateExplodedView: any;
  generateExplodedViewWithGrid: any;
  generateLayerContent: any;
  getAvailableLayouts: any;
  getAvailablePostTypes: any;
}

export default function LayerExamplesPage() {
  const searchParams = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [layerData, setLayerData] = useState<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Organization configuration
  const [orgConfig, setOrgConfig] = useState<OrganizationConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Controls state
  const [selectedPostType, setSelectedPostType] = useState<string>('matchday');
  const [selectedCanvasPreset, setSelectedCanvasPreset] = useState<string>('Instagram Post');
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<number>(0);
  
  // Available options
  const [availableLayouts, setAvailableLayouts] = useState<any[]>([]);
  const [availablePostTypes, setAvailablePostTypes] = useState<string[]>([]);

  // Load organization configuration from URL parameter
  useEffect(() => {
    const loadOrganization = async () => {
      const org = searchParams?.get('org') || 'habo-if'; // Default to habo-if
      
      try {
        switch (org) {
          case 'habo-if':
            const {
              exportHaboLayerExamples,
              generateExplodedLayerView,
              generateExplodedLayerViewWithGrid,
              generateHaboLayerContent,
              getAvailableLayouts,
              getAvailablePostTypes
            } = await import('@/apps/habo-if/generators/haboLayerGenerator');
            
            setOrgConfig({
              name: 'Habo IF',
              exportFunction: exportHaboLayerExamples,
              generateExplodedView: generateExplodedLayerView,
              generateExplodedViewWithGrid: generateExplodedLayerViewWithGrid,
              generateLayerContent: generateHaboLayerContent,
              getAvailableLayouts,
              getAvailablePostTypes
            });
            break;
          
          default:
            throw new Error(`Organization "${org}" not supported`);
        }
      } catch (error) {
        console.error('Failed to load organization config:', error);
        // Fallback to Habo IF
        const {
          exportHaboLayerExamples,
          generateExplodedLayerView,
          generateExplodedLayerViewWithGrid,
          generateHaboLayerContent,
          getAvailableLayouts,
          getAvailablePostTypes
        } = await import('@/apps/habo-if/generators/haboLayerGenerator');
        
        setOrgConfig({
          name: 'Habo IF',
          exportFunction: exportHaboLayerExamples,
          generateExplodedView: generateExplodedLayerView,
          generateExplodedViewWithGrid: generateExplodedLayerViewWithGrid,
          generateLayerContent: generateHaboLayerContent,
          getAvailableLayouts,
          getAvailablePostTypes
        });
      }
      
      setIsLoading(false);
    };

    loadOrganization();
  }, [searchParams]);

  // Load post types and layouts when organization config changes
  useEffect(() => {
    if (!orgConfig) return;
    
    const loadOptions = async () => {
      try {
        const postTypes = await orgConfig.getAvailablePostTypes();
        setAvailablePostTypes(postTypes);
        if (postTypes.length > 0) {
          setSelectedPostType(postTypes[0]);
        }
      } catch (error) {
        console.error('Failed to load post types:', error);
      }
    };

    loadOptions();
  }, [orgConfig]);

  // Load available layouts when post type changes
  const loadLayouts = async (postType: string) => {
    if (!orgConfig) return;
    
    try {
      const layouts = await orgConfig.getAvailableLayouts(postType as any);
      setAvailableLayouts(layouts);
      if (layouts.length > 0) {
        setSelectedLayoutId(layouts[0].id);
      }
    } catch (error) {
      console.error('Failed to load layouts:', error);
      setAvailableLayouts([]);
    }
  };

  // Load layouts when post type changes
  React.useEffect(() => {
    if (selectedPostType) {
      loadLayouts(selectedPostType);
    }
  }, [selectedPostType, orgConfig]);

  const handlePostTypeChange = (newPostType: string) => {
    setSelectedPostType(newPostType);
    loadLayouts(newPostType);
  };

  // New unified generation function that creates all views at once
  const generateAllViews = async () => {
    if (!canvasRef.current || !orgConfig) return;
    
    setIsGenerating(true);
    try {
      const canvasOptions = getCanvasPresets()[selectedCanvasPreset];
      const options = {
        postType: selectedPostType as any,
        canvas: canvasOptions,
        layoutId: selectedLayoutId,
        themeIndex: selectedTheme,
        // For layer debugging, show all elements
        showPattern: true,
        showOverlay: true,
        showLogo: true
      };
      
      const allResults: Record<string, string> = {};
      
      // 1. Generate individual layer examples
      const layerResults = await orgConfig.exportFunction(canvasRef.current, options);
      Object.assign(allResults, layerResults);
      
      // 2. Generate exploded 3D view
      const explodedResults = await orgConfig.generateExplodedView(canvasRef.current, options);
      Object.assign(allResults, explodedResults);
      
      // 3. Generate exploded 3D view with grid
      const explodedGridResults = await orgConfig.generateExplodedViewWithGrid(canvasRef.current, options);
      Object.assign(allResults, explodedGridResults);
      
      // 4. Generate composite image (all layers together)
      try {
        const { layersContent, context, theme } = await orgConfig.generateLayerContent(options);
        const compositeResult = await exportComposite(canvasRef.current, layersContent, {
          canvas: canvasOptions,
          theme,
          layout: context.layout.css_grid_template
        });
        allResults['composite-all-layers'] = compositeResult;
      } catch (error) {
        console.warn('Failed to generate composite image:', error);
      }

      // 5. Generate grid visualization as separate image
      try {
        const gridVisualizationResult = await generateGridVisualization(canvasRef.current, canvasOptions);
        allResults['grid-visualization'] = gridVisualizationResult;
      } catch (error) {
        console.warn('Failed to generate grid visualization:', error);
      }
      
      setLayerData(allResults);
      console.log('Generated all views with options:', options, 'Results:', Object.keys(allResults));
    } catch (error) {
      console.error('Failed to generate views:', error);
    } finally {
      setIsGenerating(false);
    }
  };


  const downloadLayer = (layerName: string, imageData: string) => {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${layerName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    Object.entries(layerData).forEach(([layerName, imageData]) => {
      setTimeout(() => downloadLayer(layerName, imageData), 100);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading organization configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Design System - Layer Examples
        </h1>
        <p className="text-gray-500 mb-8">
          {orgConfig?.name || 'Unknown Organization'}
        </p>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <p className="text-gray-600 mb-4">
            Generate PNG images with transparency for each layer in the design system. 
            These images show how different elements are built up layer by layer, including 3D exploded views.
          </p>
          
          {/* Controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
              <select
                value={selectedPostType}
                onChange={(e) => handlePostTypeChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availablePostTypes.map(type => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Canvas Size</label>
              <select
                value={selectedCanvasPreset}
                onChange={(e) => setSelectedCanvasPreset(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(getCanvasPresets()).map(preset => (
                  <option key={preset} value={preset}>
                    {preset}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
              <select
                value={selectedLayoutId}
                onChange={(e) => setSelectedLayoutId(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableLayouts.map((layout) => (
                  <option key={layout.id} value={layout.id}>
                    {layout.layout_name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {COLOR_THEMES.map((theme, index) => (
                  <option key={index} value={index}>
                    {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={generateAllViews}
              disabled={isGenerating || !orgConfig}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {isGenerating ? 'Generating All Views...' : 'Generate All Views'}
            </button>
            
            {Object.keys(layerData).length > 0 && (
              <button
                onClick={downloadAll}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                Download All ({Object.keys(layerData).length})
              </button>
            )}
          </div>
        </div>

        {Object.keys(layerData).length > 0 && (
          <div className="space-y-8">
            {/* Individual Layers */}
            {getLayerImages(layerData).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Individual Layers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getLayerImages(layerData).map(([layerName, imageData]) => (
                    <ImageCard key={layerName} layerName={layerName} imageData={imageData} downloadLayer={downloadLayer} />
                  ))}
                </div>
              </div>
            )}

            {/* 3D Exploded Views */}
            {getExplodedImages(layerData).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3D Exploded Views</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getExplodedImages(layerData).map(([layerName, imageData]) => (
                    <ImageCard key={layerName} layerName={layerName} imageData={imageData} downloadLayer={downloadLayer} />
                  ))}
                </div>
              </div>
            )}

            {/* Composite and Utility Images */}
            {getUtilityImages(layerData).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Composite & Utility</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getUtilityImages(layerData).map(([layerName, imageData]) => (
                    <ImageCard key={layerName} layerName={layerName} imageData={imageData} downloadLayer={downloadLayer} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden canvas for generation */}
        <canvas
          ref={canvasRef}
          width={1080}
          height={1080}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}

// Helper functions to organize images by type
function getLayerImages(layerData: Record<string, string>): [string, string][] {
  return Object.entries(layerData).filter(([name]) => name.startsWith('layer'));
}

function getExplodedImages(layerData: Record<string, string>): [string, string][] {
  return Object.entries(layerData).filter(([name]) => name.includes('exploded'));
}

function getUtilityImages(layerData: Record<string, string>): [string, string][] {
  return Object.entries(layerData).filter(([name]) => 
    name.includes('composite') || name.includes('grid-visualization')
  );
}

// ImageCard component
function ImageCard({ 
  layerName, 
  imageData, 
  downloadLayer 
}: { 
  layerName: string; 
  imageData: string; 
  downloadLayer: (layerName: string, imageData: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-square relative bg-gray-100">
        <img
          src={imageData}
          alt={`${layerName}`}
          className="w-full h-full object-contain"
          style={{ 
            background: 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px' 
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{layerName}.png</h3>
        <p className="text-gray-600 text-sm mb-3">
          {getLayerDescription(layerName)}
        </p>
        <button
          onClick={() => downloadLayer(layerName, imageData)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}

function getLayerDescription(layerName: string): string {
  const descriptions: Record<string, string> = {
    // Individual layers
    layer0: 'Background gradients covering the entire canvas',
    layer1: 'Color blocks and gradients according to grid layout',
    layer2: 'Repeating text pattern across the entire canvas',
    layer3: 'Hero block with player image',
    layer4: 'Text blocks and logos (without backgrounds from previous layers)',
    layer5: 'Responsive overlay with centered text',
    
    // 3D exploded views
    'exploded-view-3d': '3D isometric exploded view of all layers',
    'exploded-view-3d-with-grid': '3D exploded view with grid overlay',
    
    // Composite and utility
    'composite-all-layers': 'All layers combined into final design',
    'grid-visualization': 'Grid layout visualization (4x6 grid)'
  };
  
  return descriptions[layerName] || 'Layer example';
}