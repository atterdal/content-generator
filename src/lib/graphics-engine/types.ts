import { ColorTheme } from '@/types';

// Canvas configuration
export interface CanvasProps {
  width: number;
  height: number;
  rows: number;
  columns: number;
  gap?: number;        // Space between grid cells
  padding?: number;    // Default padding inside blocks
  layout: string;      // CSS Grid template
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
  maxWidth?: number;  // Max width in percentage of bounds (e.g., 80 = 80% of bounds width)
  lineWrap?: boolean | number; // true = unlimited lines, number = max lines, false = no wrap, -1 = unlimited
  maxScale?: number; // Max scale factor before wrapping (default: 0.8 = 80% of original size)
  canvasWidth?: number; // Canvas width for responsive sizing
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
    maxWidth?: number;  // Max width in percentage of bounds (e.g., 80 = 80% of bounds width)
    lineWrap?: boolean | number; // true = unlimited lines, number = max lines, false = no wrap, -1 = unlimited
    maxScale?: number; // Max scale factor before wrapping (default: 0.8 = 80% of original size)
    canvasWidth?: number; // Canvas width for responsive sizing
    offset?: { top?: number; bottom?: number; left?: number; right?: number };
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
      textTransform: options.textTransform || 'none',
      maxWidth: options.maxWidth,
      lineWrap: options.lineWrap,
      maxScale: options.maxScale || 0.8,
      canvasWidth: options.canvasWidth,
      render: async (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => {
        ctx.save();
        
        // Apply offset to bounds if specified
        let renderBounds = bounds;
        if (options.offset) {
          renderBounds = {
            x: bounds.x + (options.offset.left || 0),
            y: bounds.y + (options.offset.top || 0),
            width: bounds.width - (options.offset.left || 0) - (options.offset.right || 0),
            height: bounds.height - (options.offset.top || 0) - (options.offset.bottom || 0)
          };
        }
        
        let fontSize = options.fontSize || 18;
        const fontFamily = options.fontFamily || 'serif';
        const color = options.color || '#000000';
        const align = options.align || 'center';
        
        // Apply text transform
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

        // NEW: Smart text sizing and wrapping logic
        let lines: string[] = [transformedContent];
        
        if (options.maxWidth || options.lineWrap) {
          const maxScale = options.maxScale || 0.8;
          const maxWidthPx = (options.maxWidth ? (renderBounds.width * (options.maxWidth / 100)) : renderBounds.width * 0.9);
          
          ctx.font = `900 ${fontSize}px ${fontFamily}`;
          const textWidth = ctx.measureText(transformedContent).width;
          
          let scaleFactor = 1;
          
          if (textWidth > maxWidthPx) {
            // Calculate required scale factor
            const requiredScale = maxWidthPx / textWidth;
            
            // Check if we should try line wrapping before scaling too much
            if (requiredScale < maxScale && options.lineWrap && transformedContent.includes(' ')) {
              // Try line wrapping
              const words = transformedContent.split(' ');
              const maxLines = typeof options.lineWrap === 'number' 
                ? (options.lineWrap === -1 ? Infinity : options.lineWrap) 
                : Infinity;
              
              lines = [];
              let currentLine = '';
              
              for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word;
                const testWidth = ctx.measureText(testLine).width;
                
                if (testWidth <= maxWidthPx || currentLine === '') {
                  currentLine = testLine;
                } else {
                  if (lines.length < maxLines - 1) {
                    lines.push(currentLine);
                    currentLine = word;
                  } else {
                    // Last allowed line, add remaining words
                    currentLine = testLine;
                    break;
                  }
                }
              }
              
              if (currentLine) {
                lines.push(currentLine);
              }
              
              // Check if we still need to scale after wrapping
              const maxLineWidth = Math.max(...lines.map(line => ctx.measureText(line).width));
              if (maxLineWidth > maxWidthPx) {
                scaleFactor = maxWidthPx / maxLineWidth;
                fontSize *= scaleFactor;
              }
            } else {
              // Scale without wrapping
              scaleFactor = requiredScale;
              fontSize *= scaleFactor;
            }
          }
        }
        
        // Handle italic styling
        const isItalic = fontFamily.includes('italic');
        const cleanFontFamily = fontFamily.replace('italic ', '');
        
        ctx.font = `${isItalic ? 'italic ' : ''}900 ${fontSize}px ${cleanFontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        
        if (options.vertical) {
          // Vertical text rendering
          ctx.translate(bounds.x + bounds.width/2, bounds.y + bounds.height/2);
          ctx.rotate(-Math.PI/2);
          ctx.fillText(transformedContent, 0, 0);
        } else {
          // Horizontal text rendering
          if (lines.length > 1) {
            // Multi-line rendering
            const lineHeight = fontSize * 1.2;
            const totalHeight = lineHeight * (lines.length - 1) + fontSize;
            const startY = renderBounds.y + (renderBounds.height - totalHeight) / 2 + fontSize;
            
            lines.forEach((line, index) => {
              const textX = align === 'left' ? renderBounds.x : 
                          align === 'right' ? renderBounds.x + renderBounds.width :
                          renderBounds.x + renderBounds.width / 2;
              const textY = startY + index * lineHeight;
              ctx.fillText(line, textX, textY);
            });
          } else {
            // Single line rendering
            const textX = align === 'left' ? renderBounds.x : 
                         align === 'right' ? renderBounds.x + renderBounds.width :
                         renderBounds.x + renderBounds.width / 2;
            const textY = renderBounds.y + renderBounds.height/2 + fontSize/3;
            ctx.fillText(transformedContent, textX, textY);
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

  addText(content: string, layer: number, options: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    align?: 'left' | 'center' | 'right';
    vertical?: boolean;
    multiline?: boolean;
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
    maxWidth?: number;
    lineWrap?: boolean | number;
    maxScale?: number;
    canvasWidth?: number;
    offset?: { top?: number; bottom?: number; left?: number; right?: number };
  } = {}): Floater {
    // Use the same addText logic as Block but for floater
    const textBlock = new Block('temp');
    textBlock.addText(content, layer, options);
    
    // Add the text element to this floater
    this.elements.push(textBlock.elements[0]);
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
  padding?: number;    // Override default padding
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