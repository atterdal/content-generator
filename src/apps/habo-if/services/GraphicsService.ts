import { createGenericCanvas } from '@/lib/graphics-engine/Canvas';
import { ColorTheme, COLOR_THEMES } from '@/types';
import { ALL_LAYOUTS } from '@/lib/graphics-engine/layouts';
import { Block, Floater } from '@/lib/graphics-engine/types';
import {
  createHaboBeigeBlock,
  createHaboGradientBlock,
  createRandomPlayerBlock,
  createHaboLogoBlock,
  createHaboTextPattern,
  createMatchOverlay,
  createPlayerSpotlightOverlay,
  createTrainingOverlay,
  createHaboMainHeader
} from '@/apps/habo-if/components/HaboComponents';

export interface GraphicsGenerationOptions {
  templateType: string;
  teamName: string;
  layoutIndex?: number;
  themeIndex?: number;
  includeWatermark?: boolean;
  mainText?: string;
  subText?: string;
  data?: any; // Template-specific data
}

export interface GeneratedGraphic {
  canvas: HTMLCanvasElement;
  dataURL: string;
  blob: Blob;
}

export class GraphicsService {
  private static readonly BACKGROUND_ELEMENTS = [
    '/images/elements/Edward3.jpg',
    '/images/elements/Robert1.jpg',
    '/images/elements/Edward-Movement.jpg',
    '/images/elements/Robert-Movement-wide.jpg',
    '/images/elements/Ester-Movement.jpg'
  ];

  /**
   * Generate a single graphic based on provided options
   */
  static async generateGraphic(options: GraphicsGenerationOptions): Promise<GeneratedGraphic> {
    const {
      templateType,
      teamName,
      layoutIndex = 0,
      themeIndex = 0,
      includeWatermark = true,
      mainText = '',
      subText = '',
      data
    } = options;

    // Get layout and theme
    const layout = ALL_LAYOUTS[layoutIndex % ALL_LAYOUTS.length];
    const theme = COLOR_THEMES[themeIndex % COLOR_THEMES.length];

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;

    // Create generic canvas using graphics engine
    const genericCanvas = createGenericCanvas(canvas, layout, theme);

    // Layer 0: Background floater
    await this.addBackgroundLayer(genericCanvas, theme);

    // Layer 1: Color blocks based on layout
    this.addColorBlocks(genericCanvas, layout, theme);

    // Layer 2: Pattern floater (watermark)
    if (includeWatermark) {
      this.addWatermarkLayer(genericCanvas, teamName, theme);
    }

    // Layer 3: Hero block
    this.addHeroBlock(genericCanvas, layout, theme);

    // Layer 4: Logo block
    this.addLogoBlock(genericCanvas, layout, theme);

    // Layer 5: Content overlay based on template type
    this.addContentOverlay(genericCanvas, templateType, mainText, subText, theme, data);

    // Render all layers
    await genericCanvas.renderAll();

    // Generate blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png');
    });

    return {
      canvas,
      dataURL: canvas.toDataURL('image/png'),
      blob
    };
  }

  /**
   * Generate multiple graphics with different layouts/themes
   */
  static async generateBatchGraphics(
    baseOptions: Omit<GraphicsGenerationOptions, 'layoutIndex' | 'themeIndex'>,
    items: any[],
    getContentForItem?: (item: any, index: number) => { mainText: string; subText: string; data?: any }
  ): Promise<{ graphic: GeneratedGraphic; filename: string; item: any }[]> {
    const results: { graphic: GeneratedGraphic; filename: string; item: any }[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const layoutIndex = i % ALL_LAYOUTS.length;
      const themeIndex = i % COLOR_THEMES.length;

      let content = { mainText: '', subText: '', data: item };
      if (getContentForItem) {
        content = getContentForItem(item, i);
      } else {
        content = this.getDefaultContentForTemplate(baseOptions.templateType, item, i);
      }

      const options: GraphicsGenerationOptions = {
        ...baseOptions,
        layoutIndex,
        themeIndex,
        mainText: content.mainText,
        subText: content.subText,
        data: content.data
      };

      const graphic = await this.generateGraphic(options);
      const filename = this.generateFilename(baseOptions.templateType, baseOptions.teamName, item, i);

      results.push({ graphic, filename, item });
    }

    return results;
  }

  private static async addBackgroundLayer(genericCanvas: any, theme: ColorTheme): Promise<void> {
    const backgroundFloater = new Floater(0);
    backgroundFloater.addBackground(async (ctx: any, bounds: any) => {
      const selectedBg = this.BACKGROUND_ELEMENTS[Math.floor(Math.random() * this.BACKGROUND_ELEMENTS.length)];

      return new Promise<void>((resolve) => {
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
    });
    genericCanvas.addFloater(backgroundFloater);
  }

  private static addColorBlocks(genericCanvas: any, layout: string, theme: ColorTheme): void {
    if (layout.includes('beige')) {
      const beigeBlock = createHaboBeigeBlock('beige', 1, theme);
      genericCanvas.addBlock(beigeBlock);
    }
    if (layout.includes('blue')) {
      const blueBlock = createHaboGradientBlock('blue', 1, theme);
      genericCanvas.addBlock(blueBlock);
    }
    if (layout.includes('graphic')) {
      const graphicBlock = createHaboGradientBlock('graphic', 1, theme, { intensity: 'strong' });
      genericCanvas.addBlock(graphicBlock);
    }
    if (layout.includes('logo')) {
      const logoBackgroundBlock = createHaboBeigeBlock('logo', 1, theme);
      genericCanvas.addBlock(logoBackgroundBlock);
    }
  }

  private static addWatermarkLayer(genericCanvas: any, teamName: string, theme: ColorTheme): void {
    const textPattern = createHaboTextPattern(2, teamName.toUpperCase(), theme);
    genericCanvas.addFloater(textPattern);
  }

  private static addHeroBlock(genericCanvas: any, layout: string, theme: ColorTheme): void {
    if (layout.includes('hero')) {
      const heroBlock = createRandomPlayerBlock('hero', 3, theme);
      genericCanvas.addBlock(heroBlock);
    }
  }

  private static addLogoBlock(genericCanvas: any, layout: string, theme: ColorTheme): void {
    if (layout.includes('logo')) {
      const logoBlock = createHaboLogoBlock('logo', theme, { withBackground: false });
      genericCanvas.addBlock(logoBlock);
    }
  }

  private static addContentOverlay(
    genericCanvas: any,
    templateType: string,
    mainText: string,
    subText: string,
    theme: ColorTheme,
    data?: any
  ): void {
    let overlayComponent: Floater;

    switch (templateType) {
      case 'matchday':
        overlayComponent = createMatchOverlay(5, mainText, subText, theme, 1080);
        break;
      case 'player':
      case 'goal-scorer':
      case 'player-of-match':
        overlayComponent = createPlayerSpotlightOverlay(5, mainText, subText, theme, 1080);
        break;
      case 'training':
        overlayComponent = createTrainingOverlay(5, mainText, subText, theme, 1080);
        break;
      default:
        overlayComponent = createHaboMainHeader(5, mainText, subText, theme, 1080);
    }

    genericCanvas.addFloater(overlayComponent);
  }

  private static getDefaultContentForTemplate(templateType: string, item: any, index: number): { mainText: string; subText: string; data: any } {
    switch (templateType) {
      case 'matchday':
        return {
          mainText: item.opponent || 'MOTSTÅNDARE',
          subText: item.date && item.time ? `${item.date} • ${item.time}` : 'MATCHDAG',
          data: item
        };
      case 'goal-scorer':
        return {
          mainText: item.name || 'SPELARNAMN',
          subText: `MÅLSKYTT #${item.number || '?'}`,
          data: item
        };
      case 'player-of-match':
        return {
          mainText: item.name || 'SPELARNAMN',
          subText: `MATCHENS LIRARE • ${item.position || 'POSITION'}`,
          data: item
        };
      default:
        return {
          mainText: item.name || item.title || 'TITEL',
          subText: item.subtitle || item.description || '',
          data: item
        };
    }
  }

  private static generateFilename(templateType: string, teamName: string, item: any, index: number): string {
    const safeTeamName = teamName.replace(/[^a-zA-Z0-9]/g, '-');
    
    switch (templateType) {
      case 'matchday':
        const opponent = item.opponent?.replace(/[^a-zA-Z0-9]/g, '-') || 'opponent';
        return `matchday-${opponent}-${item.date || index}.png`;
      case 'goal-scorer':
        const scorerName = item.name?.replace(/[^a-zA-Z0-9]/g, '-') || `player-${index}`;
        return `goal-scorer-${scorerName}.png`;
      case 'player-of-match':
        const playerName = item.name?.replace(/[^a-zA-Z0-9]/g, '-') || `player-${index}`;
        return `player-of-match-${playerName}.png`;
      default:
        return `${safeTeamName}-${templateType}-${index + 1}.png`;
    }
  }
}