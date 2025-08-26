import { PostService } from '../data/postService';
import { PostGenerationContext } from '../data/types';
import { generatePostWithContext, getAllVisibleOptions } from '../data/postGenerator';
import {
  exportLayerByLayer,
  groupContentByLayer,
  CanvasOptions,
  LayerExportOptions as GenericLayerExportOptions
} from '../../../lib/graphics-engine/layerExporter';
import { 
  generateExploded3DView, 
  generateExploded3DViewWithGrid,
  Exploded3DOptions,
  LayerContent 
} from '../../../lib/graphics-engine/exploded3d';
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
  createRandomPlayerBlock
} from '../components/HaboComponents';
import { Block, Floater } from '../../../lib/graphics-engine/types';
import { ColorTheme } from '@/types';
import { HABO_IF_BRAND } from '../config/brand';

// Habo-specific post types
export type PostTypeName = 'matchday' | 'training' | 'player_spotlight';

// Habo-specific layer export options
export interface HaboLayerExportOptions {
  postType?: PostTypeName;
  layoutId?: string; // Specific layout ID from database
  themeIndex?: number; // Which theme from COLOR_THEMES
  matchId?: string; // For matchday posts
  trainingSessionId?: string; // For training posts
  playerId?: string; // For player spotlight posts
  // Deterministic options (no randomness in core logic)
  showPattern?: boolean; // Control pattern floater visibility
  showOverlay?: boolean; // Control overlay visibility
  showLogo?: boolean; // Control logo visibility
}

// Use PostService for all data fetching (centralized)
export async function getAvailableLayouts(postTypeName: PostTypeName) {
  const postTypes = await PostService.getPostTypes();
  const postType = postTypes.find(pt => pt.name === postTypeName);
  if (!postType) return [];

  return await PostService.getPostTypeLayouts(postType.id);
}

export function getAvailablePostTypes(): PostTypeName[] {
  return ['matchday', 'training', 'player_spotlight'];
}

// Generate Habo-specific layer content for export
export async function generateHaboLayerContent(
  options: HaboLayerExportOptions = {}
): Promise<{
  layersContent: { blocks: Block[]; floaters: Floater[] }[];
  context: PostGenerationContext;
  theme: ColorTheme;
}> {
  const {
    postType = 'matchday',
    layoutId,
    themeIndex = 0,
    matchId,
    trainingSessionId,
    playerId,
    showPattern = true,
    showOverlay = true,
    showLogo = true
  } = options;

  // Build the same generation context as PostService.generatePost()
  const context = await buildGenerationContext({
    postType,
    layoutId,
    themeIndex,
    matchId,
    trainingSessionId,
    playerId
  });

  console.log('Generating Habo layer content with context:', {
    postType: context.post_type.name,
    layoutName: context.layout.layout_name,
    themeName: context.theme.name,
    deterministic: { showPattern, showOverlay, showLogo }
  });

  // Build dynamic content from context
  const dynamicContent = buildDynamicContentFromContext(context);

  // Create all blocks and floaters
  const blocks: Block[] = [];
  const floaters: Floater[] = [];

  // Layer 0: Background floater
  const backgroundFloater = new Floater(0);
  backgroundFloater.addBackground(async (ctx: any, bounds: any) => {
    await randomBackgroundHandler(ctx, bounds, context.theme);
  });
  floaters.push(backgroundFloater);

  // Layer 1: Color blocks
  if (context.layout.css_grid_template.includes('beige')) {
    const beigeBlock = createHaboBeigeBlock('beige', 1, context.theme);
    blocks.push(beigeBlock);
  }
  if (context.layout.css_grid_template.includes('blue')) {
    const blueBlock = createHaboGradientBlock('blue', 1, context.theme);
    blocks.push(blueBlock);
  }
  if (context.layout.css_grid_template.includes('graphic')) {
    const graphicBlock = createHaboGradientBlock('graphic', 1, context.theme, { intensity: 'strong' });
    blocks.push(graphicBlock);
  }
  // Logo background (if logo should be visible)
  if (context.layout.css_grid_template.includes('logo') && showLogo) {
    const logoBackgroundBlock = createHaboBeigeBlock('logo', 1, context.theme);
    blocks.push(logoBackgroundBlock);
  }

  // Layer 2: Pattern floater (if visible)
  if (showPattern) {
    const textPattern = createHaboTextPattern(2, dynamicContent.textPattern, context.theme);
    floaters.push(textPattern);
  }

  // Layer 3: Hero block
  if (context.layout.css_grid_template.includes('hero')) {
    const heroBlock = createRandomPlayerBlock('hero', 3, context.theme);
    blocks.push(heroBlock);
  }

  // Layer 4: Text and logos
  if (context.layout.css_grid_template.includes('logo') && showLogo) {
    // Only add logo image, background was added in layer 1
    const logoBlock = createHaboLogoBlock('logo', context.theme, { withBackground: false });
    blocks.push(logoBlock);
  }
  if (context.layout.css_grid_template.includes('bluetext')) {
    const blueTextBlock = createHaboSecondarySectionHeader('bluetext', dynamicContent.secondarySectionHeader, 4, context.theme);
    blocks.push(blueTextBlock);
  }
  if (context.layout.css_grid_template.includes('beige')) {
    const headlineBlock = createHaboSectionHeader('beige', dynamicContent.sectionHeader, 4, context.theme, {
      size: 'large',
      multiline: true
    });
    blocks.push(headlineBlock);
  }

  // Layer 5: Overlay (if visible)
  if (showOverlay) {
    let overlayComponent: Floater;

    switch (context.post_type.name) {
      case 'matchday':
        overlayComponent = createMatchOverlay(5, dynamicContent.mainHeader, dynamicContent.subHeader, context.theme, 1080);
        break;
      case 'player_spotlight':
        overlayComponent = createPlayerSpotlightOverlay(5, dynamicContent.mainHeader, dynamicContent.subHeader, context.theme, 1080);
        break;
      case 'training':
        overlayComponent = createTrainingOverlay(5, dynamicContent.mainHeader, dynamicContent.subHeader, context.theme, 1080);
        break;
      default:
        overlayComponent = createHaboMainHeader(5, dynamicContent.mainHeader, dynamicContent.subHeader, context.theme, 1080);
    }

    floaters.push(overlayComponent);
  }

  // Group content by layer
  const layersContent = groupContentByLayer(blocks, floaters);

  return { layersContent, context, theme: context.theme };
}

// Export Habo layer examples using the generic layer exporter
export async function exportHaboLayerExamples(
  canvas: HTMLCanvasElement,
  options: HaboLayerExportOptions = {}
): Promise<Record<string, string>> {
  const { canvas: canvasOptions = { width: 1080, height: 1080, dpi: 72 } } = options as any;

  // Generate Habo-specific content
  const { layersContent, context, theme } = await generateHaboLayerContent(options);

  // Use the generic layer exporter
  return await exportLayerByLayer(canvas, layersContent, {
    canvas: canvasOptions,
    theme,
    layout: context.layout.css_grid_template
  });
}

// Build generation context using the same logic as PostService.buildGenerationContext
async function buildGenerationContext(options: {
  postType: PostTypeName;
  layoutId?: string;
  themeIndex?: number;
  matchId?: string;
  trainingSessionId?: string;
  playerId?: string;
}): Promise<PostGenerationContext> {
  const postTypes = await PostService.getPostTypes();
  const postType = postTypes.find(pt => pt.name === options.postType);
  if (!postType) {
    throw new Error(`Post type '${options.postType}' not found`);
  }

  const contentTemplate = await PostService.getDefaultContentTemplate(postType.id);
  if (!contentTemplate) {
    throw new Error(`No default content template found for post type '${options.postType}'`);
  }

  let layout;
  if (options.layoutId) {
    const layouts = await PostService.getPostTypeLayouts(postType.id);
    layout = layouts.find(l => l.id === options.layoutId);
    if (!layout) {
      throw new Error(`Layout with ID '${options.layoutId}' not found`);
    }
  } else {
    layout = await PostService.getRandomLayout(postType.id);
    if (!layout) {
      throw new Error(`No layouts found for post type '${options.postType}'`);
    }
  }

  const { COLOR_THEMES } = await import('@/types');
  const theme = COLOR_THEMES[options.themeIndex || 0];

  return {
    post_type: postType,
    content_template: contentTemplate,
    layout,
    theme,
    match: undefined, // TODO: Load if matchId provided
    training_session: undefined, // TODO: Load if trainingSessionId provided
    custom_content: undefined
  };
}

// Helper functions needed by the layer system
function buildDynamicContentFromContext(context: PostGenerationContext) {
  const { content_template, match, training_session, post_type } = context;

  const baseContent = {
    sectionHeader: content_template.primary_text || HABO_IF_BRAND.defaultTexts.sectionHeader,
    secondarySectionHeader: content_template.secondary_text || HABO_IF_BRAND.defaultTexts.secondarySectionHeader,
    textPattern: content_template.vertical_text || HABO_IF_BRAND.defaultTexts.textPattern,
    mainHeader: content_template.overlay_main_text || HABO_IF_BRAND.defaultTexts.mainHeader,
    subHeader: content_template.overlay_sub_text || HABO_IF_BRAND.defaultTexts.subHeader
  };

  // Add match-specific content
  if (match) {
    return {
      ...baseContent,
      sectionHeader: HABO_IF_BRAND.postTypeTexts.matchday.sectionHeader,
      mainHeader: match.opponent || 'MATCH',
      subHeader: match.match_time ? new Date(match.match_time).toLocaleDateString('sv-SE') : 'IDAG'
    };
  }

  // Add training-specific content
  if (training_session) {
    return {
      ...baseContent,
      sectionHeader: HABO_IF_BRAND.postTypeTexts.training.sectionHeader,
      mainHeader: HABO_IF_BRAND.postTypeTexts.training.sectionHeader,
      subHeader: training_session.session_time ? new Date(training_session.session_time).toLocaleDateString('sv-SE') : 'IDAG'
    };
  }

  // Player spotlight content
  if (post_type.name === 'player_spotlight') {
    return {
      ...baseContent,
      sectionHeader: 'MÅNADENS SPELARE',
      secondarySectionHeader: 'MITTFÄLTARE',
      mainHeader: 'MARCUS',
      subHeader: 'ERIKSSON'
    };
  }

  return baseContent;
}

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

// Generate exploded layer view without grid overlay - uses core 3D functions
export async function generateExplodedLayerView(
  canvas: HTMLCanvasElement,
  options: HaboLayerExportOptions & { canvas?: CanvasOptions } = {}
): Promise<Record<string, string>> {
  const { canvas: canvasOptions = { width: 1080, height: 1080, dpi: 72 } } = options;

  // Generate Habo-specific content
  const { layersContent, context, theme } = await generateHaboLayerContent(options);

  // Use the generic 3D exploded view function
  const exploded3DOptions: Exploded3DOptions = {
    canvas: canvasOptions,
    theme,
    layout: context.layout.css_grid_template
  };

  const explodedImageData = await generateExploded3DView(canvas, layersContent, exploded3DOptions);

  // Return single exploded view image
  return {
    'exploded-view-3d': explodedImageData
  };
}

// Generate exploded layer view with grid overlay - uses core 3D functions
export async function generateExplodedLayerViewWithGrid(
  canvas: HTMLCanvasElement,
  options: HaboLayerExportOptions & { canvas?: CanvasOptions } = {}
): Promise<Record<string, string>> {
  const { canvas: canvasOptions = { width: 1080, height: 1080, dpi: 72 } } = options;

  // Generate Habo-specific content
  const { layersContent, context, theme } = await generateHaboLayerContent(options);

  // Use the generic 3D exploded view function with grid
  const exploded3DOptions: Exploded3DOptions = {
    canvas: canvasOptions,
    theme,
    layout: context.layout.css_grid_template
  };

  const explodedImageData = await generateExploded3DViewWithGrid(canvas, layersContent, exploded3DOptions);

  // Return single exploded view image with grid
  return {
    'exploded-view-3d-with-grid': explodedImageData
  };
}

