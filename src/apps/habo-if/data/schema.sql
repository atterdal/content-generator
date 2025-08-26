-- Post Types and Content Templates Schema for Habo IF Graphics

-- Post types (matchday, training, result, news, etc.)
CREATE TABLE post_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content templates for different post types
CREATE TABLE content_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_type_id UUID REFERENCES post_types(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  primary_text VARCHAR(200),
  secondary_text VARCHAR(200),
  vertical_text VARCHAR(100),
  overlay_main_text VARCHAR(100),
  overlay_sub_text VARCHAR(100),
  pattern_text VARCHAR(200) DEFAULT 'HABO IDROTTSFÖRENING ',
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Layouts associated with post types
CREATE TABLE post_type_layouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_type_id UUID REFERENCES post_types(id) ON DELETE CASCADE,
  layout_name VARCHAR(50) NOT NULL,
  css_grid_template TEXT NOT NULL,
  weight INTEGER DEFAULT 1, -- For weighted random selection
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Match data for matchday posts
CREATE TABLE matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  opponent VARCHAR(100) NOT NULL,
  match_date DATE NOT NULL,
  match_time TIME NOT NULL,
  venue VARCHAR(10) CHECK (venue IN ('home', 'away')) NOT NULL,
  competition VARCHAR(100) DEFAULT 'Svenska Cupen',
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'finished')),
  home_score INTEGER,
  away_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training sessions for training posts
CREATE TABLE training_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_date DATE NOT NULL,
  session_time TIME NOT NULL,
  session_type VARCHAR(50) DEFAULT 'Träning',
  location VARCHAR(100),
  notes TEXT,
  is_cancelled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated graphics tracking
CREATE TABLE generated_graphics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_type_id UUID REFERENCES post_types(id),
  player_id UUID, -- References existing players table if it exists
  content_template_id UUID REFERENCES content_templates(id),
  layout_name VARCHAR(50),
  theme_name VARCHAR(50),
  image_data TEXT, -- Base64 or URL
  match_id UUID REFERENCES matches(id),
  training_session_id UUID REFERENCES training_sessions(id),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default post types
INSERT INTO post_types (name, display_name, description) VALUES
('matchday', 'Matchdag', 'Grafik för kommande matcher'),
('training', 'Träning', 'Grafik för träningssessioner'),
('result', 'Resultat', 'Grafik för matchresultat'),
('news', 'Nyheter', 'Allmänna nyheter och meddelanden'),
('player_spotlight', 'Spelarbelysnng', 'Fokus på individuella spelare');

-- Insert default content templates
INSERT INTO content_templates (post_type_id, name, primary_text, secondary_text, vertical_text, overlay_main_text, overlay_sub_text, is_default) VALUES
-- Matchday templates
((SELECT id FROM post_types WHERE name = 'matchday'), 'Hemmamatch', 'MATCHDAG IDAG', 'HEMMAMATCH 15:00', 'HABO IF FOTBOLL', 'MATCHDAG', 'Svenska Cupen', true),
((SELECT id FROM post_types WHERE name = 'matchday'), 'Bortamatch', 'MATCHDAG IDAG', 'BORTAMATCH 15:00', 'HABO IF FOTBOLL', 'BORTAMATCH', 'Svenska Cupen', false),
((SELECT id FROM post_types WHERE name = 'matchday'), 'Derby', 'DERBYMATCH', 'LÖRDAG 15:00', 'HABO IF FOTBOLL', 'DERBY', 'Lokalderby', false),

-- Training templates  
((SELECT id FROM post_types WHERE name = 'training'), 'Veckotränng', 'TRÄNING IMORGON', 'MÅNDAG 19:00', 'HABO IF FOTBOLL', 'TRÄNING', 'Veckoträning', true),
((SELECT id FROM post_types WHERE name = 'training'), 'Extratränng', 'EXTRATRÄNING', 'FREDAG 18:00', 'HABO IF FOTBOLL', 'TRÄNING', 'Inför match', false),

-- Result templates
((SELECT id FROM post_types WHERE name = 'result'), 'Vinst', 'FULLTIID!', 'VI VANN 3-1', 'HABO IF FOTBOLL', 'VINST', 'Tre poäng!', true),
((SELECT id FROM post_types WHERE name = 'result'), 'Förlust', 'FULLTIID', 'FÖRLUST 1-2', 'HABO IF FOTBOLL', 'MATCH SLUT', 'Nästa gång!', false),

-- News templates
((SELECT id FROM post_types WHERE name = 'news'), 'Allmän', 'VIKTIGT MEDDELANDE', 'LÄS MER PÅ HEMSIDAN', 'HABO IF FOTBOLL', 'NYHETER', 'Habo IF', true),

-- Player spotlight templates
((SELECT id FROM post_types WHERE name = 'player_spotlight'), 'Målskytt', 'MÅNADENS SPELARE', 'GRATTIS!', 'HABO IF FOTBOLL', 'UTMÄRKELSE', 'Bra jobbat!', true);

-- Insert default layouts for each post type
INSERT INTO post_type_layouts (post_type_id, layout_name, css_grid_template, weight) VALUES
-- Matchday layouts (all 6 layouts work for matches)
((SELECT id FROM post_types WHERE name = 'matchday'), 'hero_left', '"beige beige trans trans" "hero hero trans trans" "hero hero trans trans" "hero hero blue vert" "hero hero blue vert" "logo trans blue vert"', 2),
((SELECT id FROM post_types WHERE name = 'matchday'), 'hero_central', '"beige beige beige beige" "blue hero hero logo" "blue hero hero trans" "blue hero hero trans" "blue hero hero trans" "bluetext bluetext bluetext bluetext"', 3),
((SELECT id FROM post_types WHERE name = 'matchday'), 'hero_right', '"blue blue graphic graphic" "blue blue hero hero" "vert logo hero hero" "vert blue hero hero" "vert blue hero hero" "blue blue blue blue"', 2),

-- Training layouts (subset focused on info)
((SELECT id FROM post_types WHERE name = 'training'), 'hero_central_vertical', '"bluetext bluetext bluetext bluetext" "vert hero hero blue" "vert hero hero blue" "vert hero hero blue" "vert hero hero blue" "logo logo logo blue"', 3),
((SELECT id FROM post_types WHERE name = 'training'), 'hero_upper_left', '"hero hero beige beige" "hero hero vert trans" "hero hero vert trans" "hero hero vert trans" "logo logo trans trans" "trans trans trans trans"', 2),

-- Player spotlight layouts (hero-focused)  
((SELECT id FROM post_types WHERE name = 'player_spotlight'), 'hero_central', '"beige beige beige beige" "blue hero hero logo" "blue hero hero trans" "blue hero hero trans" "blue hero hero trans" "bluetext bluetext bluetext bluetext"', 4),
((SELECT id FROM post_types WHERE name = 'player_spotlight'), 'hero_left', '"beige beige trans trans" "hero hero trans trans" "hero hero trans trans" "hero hero blue vert" "hero hero blue vert" "logo trans blue vert"', 3);

-- Add indexes for performance
CREATE INDEX idx_content_templates_post_type ON content_templates(post_type_id);
CREATE INDEX idx_post_type_layouts_post_type ON post_type_layouts(post_type_id);
CREATE INDEX idx_generated_graphics_post_type ON generated_graphics(post_type_id);
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_training_sessions_date ON training_sessions(session_date);