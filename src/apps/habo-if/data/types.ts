// Database types for post system

export interface PostType {
  id: string;
  name: string;
  display_name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentTemplate {
  id: string;
  post_type_id: string;
  name: string;
  primary_text?: string;
  secondary_text?: string;
  vertical_text?: string;
  overlay_main_text?: string;
  overlay_sub_text?: string;
  pattern_text?: string;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  post_type?: PostType; // Joined data
}

export interface PostTypeLayout {
  id: string;
  post_type_id: string;
  layout_name: string;
  css_grid_template: string;
  weight: number;
  is_active: boolean;
  created_at: string;
  post_type?: PostType; // Joined data
}

export interface Match {
  id: string;
  opponent: string;
  match_date: string; // Date string
  match_time: string; // Time string
  venue: 'home' | 'away';
  competition: string;
  status: 'upcoming' | 'live' | 'finished';
  home_score?: number;
  away_score?: number;
  created_at: string;
  updated_at: string;
}

export interface TrainingSession {
  id: string;
  session_date: string; // Date string
  session_time: string; // Time string
  session_type: string;
  location?: string;
  notes?: string;
  is_cancelled: boolean;
  created_at: string;
  updated_at: string;
}

export interface GeneratedGraphic {
  id: string;
  post_type_id?: string;
  player_id?: string;
  content_template_id?: string;
  layout_name?: string;
  theme_name?: string;
  image_data?: string;
  match_id?: string;
  training_session_id?: string;
  generated_at: string;
  // Joined data
  post_type?: PostType;
  content_template?: ContentTemplate;
  match?: Match;
  training_session?: TrainingSession;
}

// API request/response types
export interface CreatePostRequest {
  post_type: string; // post type name
  player_id?: string;
  match_id?: string;
  training_session_id?: string;
  content_template_id?: string; // Optional, will use default if not provided
  custom_content?: Partial<ContentTemplate>; // Override template content
}

export interface PostGenerationResult {
  success: boolean;
  graphic?: GeneratedGraphic;
  image_data?: string;
  error?: string;
}

// Content generation context
export interface PostGenerationContext {
  post_type: PostType;
  content_template: ContentTemplate;
  layout: PostTypeLayout;
  theme: any; // ColorTheme from existing types
  player?: any; // Player from existing types  
  match?: Match;
  training_session?: TrainingSession;
  custom_content?: Partial<ContentTemplate>;
}