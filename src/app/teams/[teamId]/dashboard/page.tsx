'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Link
} from '@heroui/react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

// Mock player data - replace with database later
const TEAM_PLAYERS = {
  'p15': [
    { id: 1, name: 'Oliver Andersson', number: 7, position: 'Anfallare', image: '/images/elements/Edward3.jpg' },
    { id: 2, name: 'William Karlsson', number: 10, position: 'Mittfältare', image: '/images/elements/Robert1.jpg' },
    { id: 3, name: 'Lucas Eriksson', number: 3, position: 'Försvarare', image: '/images/elements/Robert-Movement-wide.jpg' },
    { id: 4, name: 'Noah Johansson', number: 1, position: 'Målvakt', image: '/images/elements/Edward3.jpg' },
    { id: 5, name: 'Liam Pettersson', number: 9, position: 'Anfallare', image: '/images/elements/Robert1.jpg' }
  ],
  'f15': [
    { id: 1, name: 'Emma Andersson', number: 8, position: 'Mittfältare', image: '/images/elements/Ester-Movement.jpg' },
    { id: 2, name: 'Ella Nilsson', number: 11, position: 'Anfallare', image: '/images/elements/Ester-Movement.jpg' },
    { id: 3, name: 'Maja Svensson', number: 4, position: 'Försvarare', image: '/images/elements/Ester-Movement.jpg' },
    { id: 4, name: 'Alice Larsson', number: 1, position: 'Målvakt', image: '/images/elements/Ester-Movement.jpg' },
    { id: 5, name: 'Olivia Berg', number: 7, position: 'Anfallare', image: '/images/elements/Ester-Movement.jpg' }
  ],
  'p13': [
    { id: 1, name: 'Alexander Holm', number: 5, position: 'Mittfältare', image: '/images/elements/Robert1.jpg' },
    { id: 2, name: 'Hugo Lindqvist', number: 14, position: 'Anfallare', image: '/images/elements/Edward3.jpg' },
    { id: 3, name: 'Elias Gustafsson', number: 2, position: 'Försvarare', image: '/images/elements/Robert-Movement-wide.jpg' },
    { id: 4, name: 'Leo Magnusson', number: 1, position: 'Målvakt', image: '/images/elements/Edward3.jpg' }
  ],
  'f13': [
    { id: 1, name: 'Wilma Olsson', number: 6, position: 'Mittfältare', image: '/images/elements/Ester-Movement.jpg' },
    { id: 2, name: 'Astrid Persson', number: 10, position: 'Anfallare', image: '/images/elements/Ester-Movement.jpg' },
    { id: 3, name: 'Ebba Lindberg', number: 3, position: 'Försvarare', image: '/images/elements/Ester-Movement.jpg' }
  ],
  'herr-a': [
    { id: 1, name: 'Marcus Andersson', number: 9, position: 'Anfallare', image: '/images/elements/Robert1.jpg' },
    { id: 2, name: 'Johan Eriksson', number: 8, position: 'Mittfältare', image: '/images/elements/Edward3.jpg' },
    { id: 3, name: 'Daniel Larsson', number: 4, position: 'Försvarare', image: '/images/elements/Robert-Movement-wide.jpg' },
    { id: 4, name: 'Andreas Nilsson', number: 1, position: 'Målvakt', image: '/images/elements/Edward3.jpg' }
  ],
  'dam-a': [
    { id: 1, name: 'Sofia Johansson', number: 11, position: 'Anfallare', image: '/images/elements/Ester-Movement.jpg' },
    { id: 2, name: 'Sara Lindqvist', number: 7, position: 'Mittfältare', image: '/images/elements/Ester-Movement.jpg' },
    { id: 3, name: 'Anna Bergström', number: 5, position: 'Försvarare', image: '/images/elements/Ester-Movement.jpg' }
  ]
};

const POST_TEMPLATES = [
  { id: 'matchday', name: 'Matchdag', icon: '⚽', description: 'Annonsera kommande match' },
  { id: 'result', name: 'Resultat', icon: '🏆', description: 'Dela matchresultat' },
  { id: 'training', name: 'Träning', icon: '💪', description: 'Information om träning' },
  { id: 'player', name: 'Spelarfokus', icon: '⭐', description: 'Lyfta fram en spelare' },
  { id: 'event', name: 'Event', icon: '📅', description: 'Annonsera laghändelser' },
  { id: 'news', name: 'Nyheter', icon: '📰', description: 'Dela lagnyheter' }
];

export default function TeamDashboardPage() {
  const brand = HABO_IF_BRAND;
  const router = useRouter();
  const params = useParams();
  const teamId = params?.teamId as string;
  
  const [teamData, setTeamData] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState('posts');

  useEffect(() => {
    // Check authentication
    const authData = sessionStorage.getItem('teamAuth');
    if (!authData) {
      router.push('/teams/login');
      return;
    }

    const auth = JSON.parse(authData);
    if (auth.teamId !== teamId) {
      router.push('/teams/login');
      return;
    }

    setTeamData(auth);
  }, [teamId, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('teamAuth');
    router.push('/teams/login');
  };

  const handleCreatePost = (templateId: string, playerId?: number) => {
    // Navigate to post creator with template and optional player
    const query = playerId ? `?template=${templateId}&player=${playerId}` : `?template=${templateId}`;
    router.push(`/teams/${teamId}/create${query}`);
  };

  if (!teamData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Laddar...</div>
      </div>
    );
  }

  const players = TEAM_PLAYERS[teamId as keyof typeof TEAM_PLAYERS] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <img 
                src="/images/logos/habo-if-2025.png" 
                alt="Habo IF"
                className="h-8 object-contain"
              />
              <div>
                <h1 
                  className="text-xl font-black uppercase tracking-wider"
                  style={{ 
                    color: brand.colors.royalBlue,
                    fontFamily: brand.typography.primary.fontFamily
                  }}
                >
                  {teamData.teamName} DASHBOARD
                </h1>
                <p className="text-xs text-gray-600">Skapa grafik för sociala medier</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                as={Link}
                href={`/teams/${teamId}/manage`}
                className="font-bold text-white"
                style={{ backgroundColor: brand.colors.royalBlue }}
                size="sm"
              >
                Hantera Lag
              </Button>
              <Button
                as={Link}
                href="/brand-guidelines"
                variant="flat"
                size="sm"
              >
                Brand Guidelines
              </Button>
              <Button
                onClick={handleLogout}
                variant="bordered"
                size="sm"
                className="text-red-600 border-red-600"
              >
                Logga ut
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Välkommen till {teamData.teamName} Dashboard! 👋
              </h2>
              <p className="text-gray-700">
                Här kan du snabbt skapa professionell grafik för sociala medier. 
                Välj en mall nedan eller lyft fram en specifik spelare.
              </p>
            </CardBody>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs 
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
          className="mb-8"
        >
          <Tab key="posts" title="Skapa Inlägg">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {POST_TEMPLATES.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card 
                    isHoverable
                    className="border border-gray-200 hover:shadow-lg transition-all"
                  >
                    <CardBody className="p-6">
                      <div className="text-4xl mb-4">{template.icon}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {template.description}
                      </p>
                      <Button
                        size="sm"
                        className="w-full font-bold text-white"
                        style={{ backgroundColor: brand.colors.royalBlue }}
                        onClick={() => handleCreatePost(template.id)}
                      >
                        Skapa {template.name}
                      </Button>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Tab>

          <Tab key="players" title={`Spelare (${players.length})`}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="border border-gray-200 hover:shadow-lg transition-all">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar
                          src={player.image}
                          size="lg"
                          className="w-20 h-20"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">
                            {player.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Chip size="sm" variant="flat" color="primary">
                              #{player.number}
                            </Chip>
                            <Chip size="sm" variant="flat">
                              {player.position}
                            </Chip>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="solid"
                          className="flex-1 text-white"
                          style={{ backgroundColor: brand.colors.royalBlue }}
                          onClick={() => handleCreatePost('player', player.id)}
                        >
                          Spelarfokus
                        </Button>
                        <Button
                          size="sm"
                          variant="bordered"
                          className="flex-1"
                          onClick={() => handleCreatePost('matchday', player.id)}
                        >
                          Matchdag
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Tab>

          <Tab key="recent" title="Senaste">
            <Card className="mt-6">
              <CardBody className="p-12 text-center">
                <div className="text-6xl mb-4 text-gray-300">📋</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Inga tidigare inlägg
                </h3>
                <p className="text-gray-500">
                  Dina skapade inlägg kommer visas här
                </p>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mt-8"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardBody className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {players.length}
              </div>
              <p className="text-sm text-gray-600">Spelare i truppen</p>
            </CardBody>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardBody className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {POST_TEMPLATES.length}
              </div>
              <p className="text-sm text-gray-600">Tillgängliga mallar</p>
            </CardBody>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardBody className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                ∞
              </div>
              <p className="text-sm text-gray-600">Möjligheter</p>
            </CardBody>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}