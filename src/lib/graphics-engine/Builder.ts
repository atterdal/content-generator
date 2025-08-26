import { ColorTheme } from '@/types';
import { GenericCanvas, createGenericCanvas, GenericCanvasOptions } from './Canvas';
import { Block, Floater } from './types';

/**
 * Generic Builder - provides the same API as the old builder
 * but uses the new generic component system underneath
 */
export class GenericBuilder {
  private canvas: GenericCanvas;
  private theme: ColorTheme;

  constructor(canvas: GenericCanvas, theme: ColorTheme) {
    this.canvas = canvas;
    this.theme = theme;
  }

  // =====================================================================
  // BACKWARDS COMPATIBLE API - same methods as old builder
  // =====================================================================

  /**
   * Add background floater (full canvas, layer 0)
   */
  addBackgroundFloater(layer: number = 0): GenericBuilder {
    const floater = this.canvas.createFloater(layer);
    
    // Add random background element handler (same as old system)
    floater.addBackground(async (ctx, bounds) => {
      await this.randomElementsHandler(ctx, bounds);
    });
    
    return this;
  }

  // Methods removed - use direct canvas API instead

  /**
   * Add color block (solid color background in grid area)
   */
  addColorBlock(gridArea: string, color: string, layer: number): GenericBuilder {
    const block = this.canvas.createBlock(gridArea);
    block.addBackground(color, layer);
    
    return this;
  }

  /**
   * Add gradient block (gradient background in grid area)
   */
  addGradientBlock(gridArea: string, layer: number): GenericBuilder {
    const block = this.canvas.createBlock(gridArea);
    
    // Create gradient based on theme and grid area type
    const gradient = this.createThemeGradient(gridArea);
    block.addBackground(gradient, layer);
    
    return this;
  }

  /**
   * Add hero block (player image)
   */
  addHeroBlock(gridArea: string, layer: number): GenericBuilder {
    const block = this.canvas.createBlock(gridArea);
    
    // Add player image (same selection logic as old system)
    const playerImages = [
      '/images/players/image.png',
      '/images/players/image1.png', 
      '/images/players/image2.png',
      '/images/players/image3.png'
    ];
    
    const selectedImage = playerImages[Math.floor(Math.random() * playerImages.length)];
    
    // Add fallback background first
    block.addBackground('#041b70', 1);
    
    // Add player image
    block.addImage(selectedImage, 3, { fit: 'cover' });
    
    return this;
  }

  /**
   * Add logo block (logo with background)
   */
  addLogoBlock(gridArea: string, layer: number, logoPath: string, options: {
    backgroundLayer?: number;
    backgroundColor?: string;
    maxSize?: number;
    offset?: { x?: number; y?: number };
  } = {}): GenericBuilder {
    const {
      backgroundLayer = 1,
      backgroundColor = this.theme.beige,
      maxSize = 1/3,
      offset = { y: -0.05 }
    } = options;
    
    const block = this.canvas.createBlock(gridArea);
    
    // Add background
    block.addBackground(backgroundColor, backgroundLayer);
    
    // Add logo image
    block.addImage(logoPath, 4, {
      fit: 'contain',
      maxSize: maxSize,
      offset: offset
    });
    
    return this;
  }

  /**
   * Add logo image only (no background)
   */
  addLogoImageOnly(gridArea: string, layer: number, logoPath: string, options: {
    maxSize?: number;
    offset?: { x?: number; y?: number };
  } = {}): GenericBuilder {
    const {
      maxSize = 1/3,
      offset = { y: -0.05 }
    } = options;
    
    const block = this.canvas.createBlock(gridArea);
    
    block.addImage(logoPath, 4, {
      fit: 'contain',
      maxSize: maxSize,
      offset: offset
    });
    
    return this;
  }

  /**
   * Add text block
   */
  addTextBlock(gridArea: string, text: string, options: {
    layer: number;
    fontSize?: number;
    color?: string;
    vertical?: boolean;
    multiline?: boolean;
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  }): GenericBuilder {
    const block = this.canvas.createBlock(gridArea);
    
    block.addText(text, options.layer, {
      fontSize: options.fontSize || 18,
      color: options.color || '#000000',
      vertical: options.vertical || false,
      multiline: options.multiline || false,
      textTransform: options.textTransform || "uppercase"
    });
    
    return this;
  }

  /**
   * Add transparent block (no elements, just reserves grid area)
   */
  addTransparentBlock(gridArea: string): GenericBuilder {
    // Just create the block, don't add any elements
    this.canvas.createBlock(gridArea);
    
    return this;
  }

  /**
   * Build and return base64 image data
   */
  async build(): Promise<string> {
    await this.canvas.renderAll();
    return this.canvas.toDataURL('image/png');
  }

  // =====================================================================
  // NEW GENERIC API - access to underlying components
  // =====================================================================

  /**
   * Get direct access to canvas for advanced usage
   */
  getCanvas(): GenericCanvas {
    return this.canvas;
  }

  /**
   * Create a custom block
   */
  createBlock(gridArea: string): Block {
    return this.canvas.createBlock(gridArea);
  }

  /**
   * Create a custom floater
   */
  createFloater(layer: number): Floater {
    return this.canvas.createFloater(layer);
  }

  /**
   * Render only specific layers
   */
  async renderLayer(layerNumber: number): Promise<void> {
    await this.canvas.renderLayer(layerNumber);
  }

  /**
   * Export specific layer as image
   */
  async exportLayer(layerNumber: number): Promise<string> {
    this.canvas.clear();
    await this.canvas.renderLayer(layerNumber);
    return this.canvas.toDataURL('image/png');
  }

  // =====================================================================
  // PRIVATE HELPER METHODS
  // =====================================================================

  private createThemeGradient(gridArea: string): { angle?: number; stops: Array<{ offset: number; color: string }> } {
    // Create gradient based on theme and area type
    if (gridArea === 'blue' || gridArea === 'graphic') {
      return {
        angle: 50,
        stops: [
          { offset: 0, color: this.theme.blue },
          { offset: 1, color: this.theme.blueLight || this.theme.blue }
        ]
      };
    }
    
    // Default gradient
    return {
      angle: 135,
      stops: [
        { offset: 0, color: this.theme.blue },
        { offset: 1, color: this.theme.blueLight || this.theme.blue }
      ]
    };
  }

  private async randomElementsHandler(ctx: CanvasRenderingContext2D, bounds: any): Promise<void> {
    // Same logic as old system - choose between image background and gradient
    const backgroundElements = [
      '/images/elements/Edward3.jpg',
      '/images/elements/Robert1.jpg',
      '/images/elements/Edward-Movement.jpg',
      '/images/elements/Robert-Movement-wide.jpg'
    ];
    
    const selectedBg = backgroundElements[Math.floor(Math.random() * backgroundElements.length)];
    
    return new Promise((resolve) => {
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
        ctx.fillStyle = `${this.theme.blue}70`;
        ctx.fillRect(0, 0, bounds.width, bounds.height);
        
        resolve();
      };
      
      img.onerror = () => {
        // Fallback gradient
        const gradient = ctx.createLinearGradient(0, 0, bounds.width * 0.8, bounds.height * 0.8);
        gradient.addColorStop(0, this.theme.blue);
        gradient.addColorStop(1, this.theme.blueLight || this.theme.blue);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, bounds.width, bounds.height);
        resolve();
      };
      
      img.src = selectedBg;
    });
  }
}

// =====================================================================
// BACKWARDS COMPATIBLE FACTORY FUNCTION
// =====================================================================

/**
 * Create a generic builder - same API as old createFloaterDesign
 */
export function createFloaterDesign(
  canvas: HTMLCanvasElement,
  gridTemplate: string,
  theme: ColorTheme,
  options?: Partial<GenericCanvasOptions>
): GenericBuilder {
  const genericCanvas = createGenericCanvas(canvas, gridTemplate, theme, options);
  return new GenericBuilder(genericCanvas, theme);
}