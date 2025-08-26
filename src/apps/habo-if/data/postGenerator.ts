import { createGenericCanvas } from '../../../lib/graphics-engine/Canvas';
import { PostGenerationContext } from './types';
import { 
  createHaboMainHeader,
  createMatchOverlay,
  createPlayerSpotlightOverlay,
  createTrainingOverlay,
  createHaboLogoBlock,
  createHaboSectionHeader,
  createHaboTextPattern,
  createHaboSecondarySectionHeader,
  createHaboGradientBlock,
  createHaboBeigeBlock,
  createRandomPlayerBlock,
  Floater
} from '../components/HaboComponents';

interface VisibilityOptions {
  textPattern: boolean;
  logo: boolean;
  verticalText: boolean;
  blueText: boolean;
  beigeText: boolean;
  overlay: boolean;
}

/**
 * NEW COMPONENT-BASED POST GENERATOR
 * Uses the generic canvas system and Habo IF components
 */
export async function generatePostWithContext(
  canvas: HTMLCanvasElement, 
  context: PostGenerationContext,
  visibilityOptions?: VisibilityOptions
): Promise<string> {
  const { content_template, layout, theme, match, training_session, post_type } = context;

  // Build dynamic content from context
  const dynamicContent = buildDynamicContent(context);

  // Convert database CSS grid format to Canvas-expected format  
  const formattedLayout = layout.css_grid_template
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

  // Use provided visibility options or generate defaults
  const visibility = visibilityOptions || generateDefaultVisibility(post_type);

  // Create canvas using new generic system
  const genericCanvas = createGenericCanvas(canvas, formattedLayout, theme);

  // ==================================================================
  // COMPONENT-BASED GENERATION - Much cleaner!
  // ==================================================================

  // Layer 0: Background floater (always visible)
  const backgroundFloater = genericCanvas.createFloater(0);
  backgroundFloater.addBackground(async (ctx, bounds) => {
    await randomBackgroundHandler(ctx, bounds, theme);
  });

  // Layer 1: Grid-based color blocks using components
  if (layout.css_grid_template.includes('beige')) {
    const beigeBlock = createHaboBeigeBlock('beige', 1, theme);
    genericCanvas.addBlock(beigeBlock);
  }
  
  if (layout.css_grid_template.includes('blue')) {
    const blueBlock = createHaboGradientBlock('blue', 1, theme);
    genericCanvas.addBlock(blueBlock);
  }
  
  if (layout.css_grid_template.includes('graphic')) {
    const graphicBlock = createHaboGradientBlock('graphic', 1, theme, { 
      intensity: 'strong' 
    });
    genericCanvas.addBlock(graphicBlock);
  }

  // Logo background (if logo should be visible)
  if (layout.css_grid_template.includes('logo') && visibility.logo) {
    const logoBackgroundBlock = createHaboBeigeBlock('logo', 1, theme);
    genericCanvas.addBlock(logoBackgroundBlock);
  }

  // Layer 2: Pattern floater moved to later in the code with new component system

  // Layer 3: Hero block using component
  if (layout.css_grid_template.includes('hero')) {
    const heroBlock = createRandomPlayerBlock('hero', 3, theme);
    genericCanvas.addBlock(heroBlock);
  }

  // Layer 4: Text and logos using components  
  if (layout.css_grid_template.includes('logo') && visibility.logo) {
    // Only add logo image, background was added in layer 1
    const logoBlock = createHaboLogoBlock('logo', theme, { withBackground: false });
    genericCanvas.addBlock(logoBlock);
  }
  
  if (visibility.textPattern) {
    const textPattern = createHaboTextPattern(2, dynamicContent.textPattern, theme);
    genericCanvas.addFloater(textPattern);
  }
  
  if (layout.css_grid_template.includes('bluetext') && visibility.blueText) {
    const blueTextBlock = createHaboSecondarySectionHeader('bluetext', dynamicContent.secondarySectionHeader, 4, theme);
    genericCanvas.addBlock(blueTextBlock);
  }
  
  if (layout.css_grid_template.includes('beige') && visibility.beigeText) {
    const headlineBlock = createHaboSectionHeader('beige', dynamicContent.sectionHeader, 4, theme, {
      size: 'large',
      multiline: true
    });
    genericCanvas.addBlock(headlineBlock);
  }

  // Layer 5: Overlay using specific component based on post type
  if (visibility.overlay) {
    let overlayComponent: any;
    
    switch (post_type.name) {
      case 'matchday':
        overlayComponent = createMatchOverlay(5, dynamicContent.mainHeader, dynamicContent.subHeader, theme, canvas.width);
        break;
      case 'player_spotlight':
        overlayComponent = createPlayerSpotlightOverlay(5, dynamicContent.mainHeader, dynamicContent.subHeader, theme, canvas.width);
        break;
      case 'training':
        overlayComponent = createTrainingOverlay(5, dynamicContent.mainHeader, dynamicContent.subHeader, theme, canvas.width);
        break;
      default:
        overlayComponent = createHaboMainHeader(5, dynamicContent.mainHeader, dynamicContent.subHeader, theme, canvas.width);
    }
    
    genericCanvas.addFloater(overlayComponent);
  }

  // Render all and return
  await genericCanvas.renderAll();
  return genericCanvas.toDataURL('image/png');
}

// Helper function for random background (same as old system)
async function randomBackgroundHandler(ctx: CanvasRenderingContext2D, bounds: any, theme: any): Promise<void> {
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
      ctx.fillStyle = `${theme.blue}70`;
      ctx.fillRect(0, 0, bounds.width, bounds.height);
      
      resolve();
    };
    
    img.onerror = () => {
      // Fallback gradient
      const gradient = ctx.createLinearGradient(0, 0, bounds.width * 0.8, bounds.height * 0.8);
      gradient.addColorStop(0, theme.blue);
      gradient.addColorStop(1, theme.blueLight || theme.blue);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, bounds.width, bounds.height);
      resolve();
    };
    
    img.src = selectedBg;
  });
}

// Build dynamic content from context (same as old system)
function buildDynamicContent(context: PostGenerationContext) {
  const { content_template, match, training_session, post_type } = context;
  
  const baseContent = {
    sectionHeader: content_template.primary_text || 'HABO IF',
    secondarySectionHeader: content_template.secondary_text || 'FOTBOLL',
    textPattern: content_template.vertical_text || 'HABO IF FOTBOLL',
    mainHeader: content_template.overlay_main_text || 'HABO IF',
    subHeader: content_template.overlay_sub_text || 'FOTBOLL'
  };

  // Add match-specific content
  if (match) {
    return {
      ...baseContent,
      sectionHeader: 'MATCHDAG',
      mainHeader: 'MATCHDAG',
      subHeader: match.opponent || 'MATCH'
    };
  }
  
  // Add training-specific content
  if (training_session) {
    return {
      ...baseContent,
      sectionHeader: 'TRÄNING',
      mainHeader: 'TRÄNING',
      subHeader: training_session.session_time ? new Date(training_session.session_time).toLocaleDateString('sv-SE') : 'IDAG'
    };
  }
  
  // Player spotlight content (using mock data for now)
  if (post_type.name === 'player_spotlight') {
    return buildPlayerSpotlightContent(baseContent);
  }
  
  return baseContent;
}

// Player spotlight content (same as old system)
function buildPlayerSpotlightContent(content: any) {
  const players = [
    { firstName: 'Marcus', lastName: 'ERIKSSON', position: 'MITTFÄLTARE' },
    { firstName: 'Alexander', lastName: 'JOHANSSON', position: 'FORWARD' },
    { firstName: 'Erik', lastName: 'ANDERSSON', position: 'FÖRSVARARE' }
  ];

  const selectedPlayer = players[0]; // Deterministic selection
  
  return {
    ...content,
    sectionHeader: 'MÅNADENS SPELARE',
    secondarySectionHeader: selectedPlayer.position,
    mainHeader: capitalizeWords(selectedPlayer.firstName),
    subHeader: capitalizeWords(selectedPlayer.lastName)
  };
}

// Generate default visibility options (same as old system but moved out)
function generateDefaultVisibility(postType: any): VisibilityOptions {
  const probabilities = getVisibilityProbabilities(postType);
  
  return {
    textPattern: Math.random() < probabilities.textPattern,
    logo: Math.random() < probabilities.logo,
    verticalText: Math.random() < probabilities.verticalText,
    blueText: Math.random() < probabilities.blueText,
    beigeText: Math.random() < probabilities.beigeText,
    overlay: Math.random() < probabilities.overlay
  };
}

function getVisibilityProbabilities(postType: any) {
  switch (postType.name) {
    case 'player_spotlight':
      return {
        textPattern: 0.7,
        logo: 0.8,
        verticalText: 1.0,
        blueText: 1.0,
        beigeText: 1.0,
        overlay: 1.0
      };
      
    case 'matchday':
      return {
        textPattern: 0.5,
        logo: 0.6,
        verticalText: 0.8,
        blueText: 0.9,
        beigeText: 0.9,
        overlay: 0.6
      };
      
    case 'training':
      return {
        textPattern: 0.4,
        logo: 0.7,
        verticalText: 0.7,
        blueText: 0.8,
        beigeText: 0.8,
        overlay: 0.5
      };
      
    default:
      return {
        textPattern: 0.5,
        logo: 0.7,
        verticalText: 0.8,
        blueText: 0.8,
        beigeText: 0.8,
        overlay: 0.5
      };
  }
}

function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper functions for specific use cases
export function generateRandomVisibility(postType: any): VisibilityOptions {
  return generateDefaultVisibility(postType);
}

export function getAllVisibleOptions(): VisibilityOptions {
  return {
    textPattern: true,
    logo: true,
    verticalText: true,
    blueText: true,
    beigeText: true,
    overlay: true
  };
}

export { getVisibilityProbabilities };