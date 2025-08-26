import { ColorTheme } from '@/types';
import { Block, Floater, BoundingBox, GridArea } from './types';

export interface GenericCanvasOptions {
  width: number;
  height: number;
  rows?: number;
  columns?: number;
  gap?: number;
  padding?: number;
}

export class GenericCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: GenericCanvasOptions;
  private gridAreas: Map<string, GridArea> = new Map();
  private blocks: Block[] = [];
  private floaters: Floater[] = [];

  constructor(canvas: HTMLCanvasElement, options: GenericCanvasOptions) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.options = {
      rows: 6,
      columns: 4,
      gap: 0,
      padding: 0,
      ...options
    };
    
    // Set canvas size
    this.canvas.width = options.width;
    this.canvas.height = options.height;
  }

  // Parse CSS Grid template and create grid areas
  parseGridTemplate(gridTemplate: string): void {
    const lines = gridTemplate.trim().split('\n').map(line => line.trim());
    const areas: Map<string, GridArea> = new Map();

    lines.forEach((line, rowIndex) => {
      const cells = line.split(/\s+/).filter(Boolean);
      
      cells.forEach((cell, colIndex) => {
        // Remove quotes if present
        const areaName = cell.replace(/['"]/g, '');
        
        if (!areas.has(areaName)) {
          areas.set(areaName, {
            name: areaName,
            startRow: rowIndex,
            endRow: rowIndex + 1,
            startCol: colIndex,
            endCol: colIndex + 1
          });
        } else {
          // Extend existing area
          const area = areas.get(areaName)!;
          area.endRow = Math.max(area.endRow, rowIndex + 1);
          area.endCol = Math.max(area.endCol, colIndex + 1);
          area.startRow = Math.min(area.startRow, rowIndex);
          area.startCol = Math.min(area.startCol, colIndex);
        }
      });
    });

    this.gridAreas = areas;
  }

  // Get bounding box for a grid area
  getGridAreaBounds(areaName: string): BoundingBox | null {
    const area = this.gridAreas.get(areaName);
    if (!area) return null;

    const cellWidth = this.options.width / this.options.columns!;
    const cellHeight = this.options.height / this.options.rows!;

    return {
      x: area.startCol * cellWidth + (this.options.gap || 0),
      y: area.startRow * cellHeight + (this.options.gap || 0),
      width: (area.endCol - area.startCol) * cellWidth - (this.options.gap || 0) * 2,
      height: (area.endRow - area.startRow) * cellHeight - (this.options.gap || 0) * 2
    };
  }

  // Get full canvas bounds
  getCanvasBounds(): BoundingBox {
    return {
      x: 0,
      y: 0,
      width: this.options.width,
      height: this.options.height
    };
  }

  // Add a block to the canvas
  addBlock(block: Block): GenericCanvas {
    this.blocks.push(block);
    return this;
  }

  // Add a floater to the canvas
  addFloater(floater: Floater): GenericCanvas {
    this.floaters.push(floater);
    return this;
  }

  // Create a new block for a grid area
  createBlock(gridArea: string, padding?: number): Block {
    const block = new Block(gridArea, padding);
    this.addBlock(block);
    return block;
  }

  // Create a new floater
  createFloater(layer: number, bounds?: BoundingBox): Floater {
    const floater = new Floater(layer, bounds);
    this.addFloater(floater);
    return floater;
  }

  // Render all elements in a specific layer
  async renderLayer(layerNumber: number): Promise<void> {
    // Clear canvas for this layer
    if (layerNumber === 0) {
      this.ctx.clearRect(0, 0, this.options.width, this.options.height);
    }

    // Render floater elements in this layer
    const canvasBounds = this.getCanvasBounds();
    
    for (const floater of this.floaters) {
      for (const element of floater.elements) {
        if (element.layer === layerNumber) {
          await element.render(this.ctx, floater.bounds || canvasBounds);
        }
      }
    }

    // Render block elements in this layer
    for (const block of this.blocks) {
      const bounds = this.getGridAreaBounds(block.gridArea);
      if (!bounds) {
        console.warn(`Grid area '${block.gridArea}' not found`);
        continue;
      }

      // Apply padding if specified
      if (block.padding) {
        bounds.x += block.padding;
        bounds.y += block.padding;
        bounds.width -= block.padding * 2;
        bounds.height -= block.padding * 2;
      }

      for (const element of block.elements) {
        if (element.layer === layerNumber) {
          await element.render(this.ctx, bounds);
        }
      }
    }
  }

  // Render all layers
  async renderAll(): Promise<void> {
    // Find all unique layer numbers
    const layerNumbers = new Set<number>();
    
    this.floaters.forEach(floater => {
      floater.elements.forEach(element => layerNumbers.add(element.layer));
    });
    
    this.blocks.forEach(block => {
      block.elements.forEach(element => layerNumbers.add(element.layer));
    });

    // Render layers in order
    const sortedLayers = Array.from(layerNumbers).sort((a, b) => a - b);
    
    for (const layerNumber of sortedLayers) {
      await this.renderLayer(layerNumber);
    }
  }

  // Export canvas as base64 data URL
  toDataURL(type: string = 'image/png', quality?: any): string {
    return this.canvas.toDataURL(type, quality);
  }

  // Clear canvas
  clear(): void {
    this.ctx.clearRect(0, 0, this.options.width, this.options.height);
  }

  // Get all blocks
  getBlocks(): Block[] {
    return this.blocks;
  }

  // Get all floaters
  getFloaters(): Floater[] {
    return this.floaters;
  }

  // Get grid areas
  getGridAreas(): Map<string, GridArea> {
    return this.gridAreas;
  }
}

// Helper function to create a canvas with common settings
export function createGenericCanvas(
  canvas: HTMLCanvasElement,
  gridTemplate: string,
  theme: ColorTheme,
  options: Partial<GenericCanvasOptions> = {}
): GenericCanvas {
  const defaultOptions: GenericCanvasOptions = {
    width: 1080,
    height: 1080,
    rows: 6,
    columns: 4,
    gap: 0,
    padding: 0,
    ...options
  };

  const genericCanvas = new GenericCanvas(canvas, defaultOptions);
  genericCanvas.parseGridTemplate(gridTemplate);
  
  return genericCanvas;
}