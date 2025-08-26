import { Block, Floater } from './types';
import { ColorTheme } from '@/types';
import { CanvasOptions } from './layerExporter';

// Generic interfaces for 3D exploded view
export interface Exploded3DOptions {
  canvas?: CanvasOptions;
  theme: ColorTheme;
  layout: string; // CSS grid template
  perspective?: {
    zSpacing?: number;
    scale?: number;
    rotateX?: number;
    rotateY?: number;
    layerRotateX?: number;
    layerRotateY?: number;
    layerRotateZ?: number;
  };
}

export interface LayerContent {
  blocks: Block[];
  floaters: Floater[];
}

// Default perspective settings
const DEFAULT_PERSPECTIVE = {
  zSpacing: 100,
  scale: 0.9,
  rotateX: 60,
  rotateY: 0,
  layerRotateX: 65,
  layerRotateY: 45,
  layerRotateZ: -8
};

// Generate exploded 3D view without grid overlay
export async function generateExploded3DView(
  canvas: HTMLCanvasElement,
  layersContent: LayerContent[],
  options: Exploded3DOptions
): Promise<string> {
  const { canvas: canvasOptions = { width: 1080, height: 1080, dpi: 72 }, theme, layout } = options;
  const perspective = { ...DEFAULT_PERSPECTIVE, ...options.perspective };
  
  // Set canvas size for 3D perspective view
  const explodedWidth = Math.ceil(canvasOptions.width * 1.5);
  const explodedHeight = Math.ceil(canvasOptions.height * 1.5);
  canvas.width = explodedWidth;
  canvas.height = explodedHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context');
  
  // Clear with subtle background
  ctx.fillStyle = 'rgba(240, 240, 240, 0.95)';
  ctx.fillRect(0, 0, explodedWidth, explodedHeight);
  
  // Create temporary canvas for each layer
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvasOptions.width;
  tempCanvas.height = canvasOptions.height;
  
  // Render all layers in 3D perspective (front to back - layer 0 at bottom)
  for (let layerIndex = 0; layerIndex < layersContent.length; layerIndex++) {
    const layerContent = layersContent[layerIndex];
    if (layerContent.blocks.length === 0 && layerContent.floaters.length === 0) continue;
    
    // Clear temp canvas
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) continue;
    tempCtx.clearRect(0, 0, canvasOptions.width, canvasOptions.height);
    
    // Render this layer to temp canvas first
    const { createGenericCanvas } = await import('./Canvas');
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
      
    const genericCanvas = createGenericCanvas(tempCanvas, formattedLayout, theme);
    
    // Add blocks and floaters for this layer
    layerContent.blocks.forEach(block => genericCanvas.addBlock(block));
    layerContent.floaters.forEach(floater => genericCanvas.addFloater(floater));
    
    // Render only this layer
    await genericCanvas.renderLayer(layerIndex);
    
    // Create a new canvas with background and border for this layer
    const layerWithBg = createLayerWithBackground(tempCanvas, canvasOptions);
    
    // Add layer label
    const bgCtx = layerWithBg.getContext('2d');
    if (bgCtx) {
      bgCtx.fillStyle = '#000000';
      bgCtx.font = 'bold 24px Arial';
      bgCtx.fillText(`Layer ${layerIndex}`, 20, 40);
    }
    
    // Draw layer to main canvas with 3D perspective
    draw3DLayer(ctx, layerWithBg, layerIndex, layersContent.length, perspective, explodedWidth, explodedHeight, canvasOptions);
  }
  
  return canvas.toDataURL('image/png');
}

// Generate exploded 3D view with grid overlay
export async function generateExploded3DViewWithGrid(
  canvas: HTMLCanvasElement,
  layersContent: LayerContent[],
  options: Exploded3DOptions
): Promise<string> {
  const { canvas: canvasOptions = { width: 1080, height: 1080, dpi: 72 }, theme, layout } = options;
  const perspective = { ...DEFAULT_PERSPECTIVE, ...options.perspective };
  
  // Set canvas size for 3D perspective view with grid
  const explodedWidth = Math.ceil(canvasOptions.width * 1.5);
  const explodedHeight = Math.ceil(canvasOptions.height * 1.5);
  canvas.width = explodedWidth;
  canvas.height = explodedHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context');
  
  // Clear with subtle background
  ctx.fillStyle = 'rgba(240, 240, 240, 0.95)';
  ctx.fillRect(0, 0, explodedWidth, explodedHeight);
  
  // Create temporary canvas for each layer
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvasOptions.width;
  tempCanvas.height = canvasOptions.height;
  
  // Render all layers in 3D perspective with grid overlay (front to back - layer 0 at bottom)
  for (let layerIndex = 0; layerIndex < layersContent.length; layerIndex++) {
    const layerContent = layersContent[layerIndex];
    if (layerContent.blocks.length === 0 && layerContent.floaters.length === 0) continue;
    
    // Clear temp canvas
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) continue;
    tempCtx.clearRect(0, 0, canvasOptions.width, canvasOptions.height);
    
    // Render this layer to temp canvas
    const { createGenericCanvas } = await import('./Canvas');
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
      
    const genericCanvas = createGenericCanvas(tempCanvas, formattedLayout, theme);
    
    // Add blocks and floaters for this layer
    layerContent.blocks.forEach(block => genericCanvas.addBlock(block));
    layerContent.floaters.forEach(floater => genericCanvas.addFloater(floater));
    
    // Render only this layer
    await genericCanvas.renderLayer(layerIndex);
    
    // Create a new canvas with background, border and grid for this layer
    const layerWithBg = createLayerWithBackgroundAndGrid(tempCanvas, canvasOptions);
    
    // Add layer label
    const bgCtx = layerWithBg.getContext('2d');
    if (bgCtx) {
      bgCtx.fillStyle = '#000000';
      bgCtx.font = 'bold 24px Arial';
      bgCtx.fillText(`Layer ${layerIndex}`, 20, 40);
    }
    
    // Draw layer to main canvas with 3D perspective
    draw3DLayer(ctx, layerWithBg, layerIndex, layersContent.length, perspective, explodedWidth, explodedHeight, canvasOptions);
  }
  
  return canvas.toDataURL('image/png');
}

// Helper function to create layer with background and border
function createLayerWithBackground(
  layerCanvas: HTMLCanvasElement, 
  canvasOptions: CanvasOptions
): HTMLCanvasElement {
  const layerWithBg = document.createElement('canvas');
  layerWithBg.width = canvasOptions.width;
  layerWithBg.height = canvasOptions.height;
  const bgCtx = layerWithBg.getContext('2d');
  if (!bgCtx) return layerCanvas;
  
  // Create rounded rectangle with border BEFORE transformation
  const radius = 15; // Corner radius
  
  // Draw rounded rectangle background
  bgCtx.beginPath();
  bgCtx.moveTo(radius, 0);
  bgCtx.lineTo(canvasOptions.width - radius, 0);
  bgCtx.quadraticCurveTo(canvasOptions.width, 0, canvasOptions.width, radius);
  bgCtx.lineTo(canvasOptions.width, canvasOptions.height - radius);
  bgCtx.quadraticCurveTo(canvasOptions.width, canvasOptions.height, canvasOptions.width - radius, canvasOptions.height);
  bgCtx.lineTo(radius, canvasOptions.height);
  bgCtx.quadraticCurveTo(0, canvasOptions.height, 0, canvasOptions.height - radius);
  bgCtx.lineTo(0, radius);
  bgCtx.quadraticCurveTo(0, 0, radius, 0);
  bgCtx.closePath();
  
  // Fill with white semi-transparent background
  bgCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  bgCtx.fill();
  
  // Add border
  bgCtx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  bgCtx.lineWidth = 5;
  bgCtx.stroke();
  
  // Clip to rounded rectangle for content
  bgCtx.save();
  bgCtx.clip();
  
  // Draw the rendered layer on top
  bgCtx.drawImage(layerCanvas, 0, 0);
  
  bgCtx.restore();
  
  return layerWithBg;
}

// Helper function to create layer with background, border and grid
function createLayerWithBackgroundAndGrid(
  layerCanvas: HTMLCanvasElement, 
  canvasOptions: CanvasOptions
): HTMLCanvasElement {
  const layerWithBg = document.createElement('canvas');
  layerWithBg.width = canvasOptions.width;
  layerWithBg.height = canvasOptions.height;
  const bgCtx = layerWithBg.getContext('2d');
  if (!bgCtx) return layerCanvas;
  
  // Create rounded rectangle with border BEFORE transformation
  const radius = 15; // Corner radius
  
  // Draw rounded rectangle background
  bgCtx.beginPath();
  bgCtx.moveTo(radius, 0);
  bgCtx.lineTo(canvasOptions.width - radius, 0);
  bgCtx.quadraticCurveTo(canvasOptions.width, 0, canvasOptions.width, radius);
  bgCtx.lineTo(canvasOptions.width, canvasOptions.height - radius);
  bgCtx.quadraticCurveTo(canvasOptions.width, canvasOptions.height, canvasOptions.width - radius, canvasOptions.height);
  bgCtx.lineTo(radius, canvasOptions.height);
  bgCtx.quadraticCurveTo(0, canvasOptions.height, 0, canvasOptions.height - radius);
  bgCtx.lineTo(0, radius);
  bgCtx.quadraticCurveTo(0, 0, radius, 0);
  bgCtx.closePath();
  
  // Fill with white semi-transparent background
  bgCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  bgCtx.fill();
  
  // Add border
  bgCtx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  bgCtx.lineWidth = 5;
  bgCtx.stroke();
  
  // Clip to rounded rectangle for content
  bgCtx.save();
  bgCtx.clip();
  
  // Draw the rendered layer on top
  bgCtx.drawImage(layerCanvas, 0, 0);

  // Add grid overlay (4x6 grid)
  drawGridOverlay(bgCtx, canvasOptions.width, canvasOptions.height, 4, 6);
  
  bgCtx.restore();
  
  return layerWithBg;
}

// Helper function to draw grid overlay
function drawGridOverlay(ctx: CanvasRenderingContext2D, width: number, height: number, cols: number, rows: number) {
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  
  ctx.save();
  ctx.strokeStyle = '#FF0000'; // Red grid lines
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]); // Dashed lines
  
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

// Helper function to draw a single layer with 3D perspective
function draw3DLayer(
  ctx: CanvasRenderingContext2D,
  layerCanvas: HTMLCanvasElement,
  layerIndex: number,
  totalLayers: number,
  perspective: any,
  mainCanvasWidth: number,
  mainCanvasHeight: number,
  layerOptions: CanvasOptions
) {
  ctx.save();
  
  // Calculate layer position in 3D space (0, 0, z)
  // Invert the z-position so layer 0 is furthest back and layer 5 is closest
  const invertedIndex = (totalLayers - 1) - layerIndex;
  const zOffset = (invertedIndex - (totalLayers - 1) / 2) * perspective.zSpacing;
  
  const rotateY = perspective.rotateY * (Math.PI / 180);
  const rotateX = perspective.rotateX * (Math.PI / 180);
  
  // Apply proper 3D rotation
  const projectedX = zOffset * Math.sin(rotateY);
  const projectedY = -zOffset * Math.cos(rotateY) * Math.sin(rotateX);
  
  // Center the entire stack on canvas
  const centerX = mainCanvasWidth / 2;
  const centerY = mainCanvasHeight / 2;
  
  // Position the layer
  ctx.translate(centerX + projectedX, centerY - projectedY);
  
  // Apply scale
  ctx.scale(perspective.scale, perspective.scale);
  
  // Apply balanced rotations to the individual layer
  // First apply Z rotation (rotate around center of layer)
  const layerRotateZ = perspective.layerRotateZ * (Math.PI / 180);
  ctx.rotate(layerRotateZ);
  
  // Then apply X rotation (foreshortening)
  const layerRotateX = perspective.layerRotateX * (Math.PI / 180);
  const scaleY = Math.cos(layerRotateX);
  ctx.scale(1, scaleY);
  
  // Finally apply Y rotation (moderate skew)
  const layerRotateY = perspective.layerRotateY * (Math.PI / 180);
  const skewX = Math.tan(layerRotateY) * 0.5;
  ctx.transform(1, 0, skewX, 1, 0, 0);
  
  // No shadows - removed completely
  
  // Draw the layer
  ctx.drawImage(
    layerCanvas,
    -layerOptions.width / 2,
    -layerOptions.height / 2
  );
  
  ctx.restore();
}