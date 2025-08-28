// Post Types for Habo IF Graphics Generator
export interface PostType {
  id: string;
  name: string;
  description: string;
  category: 'match' | 'player' | 'team' | 'social' | 'training';
  bulkCapable: boolean;
  requiredFields: Field[];
  templates: Template[];
  icon: string; // Lucide icon name
}

export interface Field {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'time' | 'image' | 'textarea' | 'player-select' | 'multi-player-select';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: any;
}

export interface Template {
  id: string;
  name: string;
  layout: string;
  defaultColors: string[];
}

// Match-related Post Types
export const POST_TYPES: PostType[] = [
  {
    id: 'matchday',
    name: 'Matchdag',
    description: 'Annonsering för kommande match',
    category: 'match',
    bulkCapable: true, // Can bulk generate from match schedule
    icon: 'Calendar',
    requiredFields: [
      { id: 'opponent', label: 'Motståndare', type: 'text', required: true, placeholder: 'Ex: IFK Norrköping' },
      { id: 'date', label: 'Datum', type: 'date', required: true },
      { id: 'time', label: 'Tid', type: 'time', required: true, defaultValue: '14:00' },
      { id: 'venue', label: 'Arena', type: 'select', required: true, options: [
        { value: 'home', label: 'Hajmyren (Hemma)' },
        { value: 'away', label: 'Borta' }
      ]},
      { id: 'competition', label: 'Tävling', type: 'text', required: false, placeholder: 'Ex: Division 3' }
    ],
    templates: [
      { id: 'classic', name: 'Klassisk', layout: 'center', defaultColors: ['blue', 'white'] },
      { id: 'modern', name: 'Modern', layout: 'diagonal', defaultColors: ['gradient'] },
      { id: 'minimal', name: 'Minimalistisk', layout: 'bottom', defaultColors: ['blue'] }
    ]
  },
  {
    id: 'starting-xi',
    name: 'Startelva',
    description: 'Laguppställning för match',
    category: 'team',
    bulkCapable: false, // Requires manual input
    icon: 'Users',
    requiredFields: [
      { id: 'formation', label: 'Formation', type: 'select', required: true, options: [
        { value: '4-4-2', label: '4-4-2' },
        { value: '4-3-3', label: '4-3-3' },
        { value: '3-5-2', label: '3-5-2' },
        { value: '4-2-3-1', label: '4-2-3-1' }
      ]},
      { id: 'players', label: 'Spelare (11 st)', type: 'multi-player-select', required: true },
      { id: 'opponent', label: 'Mot', type: 'text', required: true, placeholder: 'Ex: IFK Norrköping' },
      { id: 'matchday', label: 'Matchdag', type: 'text', required: false, placeholder: 'Ex: Omgång 15' }
    ],
    templates: [
      { id: 'formation', name: 'Formation', layout: 'pitch', defaultColors: ['green', 'white'] },
      { id: 'list', name: 'Lista', layout: 'list', defaultColors: ['blue', 'gold'] },
      { id: 'cards', name: 'Kort', layout: 'cards', defaultColors: ['gradient'] }
    ]
  },
  {
    id: 'halftime-result',
    name: 'Halvtidsresultat',
    description: 'Resultat vid halvtid',
    category: 'match',
    bulkCapable: false, // Requires manual input
    icon: 'Clock',
    requiredFields: [
      { id: 'homeScore', label: 'Habo IF', type: 'number', required: true, defaultValue: 0 },
      { id: 'awayScore', label: 'Motståndare', type: 'number', required: true, defaultValue: 0 },
      { id: 'opponent', label: 'Motståndare', type: 'text', required: true },
      { id: 'scorers', label: 'Målskyttar', type: 'textarea', required: false, placeholder: 'Ex: 15\' Marcus Andersson' }
    ],
    templates: [
      { id: 'simple', name: 'Enkel', layout: 'center', defaultColors: ['blue'] },
      { id: 'detailed', name: 'Detaljerad', layout: 'split', defaultColors: ['blue', 'gold'] }
    ]
  },
  {
    id: 'fulltime-result',
    name: 'Slutresultat',
    description: 'Matchens slutresultat',
    category: 'match',
    bulkCapable: false, // Requires manual input
    icon: 'Trophy',
    requiredFields: [
      { id: 'homeScore', label: 'Habo IF', type: 'number', required: true, defaultValue: 0 },
      { id: 'awayScore', label: 'Motståndare', type: 'number', required: true, defaultValue: 0 },
      { id: 'opponent', label: 'Motståndare', type: 'text', required: true },
      { id: 'scorers', label: 'Målskyttar', type: 'textarea', required: false, placeholder: 'Ex: 15\' Marcus Andersson\n67\' Emma Nilsson' },
      { id: 'competition', label: 'Tävling', type: 'text', required: false }
    ],
    templates: [
      { id: 'victory', name: 'Seger', layout: 'celebration', defaultColors: ['gold', 'blue'] },
      { id: 'standard', name: 'Standard', layout: 'center', defaultColors: ['blue'] },
      { id: 'detailed', name: 'Detaljerad', layout: 'stats', defaultColors: ['gradient'] }
    ]
  },
  {
    id: 'goal-scorer',
    name: 'Målskytt',
    description: 'Hyllning till målskytt',
    category: 'player',
    bulkCapable: true, // Can bulk generate for all players
    icon: 'Target',
    requiredFields: [
      { id: 'player', label: 'Spelare', type: 'player-select', required: true },
      { id: 'goals', label: 'Antal mål', type: 'number', required: false, defaultValue: 1 },
      { id: 'minute', label: 'Matchminut', type: 'text', required: false, placeholder: 'Ex: 45\'+2' },
      { id: 'opponent', label: 'Mot', type: 'text', required: false }
    ],
    templates: [
      { id: 'hero', name: 'Hjälte', layout: 'spotlight', defaultColors: ['gold'] },
      { id: 'action', name: 'Action', layout: 'dynamic', defaultColors: ['gradient'] },
      { id: 'classic', name: 'Klassisk', layout: 'center', defaultColors: ['blue', 'white'] }
    ]
  },
  {
    id: 'player-of-match',
    name: 'Matchens Lirare',
    description: 'Utmärkelse för bästa spelaren',
    category: 'player',
    bulkCapable: true, // Can bulk generate for all players
    icon: 'Star',
    requiredFields: [
      { id: 'player', label: 'Spelare', type: 'player-select', required: true },
      { id: 'opponent', label: 'Mot', type: 'text', required: false },
      { id: 'stats', label: 'Statistik', type: 'textarea', required: false, placeholder: 'Ex: 2 mål, 1 assist' },
      { id: 'sponsor', label: 'Sponsor', type: 'text', required: false, placeholder: 'Ex: Presenteras av...' }
    ],
    templates: [
      { id: 'gold-star', name: 'Guldstjärna', layout: 'star', defaultColors: ['gold', 'blue'] },
      { id: 'spotlight', name: 'Rampljus', layout: 'spotlight', defaultColors: ['gradient'] },
      { id: 'stats', name: 'Med Statistik', layout: 'stats-overlay', defaultColors: ['blue'] }
    ]
  }
];

// Helper functions
export function getPostTypeById(id: string): PostType | undefined {
  return POST_TYPES.find(pt => pt.id === id);
}

export function getBulkCapablePostTypes(): PostType[] {
  return POST_TYPES.filter(pt => pt.bulkCapable);
}

export function getPostTypesByCategory(category: string): PostType[] {
  return POST_TYPES.filter(pt => pt.category === category);
}

// Mock players data (should be replaced with actual database)
export const MOCK_PLAYERS = [
  { id: '1', name: 'Marcus Andersson', number: 7, position: 'Anfallare' },
  { id: '2', name: 'Emma Nilsson', number: 10, position: 'Mittfältare' },
  { id: '3', name: 'Viktor Karlsson', number: 1, position: 'Målvakt' },
  { id: '4', name: 'Sofia Eriksson', number: 11, position: 'Anfallare' },
  { id: '5', name: 'Adam Johansson', number: 3, position: 'Försvarare' },
  { id: '6', name: 'Lisa Pettersson', number: 8, position: 'Mittfältare' },
  { id: '7', name: 'Oscar Lindqvist', number: 4, position: 'Försvarare' },
  { id: '8', name: 'Julia Svensson', number: 9, position: 'Anfallare' },
  { id: '9', name: 'Elias Berg', number: 6, position: 'Mittfältare' },
  { id: '10', name: 'Maja Olsson', number: 5, position: 'Försvarare' },
  { id: '11', name: 'Alexander Holm', number: 2, position: 'Försvarare' }
];

// Mock match schedule (should be replaced with actual database)
export const MOCK_MATCH_SCHEDULE = [
  {
    id: '1',
    date: '2024-02-10',
    time: '14:00',
    opponent: 'IFK Norrköping',
    venue: 'home',
    competition: 'Division 3'
  },
  {
    id: '2',
    date: '2024-02-17',
    time: '15:00',
    opponent: 'Mjölby IF',
    venue: 'away',
    competition: 'Division 3'
  },
  {
    id: '3',
    date: '2024-02-24',
    time: '14:00',
    opponent: 'Linköping City',
    venue: 'home',
    competition: 'Division 3'
  },
  {
    id: '4',
    date: '2024-03-02',
    time: '13:00',
    opponent: 'Motala AIF',
    venue: 'away',
    competition: 'Svenska Cupen'
  },
  {
    id: '5',
    date: '2024-03-09',
    time: '14:00',
    opponent: 'Åtvidaberg FF',
    venue: 'home',
    competition: 'Division 3'
  }
];