import { Team, Player } from '@/types';

/**
 * Mock data for development and testing
 * This should eventually be replaced with real database data
 */

export const MOCK_TEAM: Team = {
  id: 'habo-if-team-1',
  name: 'Habo IF',
    updated_at: '2024-01-01T00:00:00Z'
};

export const MOCK_PLAYERS: Player[] = [
  {
    id: 'player-1',
    team_id: 'habo-if-team-1',
    name: 'Marcus Eriksson',
    position: 'Mittfältare',
    jersey_number: 10,
    number: 10,
            createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 'player-2',
    team_id: 'habo-if-team-1',
    name: 'Erik Andersson',
    position: 'Forward',
    jersey_number: 9,
    number: 9,
            createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 'player-3',
    team_id: 'habo-if-team-1',
    name: 'Johan Karlsson',
    position: 'Försvarare',
    jersey_number: 4,
    number: 4,
            createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 'player-4',
    team_id: 'habo-if-team-1',
    name: 'Alexander Berg',
    position: 'Målvakt',
    jersey_number: 1,
    number: 1,
            createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 'player-5',
    team_id: 'habo-if-team-1',
    name: 'Gustav Lindqvist',
    position: 'Mittfältare',
    jersey_number: 8,
    number: 8,
            createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  }
];