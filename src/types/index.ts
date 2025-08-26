export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  manager_id: string;
  created_at: string;
}

export interface Player {
  id: string;
  team_id: string;
  name: string;
  jersey_number?: number;
  position?: string;
  image_url?: string;
  birth_date?: string;
  created_at: string;
}

export interface GeneratedImage {
  id: string;
  team_id: string;
  template_type: string;
  image_url: string;
  created_by: string;
  created_at: string;
}

export interface LayoutBlock {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'beige-text' | 'blue-texture' | 'player-image' | 'vertical-text' | 'primary-logo' | 'blue-text' | 'white-logo' | 'graphic-element' | 'dual-player' | 'text-overlay' | 'atmosphere' | 'centered-logo' | 'transparent-window' | 'transparent-text-graphic';
}

export interface ColorTheme {
  name: 'classic' | 'deep' | 'bright';
  beige: string;
  blue: string;
  blueLight: string;
  gold: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    name: 'classic',
    beige: '#f0ede6',
    blue: '#0629A0', // Royal Blue (Gradient Start)
    blueLight: '#0629A0', // Gradient End (samma som Royal Blue)
    gold: '#B6975C' // Heritage Gold
  },
  {
    name: 'deep',
    beige: '#f0ede6',
    blue: '#0629A0', // Gradient End (Royal Blue)
    blueLight: '#062940', // Blue Void (mörkare) - för Gradient Dark
    gold: '#B6975C' // Heritage Gold
  },
  {
    name: 'bright',
    beige: '#f0ede6',
    blue: '#0629A0', // Royal Blue
    blueLight: '#0629A0', // Samma
    gold: '#B6975C' // Heritage Gold
  }
];

export const GRID_CONFIG = {
  cols: 4,
  rows: 6,
  canvasWidth: 1080,
  canvasHeight: 1080,
  cellWidth: 270,
  cellHeight: 180
};

export const HERO_BLOCK = {
  width: 2,
  height: 4,
  pixelWidth: 540,
  pixelHeight: 720
};

// === PLAYER & TEAM DATA ===

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  age?: number;
  profileImage?: string;
  stats?: PlayerStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayerStats {
  goals: number;
  assists: number;
  matches: number;
  yellowCards: number;
  redCards: number;
}

export interface Team {
  id: string;
  name: string;
  coach: string;
  players: Player[];
  season: string;
}

export interface GeneratedGraphic {
  id: string;
  playerId: string;
  imageData: string; // base64 image data
  layout: LayoutBlock[];
  theme: ColorTheme;
  generatedAt: Date;
}