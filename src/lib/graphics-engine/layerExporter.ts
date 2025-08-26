import { createGenericCanvas } from './Canvas';
import { Block, Floater } from './types';
import { ColorTheme } from '@/types';

// Generic interfaces for the agnostic layer exporter
export interface CanvasOptions {
  width: number;
  height: number;
  dpi?: number; // Default 72
}

export interface LayerContent {
  blocks: Block[];
  floaters: Floater[];
}

export interface LayerExportOptions {
  canvas?: CanvasOptions;
  theme: ColorTheme;
  layout: string; // CSS grid template
}

// Canvas presets for common use cases (agnostic)
export function getCanvasPresets(): Record<string, CanvasOptions> {
  return {
    'Instagram Post': { width: 1080, height: 1080, dpi: 72 },
    'Instagram Story': { width: 1080, height: 1920, dpi: 72 },
    'Facebook Post': { width: 1200, height: 630, dpi: 72 },
    'A4 Print (72 DPI)': { width: 595, height: 842, dpi: 72 },
    'A4 Print (150 DPI)': { width: 1240, height: 1754, dpi: 150 },
    'A4 Print (300 DPI)': { width: 2480, height: 3508, dpi: 300 },
    'A5 Print (300 DPI)': { width: 1748, height: 2480, dpi: 300 },
    'Business Card (300 DPI)': { width: 1050, height: 600, dpi: 300 }
  };
}

// Helper function to calculate dimensions from physical size (agnostic)
export function calculateCanvasSize(
  widthMm: number, 
  heightMm: number, 
  dpi: number = 72
): CanvasOptions {
  // Convert mm to inches, then to pixels
  const widthInches = widthMm / 25.4;
  const heightInches = heightMm / 25.4;
  
  return {
    width: Math.round(widthInches * dpi),
    height: Math.round(heightInches * dpi),
    dpi
  };
}

// Generic layer exporter - works with any components and themes
export async function exportLayerByLayer(
  canvas: HTMLCanvasElement,
  layersContent: LayerContent[],
  options: LayerExportOptions
): Promise<Record<string, string>> {
  const { canvas: canvasOptions = { width: 1080, height: 1080, dpi: 72 }, theme, layout } = options;
  
  // Set canvas size
  setCanvasSize(canvas, canvasOptions);
  
  // Format layout for GenericCanvas
  const formattedLayout = layout
    .replace(/"/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .reduce((acc, curr, idx) => {
      if (idx % 4 === 0 && idx > 0) acc += '\n';
      acc += (idx % 4 === 0 ? '' : ' ') + curr;
      return acc;
    }, '');

  const results: Record<string, string> = {};
  
  // Export each layer individually
  for (let layerIndex = 0; layerIndex < layersContent.length; layerIndex++) {
    try {
      const imageData = await exportSingleLayer(
        canvas,
        layersContent[layerIndex],
        layerIndex,
        formattedLayout,
        theme
      );
      results[`layer${layerIndex}`] = imageData;
    } catch (error) {
      console.error(`Failed to export layer ${layerIndex}:`, error);
    }
  }
  
  return results;
}

// Export a single layer with specific content
export async function exportSingleLayer(
  canvas: HTMLCanvasElement,
  content: LayerContent,
  layerNumber: number,
  layout: string,
  theme: ColorTheme
): Promise<string> {
  // Create generic canvas
  const genericCanvas = createGenericCanvas(canvas, layout, theme);
  
  // Add blocks for this layer
  content.blocks.forEach(block => {
    genericCanvas.addBlock(block);
  });
  
  // Add floaters for this layer
  content.floaters.forEach(floater => {
    genericCanvas.addFloater(floater);
  });
  
  // Render only this layer
  await genericCanvas.renderLayer(layerNumber);
  return genericCanvas.toDataURL('image/png');
}

// Export all layers combined (final composite)
export async function exportComposite(
  canvas: HTMLCanvasElement,
  layersContent: LayerContent[],
  options: LayerExportOptions
): Promise<string> {
  const { canvas: canvasOptions = { width: 1080, height: 1080, dpi: 72 }, theme, layout } = options;
  
  // Set canvas size
  setCanvasSize(canvas, canvasOptions);
  
  // Format layout
  const formattedLayout = layout
    .replace(/"/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .reduce((acc, curr, idx) => {
      if (idx % 4 === 0 && idx > 0) acc += '\n';
      acc += (idx % 4 === 0 ? '' : ' ') + curr;
      return acc;
    }, '');

  // Create generic canvas
  const genericCanvas = createGenericCanvas(canvas, formattedLayout, theme);
  
  // Add all blocks and floaters from all layers
  layersContent.forEach(content => {
    content.blocks.forEach(block => {
      genericCanvas.addBlock(block);
    });
    content.floaters.forEach(floater => {
      genericCanvas.addFloater(floater);
    });
  });
  
  // Render all layers
  await genericCanvas.renderAll();
  return genericCanvas.toDataURL('image/png');
}

// Generic utility to set canvas size with DPI support
function setCanvasSize(canvas: HTMLCanvasElement, options: CanvasOptions): void {
  canvas.width = options.width;
  canvas.height = options.height;
  
  // Set DPI metadata (for high-DPI rendering if needed)
  if (options.dpi && options.dpi !== 72) {
    const scale = options.dpi / 72;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Scale the canvas for high-DPI rendering
      ctx.scale(scale, scale);
    }
  }
}

// Helper to group components by layer number
export function groupContentByLayer(
  blocks: Block[],
  floaters: Floater[]
): LayerContent[] {
  // Safely get layer numbers from elements, handling empty arrays
  const blockLayers = blocks.flatMap(b => (b.elements || []).map(e => e.layer));
  const floaterLayers = floaters.flatMap(f => (f.elements || []).map(e => e.layer));
  
  const allLayers = [...blockLayers, ...floaterLayers, 5]; // Minimum 6 layers (0-5)
  const maxLayer = allLayers.length > 0 ? Math.max(...allLayers) : 5;
  
  const layers: LayerContent[] = [];
  
  for (let i = 0; i <= maxLayer; i++) {
    layers[i] = {
      blocks: blocks.filter(b => (b.elements || []).some(e => e.layer === i)),
      floaters: floaters.filter(f => (f.elements || []).some(e => e.layer === i))
    };
  }
  
  return layers;
}