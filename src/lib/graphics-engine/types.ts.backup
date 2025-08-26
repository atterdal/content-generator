import { ColorTheme } from '@/types';

// Canvas configuration
export interface CanvasProps {
  width: number;
  height: number;
  rows: number;
  columns: number;
  gap?: number;        // Space between grid cells
  padding?: number;    // Default padding inside blocks
  layout: string;      // CSS Grid template
}

// =============================================================================
// NEW GENERIC COMPONENT SYSTEM
// =============================================================================

// Base element interface
export interface Element {
  layer: number;
  render(ctx: CanvasRenderingContext2D, bounds: BoundingBox): Promise<void>;
}

// Generic background element
export interface BackgroundElement extends Element {
  type: 'background';
  color?: string;
  gradient?: {
    angle?: number;
    stops: Array<{ offset: number; color: string }>;
  };
  imageSrc?: string;
  handler?: (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => Promise<void>;
}

// Generic image element
export interface ImageElement extends Element {
  type: 'image';
  src: string;
  fit?: 'cover' | 'contain' | 'fill';
  position?: 'center' | 'top' | 'bottom';
  offset?: { x?: number; y?: number };
  maxSize?: number; // Max ratio of container
}

// Generic text element
export interface TextElement extends Element {
  type: 'text';
  content: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  vertical?: boolean;
  multiline?: boolean;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
}

// Generic pattern element
export interface PatternElement extends Element {
  type: 'pattern';
  text: string;
  opacity?: number;
  fontSize?: number;
  color?: string;
}

// Generic overlay element
export interface OverlayElement extends Element {
  type: 'overlay';
  mainText: string;
  subText?: string;
  background?: string;
  responsive?: boolean;
}

// Generic Block - can contain any elements in any layers
export class Block {
  public gridArea: string;
  public elements: Element[] = [];
  public padding?: number;

  constructor(gridArea: string, padding?: number) {
    this.gridArea = gridArea;
    this.padding = padding;
  }

  addBackground(color: string, layer: number): Block;
  addBackground(gradient: { angle?: number; stops: Array<{ offset: number; color: string }> }, layer: number): Block;
  addBackground(handler: (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => Promise<void>, layer: number): Block;
  addBackground(colorOrGradientOrHandler: any, layer: number): Block {
    const element: BackgroundElement = {
      type: 'background',
      layer,
      render: async (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => {
        if (typeof colorOrGradientOrHandler === 'string') {
          // Solid color
          ctx.fillStyle = colorOrGradientOrHandler;
          ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
        } else if (typeof colorOrGradientOrHandler === 'function') {
          // Custom handler
          await colorOrGradientOrHandler(ctx, bounds);
        } else {
          // Gradient
          const grad = ctx.createLinearGradient(bounds.x, bounds.y, bounds.x + bounds.width, bounds.y + bounds.height);
          colorOrGradientOrHandler.stops.forEach((stop: any) => {
            grad.addColorStop(stop.offset, stop.color);
          });
          ctx.fillStyle = grad;
          ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
        }
      }
    };
    
    this.elements.push(element);
    return this;
  }

  addImage(src: string, layer: number, options: { fit?: 'cover' | 'contain' | 'fill'; maxSize?: number; offset?: { x?: number; y?: number } } = {}): Block {
    const element: ImageElement = {
      type: 'image',
      layer,
      src,
      fit: options.fit || 'cover',
      maxSize: options.maxSize,
      offset: options.offset,
      render: async (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            // Implementation depends on fit type
            if (options.fit === 'contain' && options.maxSize) {
              // Logo-style rendering with size limits
              const maxWidth = bounds.width * options.maxSize;
              const maxHeight = bounds.height * options.maxSize;
              
              let logoWidth, logoHeight;
              const logoAspect = img.width / img.height;
              
              if (maxWidth / logoAspect <= maxHeight) {
                logoWidth = maxWidth;
                logoHeight = logoWidth / logoAspect;
              } else {
                logoHeight = maxHeight;
                logoWidth = logoHeight * logoAspect;
              }
              
              const logoX = bounds.x + (bounds.width - logoWidth) / 2;
              const logoY = bounds.y + (bounds.height - logoHeight) / 2;
              
              if (options.offset) {
                const offsetX = (options.offset.x || 0) * bounds.width;
                const offsetY = (options.offset.y || 0) * bounds.height;
                ctx.drawImage(img, logoX + offsetX, logoY + offsetY, logoWidth, logoHeight);
              } else {
                ctx.drawImage(img, logoX, logoY, logoWidth, logoHeight);
              }
            } else {
              // Cover-style rendering for hero images
              ctx.save();
              ctx.beginPath();
              ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
              ctx.clip();
              
              const imgAspect = img.width / img.height;
              const boundsAspect = bounds.width / bounds.height;
              
              let drawWidth, drawHeight, drawX, drawY;
              
              if (imgAspect > boundsAspect) {
                drawHeight = bounds.height;
                drawWidth = bounds.height * imgAspect;
                drawX = bounds.x - (drawWidth - bounds.width) / 2;
                drawY = bounds.y;
              } else {
                drawWidth = bounds.width;
                drawHeight = bounds.width / imgAspect;
                drawX = bounds.x;
                drawY = bounds.y - (drawHeight - bounds.height) / 2;
              }
              
              ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
              ctx.restore();
            }
            
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            resolve();
          };
          img.src = src;
        });
      }
    };
    
    this.elements.push(element);
    return this;
  }

  addText(content: string, layer: number, options: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    align?: 'left' | 'center' | 'right';
    vertical?: boolean;
    multiline?: boolean;
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  } = {}): Block {
    const element: TextElement = {
      type: 'text',
      layer,
      content,
      fontSize: options.fontSize || 18,
      fontFamily: options.fontFamily || 'serif',
      color: options.color || '#000000',
      align: options.align || 'center',
      vertical: options.vertical || false,
      multiline: options.multiline || false,
      textTransform: options.textTransform || 'none', // Changed default to 'none'
      render: async (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => {
        ctx.save();
        
        ctx.font = `900 ${options.fontSize || 18}px ${options.fontFamily || 'serif'}`;
        ctx.fillStyle = options.color || '#000000';
        ctx.textAlign = options.align || 'center';

        // START: Added text transform logic
        let transformedContent = content;
        switch (options.textTransform) {
            case 'uppercase':
                transformedContent = content.toUpperCase();
                break;
            case 'lowercase':
                transformedContent = content.toLowerCase();
                break;
            case 'capitalize':
                transformedContent = content.toLowerCase().split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                break;
            // Default case ('none' or undefined) does nothing
        }
        // END: Added text transform logic
        
        if (options.vertical) {
          // Vertical text rendering
          ctx.translate(bounds.x + bounds.width/2, bounds.y + bounds.height/2);
          ctx.rotate(-Math.PI/2);
          ctx.fillText(transformedContent, 0, 0); // Use transformed content
        } else {
          // Horizontal text rendering
          const textX = bounds.x + bounds.width/2;
          const textY = bounds.y + bounds.height/2 + (options.fontSize || 18)/3;
          
          if (options.multiline) {
            // TODO: Implement multiline logic
            ctx.fillText(transformedContent, textX, textY); // Use transformed content
          } else {
            ctx.fillText(transformedContent, textX, textY); // Use transformed content
          }
        }
        
        ctx.restore();
      }
    };
    
    this.elements.push(element);
    return this;
  }
}

// Generic Floater - canvas-wide elements
export class Floater {
  public layer: number;
  public bounds?: BoundingBox; // Optional bounding box
  public elements: Element[] = [];

  constructor(layer: number, bounds?: BoundingBox) {
    this.layer = layer;
    this.bounds = bounds;
  }

  addBackground(colorOrGradientOrHandler: any): Floater {
    // Similar to Block.addBackground but for full canvas
    const element: BackgroundElement = {
      type: 'background',
      layer: this.layer,
      render: async (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => {
        // Use canvas bounds or provided bounds
        const renderBounds = this.bounds || bounds;
        
        if (typeof colorOrGradientOrHandler === 'string') {
          ctx.fillStyle = colorOrGradientOrHandler;
          ctx.fillRect(renderBounds.x, renderBounds.y, renderBounds.width, renderBounds.height);
        } else if (typeof colorOrGradientOrHandler === 'function') {
          await colorOrGradientOrHandler(ctx, renderBounds);
        } else {
          const grad = ctx.createLinearGradient(renderBounds.x, renderBounds.y, renderBounds.x + renderBounds.width, renderBounds.y + renderBounds.height);
          colorOrGradientOrHandler.stops.forEach((stop: any) => {
            grad.addColorStop(stop.offset, stop.color);
          });
          ctx.fillStyle = grad;
          ctx.fillRect(renderBounds.x, renderBounds.y, renderBounds.width, renderBounds.height);
        }
      }
    };
    
    this.elements.push(element);
    return this;
  }


  addOverlay(mainText: string, subText?: string, options: { 
    background?: string; 
    responsive?: boolean; 
    canvasWidth?: number 
  } = {}): Floater {
    const element: OverlayElement = {
      type: 'overlay',
      layer: this.layer,
      mainText,
      subText,
      background: options.background,
      responsive: options.responsive || true,
      render: async (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => {
        const renderBounds = this.bounds || bounds;
        const { x, y, width, height } = renderBounds;
        
        ctx.save();
        
        // Background if specified
        if (options.background) {
          ctx.fillStyle = options.background;
          ctx.fillRect(x, y, width, height);
        }

        // Use canvas width for font size calculation (same as original Canvas.ts)
        const canvasWidth = options.canvasWidth || 1080;
        let mainFontSize = canvasWidth * 0.12;
        let subFontSize = mainFontSize / 2;

        // Check if we should use multiline for mainText and subText before scaling
        let useMultilineMainText = false;
        let mainTextLines: string[] = [];
        let useMultilineSubText = false;
        let subTextLines: string[] = [];

        if (options.responsive && options.canvasWidth) {
          const maxWidth = options.canvasWidth * 0.9;
          
          // Test mainText first - only if it contains spaces
          ctx.font = `900 ${mainFontSize}px serif`;
          const mainTextWidth = ctx.measureText(mainText).width;
          
          if (mainText.includes(' ') && mainTextWidth > maxWidth) {
            // Calculate how much scaling would be needed
            const requiredScale = maxWidth / mainTextWidth;
            
            // If we need to scale more than 30%, try multiline first
            if (requiredScale < 0.7) {
              const words = mainText.split(' ');
              let bestSplit = null;
              let bestMaxWidth = Infinity;
              
              // Try different split points to find the best balance
              for (let i = 1; i < words.length; i++) {
                const firstLine = words.slice(0, i).join(' ');
                const secondLine = words.slice(i).join(' ');
                
                const firstLineWidth = ctx.measureText(firstLine).width;
                const secondLineWidth = ctx.measureText(secondLine).width;
                
                // Both lines must fit within maxWidth
                if (firstLineWidth <= maxWidth && secondLineWidth <= maxWidth) {
                  const maxLineWidth = Math.max(firstLineWidth, secondLineWidth);
                  if (maxLineWidth < bestMaxWidth) {
                    bestMaxWidth = maxLineWidth;
                    bestSplit = { firstLine, secondLine };
                  }
                }
              }
              
              if (bestSplit) {
                useMultilineMainText = true;
                mainTextLines = [bestSplit.firstLine, bestSplit.secondLine];
              } else {
                // If no valid split found, try the best split anyway and let scaling handle it
                const midpoint = Math.ceil(words.length / 2);
                const firstLine = words.slice(0, midpoint).join(' ');
                const secondLine = words.slice(midpoint).join(' ');
                
                useMultilineMainText = true;
                mainTextLines = [firstLine, secondLine];
              }
            }
          }

          // Test subText if not using multiline mainText
          if (subText && !useMultilineMainText) {
            ctx.font = `italic ${subFontSize}px serif`;
            const subTextWidth = ctx.measureText(subText).width;

            // If subText is roughly 2x longer than mainText and fits on 2 lines, use multiline
            if (subTextWidth > mainTextWidth * 2 && subTextWidth <= maxWidth * 2) {
              // Try to split subText intelligently
              const words = subText.split(' ');
              const midpoint = Math.ceil(words.length / 2);
              const firstLine = words.slice(0, midpoint).join(' ');
              const secondLine = words.slice(midpoint).join(' ');
              
              // Test if both lines fit
              const firstLineWidth = ctx.measureText(firstLine).width;
              const secondLineWidth = ctx.measureText(secondLine).width;
              
              if (firstLineWidth <= maxWidth && secondLineWidth <= maxWidth) {
                useMultilineSubText = true;
                subTextLines = [firstLine, secondLine];
              }
            }
          }
        }

        if (options.responsive && options.canvasWidth) {
          const maxWidth = options.canvasWidth * 0.9; // 90% of canvas width
          let mainScaleFactor = 1.0;
          let subScaleFactor = 1.0;

          // Test main text - use multiline widths if using multiline
          if (useMultilineMainText && mainTextLines.length === 2) {
            ctx.font = `900 ${mainFontSize}px serif`;
            const firstLineWidth = ctx.measureText(mainTextLines[0]).width;
            const secondLineWidth = ctx.measureText(mainTextLines[1]).width;
            const maxLineWidth = Math.max(firstLineWidth, secondLineWidth);
            
            if (maxLineWidth > maxWidth) {
              mainScaleFactor = maxWidth / maxLineWidth;
            }
          } else if (!useMultilineMainText) {
            ctx.font = `900 ${mainFontSize}px serif`;
            const mainTextWidth = ctx.measureText(mainText).width;
            
            if (mainTextWidth > maxWidth) {
              mainScaleFactor = maxWidth / mainTextWidth;
            }
          }

          // Test sub text independently - only if not using multiline
          if (subText && !useMultilineSubText) {
            ctx.font = `italic ${subFontSize}px serif`;
            const subTextWidth = ctx.measureText(subText).width;
            
            if (subTextWidth > maxWidth) {
              subScaleFactor = maxWidth / subTextWidth;
            }
          }

          // Apply independent scale factors
          if (mainScaleFactor < 1.0) {
            mainFontSize *= mainScaleFactor;
          }
          if (subScaleFactor < 1.0) {
            subFontSize *= subScaleFactor;
          }
        }

        // Main text with responsive sizing
        ctx.fillStyle = '#B6975C'; // Gold color
        ctx.font = `900 ${mainFontSize}px serif`;
        ctx.textAlign = 'center';
        ctx.letterSpacing = '2px';
        
        // Calculate total height including multiline text
        const mainTextHeight = useMultilineMainText ? (mainFontSize * 1.8) : mainFontSize;
        const subTextHeight = useMultilineSubText ? (subFontSize * 0.6 * 2.2) : (subText ? subFontSize * 0.6 : 0);
        const totalTextHeight = mainTextHeight + subTextHeight;
        const startY = y + (height - totalTextHeight) / 2;
        
        // Render main text with multiline support
        let mainY: number;
        if (useMultilineMainText && mainTextLines.length === 2) {
          // Two-line main text
          const lineSpacing = mainFontSize * 0.8;
          const firstLineY = startY + mainFontSize;
          const secondLineY = firstLineY + lineSpacing;
          
          ctx.fillText(mainTextLines[0], x + width/2, firstLineY);
          ctx.fillText(mainTextLines[1], x + width/2, secondLineY);
          
          // Update mainY for subtext positioning
          mainY = secondLineY;
        } else {
          // Single line main text
          mainY = startY + mainFontSize;
          ctx.fillText(mainText, x + width/2, mainY);
        }
        
        // Sub text with responsive sizing and multiline support
        if (subText) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `italic ${subFontSize}px serif`;
          ctx.letterSpacing = '2px';
          
          if (useMultilineSubText && subTextLines.length === 2) {
            // Render two lines
            const lineSpacing = subFontSize * 0.8;
            const firstLineY = mainY + (subFontSize * 0.6);
            const secondLineY = firstLineY + lineSpacing;
            
            ctx.fillText(subTextLines[0], x + width/2, firstLineY);
            ctx.fillText(subTextLines[1], x + width/2, secondLineY);
          } else {
            // Single line - DETTA ÄR DEN KRITISKA RADEN FÖR AVSTÅND
            const subY = mainY + (subFontSize * 0.6);
            ctx.fillText(subText, x + width/2, subY);
          }
        }
        
        ctx.restore();
      }
    };
    
    this.elements.push(element);
    return this;
  }
}

// Floater - canvas-wide fluid elements with bounding box
export interface FloaterProps {
  layer: number;
  size?: [number, number, number, number]; // [x1, y1, x2, y2] bounding box
  children: FloaterElement[];
}

export interface FloaterElement {
  type: 'background' | 'pattern' | 'overlay' | 'image' | 'text';
  props: any;
}

// Block - grid-positioned elements
export interface BlockProps {
  name: string;
  padding?: number;    // Override default padding
  children: LayerElement[];
}

export interface LayerElement {
  layer: number;
  type: 'background' | 'image' | 'text' | 'overlay';
  props: any;
}

// Specific floater element types
export interface BackgroundFloaterElement {
  type: 'background';
  subtype: 'color' | 'gradient' | 'image' | 'function';
  color?: string;
  gradient?: {
    angle?: number;
    stops: Array<{ offset: number; color: string }>;
  };
  imageSrc?: string;
  handler?: (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => Promise<void>;
  fallback?: string;
}

export interface PatternFloaterElement {
  type: 'pattern';
  text: string;
  opacity?: number;
  fontSize?: number;
  color?: string;
}

export interface OverlayFloaterElement {
  type: 'overlay';
  mainText: string;
  subText?: string;
  background?: string;
  responsive?: boolean;
  canvasWidth?: number;
}

// Block element types (same as before but cleaner)
export interface BackgroundElement {
  layer: number;
  type: 'background';
  color?: string;
  gradient?: {
    angle?: number;
    stops: Array<{ offset: number; color: string }>;
  };
}

export interface ImageElement {
  layer: number;
  type: 'image';
  src: string;
  fit?: 'cover' | 'contain' | 'fill';
  position?: 'center' | 'top' | 'bottom';
  offset?: { x?: number; y?: number }; // For logo offset support
  maxSize?: number; // Max ratio of container (e.g. 1/3)
}

export interface TextElement {
  layer: number;
  type: 'text';
  content: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  vertical?: boolean;
  multiline?: boolean;
}

export interface OverlayElement {
  layer: number;
  type: 'overlay';
  mainText: string;
  subText?: string;
  background?: string;
}

// Utility types
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GridArea {
  name: string;
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
}

// Layer rendering system
export interface LayerRenderer {
  layer: number;
  floaterElements: Array<{
    element: FloaterElement;
    bounds: BoundingBox;
  }>;
  blockElements: Array<{
    element: LayerElement;
    bounds: BoundingBox;
    padding: number;
  }>;
}
