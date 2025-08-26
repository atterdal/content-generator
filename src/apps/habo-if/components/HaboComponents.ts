import { Block, Floater, BoundingBox } from '../../../lib/graphics-engine/types';
import { ColorTheme } from '@/types';
import { HABO_IF_BRAND } from '../config/brand';

// Export for other modules
export { Block, Floater };
export type { BoundingBox };

/**
 * HABO IF Design System Components
 * 
 * Återanvändbara komponenter som följer den grafiska profilen.
 * Kan användas som byggstenar i olika sammanhang.
 */

// =====================================================================
// TEXT OVERLAY COMPONENTS
// =====================================================================

/**
 * Main header overlay - huvudrubrik i overlay  
 * Uses two addText calls on a floater for main and sub text
 */
export function createHaboMainHeader(
  layer: number,
  mainText: string,
  subText?: string,
  theme?: ColorTheme,
  canvasWidth: number = 1080,
  options: {
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
    subTextTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  } = {}
): Floater {
  const { textTransform = 'uppercase', subTextTransform = 'none' } = options;
  const overlay = new Floater(layer);

  // Calculate responsive font sizes based on canvas width
  const mainFontSize = canvasWidth * 0.12;
  const subFontSize = mainFontSize / 2;

  // Add main text
  overlay.addText(mainText, layer, {
    fontSize: mainFontSize,
    fontFamily: HABO_IF_BRAND.typography.primary.fontFamily,
    color: theme?.gold || HABO_IF_BRAND.colors.heritageGold,
    align: 'center',
    textTransform: textTransform,
    maxWidth: 90, // 90% of canvas width
    lineWrap: 2,  // Max 2 lines
    maxScale: 0.7, // Try line wrapping if scaling would go below 70%
    canvasWidth: canvasWidth
  });

  // Add sub text if provided
  if (subText) {
    overlay.addText(subText, layer, {
      fontSize: subFontSize,
      fontFamily: `italic ${HABO_IF_BRAND.typography.secondary.fontFamily}`, // Add italic style
      color: HABO_IF_BRAND.colors.pureWhite,
      align: 'center',
      textTransform: 'capitalize',
      maxWidth: 90, // 90% of canvas width
      lineWrap: 2,  // Max 2 lines
      canvasWidth: canvasWidth,
      offset: { top: mainFontSize * 0.8 } // Position below main text
    });
  }

  return overlay;
}

/**
 * Sub header overlay - underrubrik i overlay (alias för backwards compatibility)
 */
export function createHaboSubHeader(
  layer: number,
  mainText: string,
  subText?: string,
  theme?: ColorTheme,
  canvasWidth: number = 1080
): Floater {
  return createHaboMainHeader(layer, mainText, subText, theme, canvasWidth);
}

/**
 * Match overlay - specifik för matcher
 */
export function createMatchOverlay(
  layer: number,
  opponent: string,
  time: string,
  theme?: ColorTheme,
  canvasWidth: number = 1080
): Floater {
  return createHaboMainHeader(layer, opponent, `MATCH ${time}`, theme, canvasWidth);
}

/**
 * Player spotlight overlay - specifik för spelare
 */
export function createPlayerSpotlightOverlay(
  layer: number,
  playerName: string,
  position: string,
  theme?: ColorTheme,
  canvasWidth: number = 1080
): Floater {
  return createHaboMainHeader(layer, playerName, position, theme, canvasWidth);
}

/**
 * Training overlay - specifik för träningar
 */
export function createTrainingOverlay(
  layer: number,
  title: string,
  time: string,
  theme?: ColorTheme,
  canvasWidth: number = 1080
): Floater {
  return createHaboMainHeader(layer, title, `TRÄNING ${time}`, theme, canvasWidth);
}

// =====================================================================
// LOGO BLOCK COMPONENTS
// =====================================================================

/**
 * Standard Habo IF logo block - följer grafiska profilen
 */
export function createHaboLogoBlock(
  gridArea: string,
  theme: ColorTheme,
  options: {
    withBackground?: boolean;
    backgroundColor?: string;
    logoSize?: number;
    offset?: { x?: number; y?: number };
  } = {}
): Block {
  const {
    withBackground = true,
    backgroundColor = theme.beige,
    logoSize = 1/3,
    offset = { y: -0.02 }  // Match original Canvas.ts exactly
  } = options;

  const block = new Block(gridArea);

  // Lägg till bakgrund om specificerat
  if (withBackground) {
    block.addBackground(backgroundColor, 1);
  }

  // Lägg till Habo IF logo med EXAKT samma inställningar som gamla systemet
  block.addImage('/images/logos/habo-if-2025.png', 4, {
    fit: 'contain',
    maxSize: logoSize,
    offset: offset
  });

  return block;
}

/**
 * Small logo block - för mindre utrymmen
 */
export function createSmallLogoBlock(
  gridArea: string,
  theme: ColorTheme
): Block {
  return createHaboLogoBlock(gridArea, theme, {
    logoSize: 1/4,
    offset: { y: 0 }
  });
}

/**
 * Large logo block - för större utrymmen
 */
export function createLargeLogoBlock(
  gridArea: string,
  theme: ColorTheme
): Block {
  return createHaboLogoBlock(gridArea, theme, {
    logoSize: 1/2,
    offset: { y: -0.1 }
  });
}

// =====================================================================
// TEXT BLOCK COMPONENTS
// =====================================================================

/**
 * Section header - liten rubrik 1 för grid-områden
 */
export function createHaboSectionHeader(
  gridArea: string,
  text: string,
  layer: number,
  theme: ColorTheme,
  options: {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    multiline?: boolean;
  } = {}
): Block {
  const { size = 'medium', color = theme.gold, multiline = true } = options;

  const fontSizes = {
    small: 18,
    medium: 24,
    large: 32
  };

  const block = new Block(gridArea);
  
  block.addText(text, layer, {
    fontSize: fontSizes[size],
    color: color,
    fontFamily: HABO_IF_BRAND.typography.primary.fontFamily,
    multiline: multiline,
    align: 'center',
    textTransform: 'uppercase'
  });

  return block;
}

/**
 * Text pattern - repeterad text över hela canvas enligt Habo IF profilen
 * This is Habo IF specific and not a general pattern function
 */
export function createHaboTextPattern(
  layer: number,
  text: string,
  theme: ColorTheme
): Floater {
  const floater = new Floater(layer);
  
  // Add Habo IF specific pattern rendering
  const element = {
    type: 'pattern' as const,
    layer: layer,
    render: async (ctx: CanvasRenderingContext2D, bounds: BoundingBox) => {
      ctx.save();
      
      // Habo IF specific styling
      const fontSize = bounds.width * 0.18; // Responsive to canvas size
      const lineHeight = fontSize * 0.9;
      const opacity = 0.375; // Habo IF standard opacity
      
      ctx.font = `900 ${fontSize}px ${HABO_IF_BRAND.typography.primary.fontFamily}`;
      ctx.textAlign = 'left';
      
      // Use Habo IF gold color with transparency
      const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
      ctx.strokeStyle = `${theme.gold || '#CEA97C'}${opacityHex}`;
      ctx.lineWidth = Math.max(1, fontSize * 0.006);
      
      const textMetrics = ctx.measureText(text + ' ');
      const textWidth = textMetrics.width;
      
      const rows = Math.ceil(bounds.height / lineHeight) + 2;
      const cols = Math.ceil(bounds.width / textWidth) + 2;
      
      for (let row = 0; row < rows; row++) {
        // Offset up by half line height for partial top row
        const y = bounds.y + row * lineHeight + fontSize - (lineHeight * 0.5);
        // Brick pattern offset for alternating rows
        const offsetX = (row % 2) * (textWidth * 0.5);
        
        for (let col = 0; col < cols; col++) {
          const x = bounds.x + col * textWidth + offsetX - (textWidth * 0.5);
          ctx.strokeText(text + ' ', x, y);
        }
      }
      
      ctx.restore();
    }
  };
  
  floater.elements.push(element);
  return floater;
}

/**
 * Secondary section header - liten rubrik 2 för grid-områden
 */
export function createHaboSecondarySectionHeader(
  gridArea: string,
  text: string,
  layer: number,
  theme: ColorTheme,
  options: {
    color?: string;
    italic?: boolean;
  } = {}
): Block {
  const { color = HABO_IF_BRAND.colors.pureWhite, italic = false } = options;

  const block = new Block(gridArea);
  
  block.addText(text, layer, {
    fontSize: 18,
    color: color,
    fontFamily: italic ? HABO_IF_BRAND.typography.secondary.fontFamily : HABO_IF_BRAND.typography.primary.fontFamily,
    align: 'center'
  });

  return block;
}

// =====================================================================
// BACKGROUND COMPONENTS
// =====================================================================

/**
 * Standard Habo IF gradient - blå gradient enligt profilen
 */
export function createHaboGradientBlock(
  gridArea: string,
  layer: number,
  theme: ColorTheme,
  options: {
    angle?: number;
    intensity?: 'light' | 'normal' | 'strong';
  } = {}
): Block {
  const { angle = 50, intensity = 'normal' } = options;

  const intensityColors = {
    light: { start: theme.blueLight || theme.blue, end: theme.blue },
    normal: { start: theme.blue, end: theme.blueLight || theme.blue },
    strong: { start: theme.blue, end: '#041b70' }
  };

  const colors = intensityColors[intensity];
  
  const block = new Block(gridArea);
  
  block.addBackground({
    angle: angle,
    stops: [
      { offset: 0, color: colors.start },
      { offset: 1, color: colors.end }
    ]
  }, layer);

  return block;
}

/**
 * Beige block - standard beige färg enligt profilen
 */
export function createHaboBeigeBlock(
  gridArea: string,
  layer: number,
  theme: ColorTheme
): Block {
  const block = new Block(gridArea);
  block.addBackground(theme.beige, layer);
  return block;
}

// =====================================================================
// IMAGE COMPONENTS  
// =====================================================================

/**
 * Player hero block - spelarbild enligt profilen
 */
export function createHaboPlayerBlock(
  gridArea: string,
  playerImage: string,
  layer: number,
  theme: ColorTheme,
  options: {
    fallbackColor?: string;
    addOverlay?: boolean;
  } = {}
): Block {
  const { fallbackColor = '#041b70', addOverlay = false } = options;

  const block = new Block(gridArea);

  // Lägg till bakgrundsfärg som fallback
  block.addBackground(fallbackColor, 1);

  // Lägg till spelarbild
  block.addImage(playerImage, layer, { fit: 'cover' });

  // Lägg till overlay om specificerat
  if (addOverlay) {
    block.addBackground(`${theme.blue}30`, layer + 1);
  }

  return block;
}

/**
 * Random player block - väljer slumpmässig spelare
 */
export function createRandomPlayerBlock(
  gridArea: string,
  layer: number,
  theme: ColorTheme
): Block {
  const playerImages = [
    '/images/players/image.png',
    '/images/players/image1.png',
    '/images/players/image2.png', 
    '/images/players/image3.png'
  ];

  const selectedImage = playerImages[Math.floor(Math.random() * playerImages.length)];
  
  return createHaboPlayerBlock(gridArea, selectedImage, layer, theme);
}

// =====================================================================
// COMPOSITE COMPONENTS - sammansatta komponenter
// =====================================================================

/**
 * Complete match card - sammansatt komponent för matchinfo
 */
export function createMatchCard(
  blocks: {
    backgroundArea: string;
    textArea: string;
    logoArea: string;
  },
  matchInfo: {
    opponent: string;
    time: string;
    date: string;
  },
  theme: ColorTheme
): Block[] {
  return [
    // Bakgrund
    createHaboGradientBlock(blocks.backgroundArea, 1, theme),
    
    // Matchinfo text
    createHaboSectionHeader(blocks.textArea, matchInfo.opponent, 4, theme, { size: 'large' }),
    
    // Habo IF logo
    createHaboLogoBlock(blocks.logoArea, theme, { logoSize: 1/4 })
  ];
}

/**
 * Complete player spotlight card
 */
export function createPlayerSpotlightCard(
  blocks: {
    backgroundArea: string;
    playerArea: string;
    textArea: string;
    logoArea: string;
  },
  playerInfo: {
    name: string;
    position: string;
    image: string;
  },
  theme: ColorTheme
): Block[] {
  return [
    // Beige bakgrund för text
    createHaboBeigeBlock(blocks.backgroundArea, 1, theme),
    
    // Spelarbild
    createHaboPlayerBlock(blocks.playerArea, playerInfo.image, 3, theme),
    
    // Spelarinfo
    createHaboSectionHeader(blocks.textArea, 'MÅNADENS SPELARE', 4, theme),
    
    // Logo
    createSmallLogoBlock(blocks.logoArea, theme)
  ];
}

// =====================================================================
// UTILITY FUNCTIONS
// =====================================================================

/**
 * Hjälpfunktion för att lägga till flera komponenter till canvas
 */
export function addComponentsToCanvas(canvas: any, components: (Block | Floater)[]): void {
  components.forEach(component => {
    if (component instanceof Block) {
      canvas.addBlock(component);
    } else if (component instanceof Floater) {
      canvas.addFloater(component);
    }
  });
}

/**
 * Skapa standardkomponenter för en layout
 */
export function createStandardLayout(
  gridAreas: string[],
  theme: ColorTheme,
  options: {
    includePattern?: boolean;
    includeOverlay?: boolean;
    overlayText?: { main: string; sub?: string };
  } = {}
): (Block | Floater)[] {
  const components: (Block | Floater)[] = [];

  // Lägg till komponenter baserat på grid-områden
  gridAreas.forEach(area => {
    switch (area) {
      case 'logo':
        components.push(createHaboLogoBlock(area, theme));
        break;
      case 'beige':
        components.push(createHaboBeigeBlock(area, 1, theme));
        break;
      case 'blue':
      case 'graphic':
        components.push(createHaboGradientBlock(area, 1, theme));
        break;
      case 'hero':
        components.push(createRandomPlayerBlock(area, 3, theme));
        break;
    }
  });

  // Lägg till pattern om specificerat
  if (options.includePattern) {
    components.push(createHaboTextPattern(2, 'HABO IDROTTSFÖRENING ', theme));
  }

  // Lägg till overlay om specificerat
  if (options.includeOverlay && options.overlayText) {
    components.push(createHaboMainHeader(
      5, 
      options.overlayText.main,
      options.overlayText.sub,
      theme
    ));
  }

  return components;
}