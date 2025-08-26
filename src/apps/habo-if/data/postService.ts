import { supabase } from '../../../lib/utils/supabase';
import { 
  PostType, 
  ContentTemplate, 
  PostTypeLayout, 
  Match, 
  TrainingSession,
  GeneratedGraphic,
  CreatePostRequest,
  PostGenerationResult,
  PostGenerationContext
} from './types';
import { COLOR_THEMES } from '@/types';

export class PostService {
  // Get all active post types
  static async getPostTypes(): Promise<PostType[]> {
    const { data, error } = await supabase
      .from('post_types')
      .select('*')
      .eq('is_active', true)
      .order('display_name');

    if (error) throw error;
    return data || [];
  }

  // Get content templates for a post type
  static async getContentTemplates(postTypeId: string): Promise<ContentTemplate[]> {
    const { data, error } = await supabase
      .from('content_templates')
      .select(`
        *,
        post_type:post_types(*)
      `)
      .eq('post_type_id', postTypeId)
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  // Get default content template for a post type
  static async getDefaultContentTemplate(postTypeId: string): Promise<ContentTemplate | null> {
    const { data, error } = await supabase
      .from('content_templates')
      .select('*')
      .eq('post_type_id', postTypeId)
      .eq('is_default', true)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data;
  }

  // Get layouts for a post type
  static async getPostTypeLayouts(postTypeId: string): Promise<PostTypeLayout[]> {
    const { data, error } = await supabase
      .from('post_type_layouts')
      .select('*')
      .eq('post_type_id', postTypeId)
      .eq('is_active', true)
      .order('layout_name');

    if (error) throw error;
    return data || [];
  }

  // Get weighted random layout for post type
  static async getRandomLayout(postTypeId: string): Promise<PostTypeLayout | null> {
    const layouts = await this.getPostTypeLayouts(postTypeId);
    if (layouts.length === 0) return null;

    // Weighted random selection
    const totalWeight = layouts.reduce((sum, layout) => sum + layout.weight, 0);
    let random = Math.random() * totalWeight;

    for (const layout of layouts) {
      random -= layout.weight;
      if (random <= 0) {
        return layout;
      }
    }

    return layouts[0]; // Fallback
  }

  // Get upcoming matches
  static async getUpcomingMatches(limit: number = 10): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('status', 'upcoming')
      .gte('match_date', new Date().toISOString().split('T')[0])
      .order('match_date')
      .order('match_time')
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Get upcoming training sessions  
  static async getUpcomingTrainingSessions(limit: number = 10): Promise<TrainingSession[]> {
    const { data, error } = await supabase
      .from('training_sessions')
      .select('*')
      .eq('is_cancelled', false)
      .gte('session_date', new Date().toISOString().split('T')[0])
      .order('session_date')
      .order('session_time')
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Save generated graphic
  static async saveGeneratedGraphic(graphic: Partial<GeneratedGraphic>): Promise<GeneratedGraphic> {
    const { data, error } = await supabase
      .from('generated_graphics')
      .insert([graphic])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Build generation context
  static async buildGenerationContext(request: CreatePostRequest): Promise<PostGenerationContext> {
    // Get post type
    const { data: postType, error: postTypeError } = await supabase
      .from('post_types')
      .select('*')
      .eq('name', request.post_type)
      .eq('is_active', true)
      .single();

    if (postTypeError) throw new Error(`Post type '${request.post_type}' not found`);

    // Get content template
    let contentTemplate: ContentTemplate;
    if (request.content_template_id) {
      const { data, error } = await supabase
        .from('content_templates')
        .select('*')
        .eq('id', request.content_template_id)
        .single();
      
      if (error) throw error;
      contentTemplate = data;
    } else {
      const defaultTemplate = await this.getDefaultContentTemplate(postType.id);
      if (!defaultTemplate) {
        throw new Error(`No default content template found for post type '${request.post_type}'`);
      }
      contentTemplate = defaultTemplate;
    }

    // Apply custom content overrides
    if (request.custom_content) {
      contentTemplate = { ...contentTemplate, ...request.custom_content };
    }

    // Get random layout
    const layout = await this.getRandomLayout(postType.id);
    if (!layout) {
      throw new Error(`No layouts found for post type '${request.post_type}'`);
    }

    // Get random theme
    const theme = COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)];

    // Get related data
    let match: Match | undefined;
    let trainingSession: TrainingSession | undefined;

    if (request.match_id) {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('id', request.match_id)
        .single();
      
      if (error) throw error;
      match = data;
    }

    if (request.training_session_id) {
      const { data, error } = await supabase
        .from('training_sessions')
        .select('*')
        .eq('id', request.training_session_id)
        .single();
      
      if (error) throw error;
      trainingSession = data;
    }

    return {
      post_type: postType,
      content_template: contentTemplate,
      layout,
      theme,
      match,
      training_session: trainingSession,
      custom_content: request.custom_content
    };
  }

  // Generate post with context
  static async generatePost(
    canvas: HTMLCanvasElement, 
    request: CreatePostRequest
  ): Promise<PostGenerationResult> {
    try {
      const context = await this.buildGenerationContext(request);
      
      // Import the NEW generation function dynamically to avoid circular deps
      const { generatePostWithContext, generateRandomVisibility } = await import('./postGenerator');
      
      // Generate random visibility options for variation
      const visibilityOptions = generateRandomVisibility(context.post_type);
      
      const imageData = await generatePostWithContext(canvas, context, visibilityOptions);

      // Save to database
      const graphic = await this.saveGeneratedGraphic({
        post_type_id: context.post_type.id,
        player_id: null, // Skip player_id for now since we don't have UUID players yet
        content_template_id: context.content_template.id,
        layout_name: context.layout.layout_name,
        theme_name: context.theme.name,
        image_data: imageData,
        match_id: request.match_id,
        training_session_id: request.training_session_id
      });

      return {
        success: true,
        graphic,
        image_data: imageData
      };

    } catch (error) {
      console.error('Failed to generate post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Quick methods for common post types
  static async generateMatchdayPost(canvas: HTMLCanvasElement, matchId?: string, playerId?: string) {
    return this.generatePost(canvas, {
      post_type: 'matchday',
      match_id: matchId,
      player_id: playerId
    });
  }

  static async generateTrainingPost(canvas: HTMLCanvasElement, trainingSessionId?: string, playerId?: string) {
    return this.generatePost(canvas, {
      post_type: 'training',
      training_session_id: trainingSessionId,
      player_id: playerId
    });
  }

  static async generatePlayerSpotlightPost(canvas: HTMLCanvasElement, playerId: string) {
    return this.generatePost(canvas, {
      post_type: 'player_spotlight',
      player_id: playerId
    });
  }
}