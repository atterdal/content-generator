'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Button,
  Badge,
  Avatar,
  Tabs,
  Title,
  Text,
  Group,
  Stack,
  SimpleGrid,
  Box,
  Anchor,
  Flex
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { 
  Calendar,
  Trophy,
  Dumbbell,
  Star,
  CalendarDays,
  Newspaper,
  Settings,
  FileText,
  LogOut,
  Users,
  Target,
  Infinity,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';
import { POST_TYPES, getPostTypeById } from '@/lib/post-types';

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

// Icon mapping for post types
const ICON_MAP: { [key: string]: any } = {
  'Calendar': Calendar,
  'Users': Users,
  'Clock': Clock,
  'Trophy': Trophy,
  'Target': Target,
  'Star': Star
};

// Convert POST_TYPES to dashboard template format
const POST_TEMPLATES = POST_TYPES.map(postType => ({
  id: postType.id,
  name: postType.name,
  icon: ICON_MAP[postType.icon] || Calendar,
  description: postType.description,
  bulkCapable: postType.bulkCapable,
  category: postType.category
}));

export default function TeamDashboardMantinePage() {
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
    notifications.show({
      title: 'Utloggad',
      message: 'Du har loggats ut',
      color: 'blue',
    });
    router.push('/teams/login');
  };

  const handleCreatePost = (templateId: string, playerId?: number) => {
    // Navigate to post creator with template and optional player
    const query = playerId ? `?template=${templateId}&player=${playerId}` : `?template=${templateId}`;
    router.push(`/teams/${teamId}/create${query}`);
  };

  if (!teamData) {
    return (
      <Container size="lg" py="xl">
        <Text ta="center" c="dimmed">Laddar...</Text>
      </Container>
    );
  }

  const players = TEAM_PLAYERS[teamId as keyof typeof TEAM_PLAYERS] || [];

  return (
    <Box bg="gray.0" mih="100vh">
      {/* Team Header */}
      <Container size="lg" py="md">
        <Paper p="lg" mb="xl">
          <Flex justify="space-between" align="center">
            <Box>
              <Title 
                order={2} 
                tt="uppercase" 
                c="blue.5"
                style={{ 
                  fontFamily: brand.typography.primary.fontFamily,
                  letterSpacing: '0.05em'
                }}
              >
                {teamData.teamName} DASHBOARD
              </Title>
              <Text size="sm" c="dimmed">Skapa grafik för sociala medier</Text>
            </Box>
            
            <Group>
              <Button
                component="a"
                href={`/teams/${teamId}/manage`}
                color="blue.5"
                leftSection={<Settings size={16} />}
                size="sm"
              >
                Hantera Lag
              </Button>
              <Button
                component="a"
                href={`/teams/${teamId}/bulk-generate`}
                variant="light"
                leftSection={<Target size={16} />}
                size="sm"
              >
                Batch-Generering
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                color="red"
                leftSection={<LogOut size={16} />}
                size="sm"
              >
                Logga ut
              </Button>
            </Group>
          </Flex>
        </Paper>
      </Container>

      {/* Main Content */}
      <Container size="lg" pb="xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper p="xl" mb="xl" bg="blue.0" style={{ border: '1px solid var(--mantine-color-blue-2)' }}>
            <Title order={3} mb="sm">
              Välkommen till {teamData.teamName} Dashboard!
            </Title>
            <Text c="dimmed">
              Här kan du snabbt skapa professionell grafik för sociala medier. 
              Välj en mall nedan eller lyft fram en specifik spelare.
            </Text>
          </Paper>
        </motion.div>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value || 'posts')} mb="xl">
          <Tabs.List>
            <Tabs.Tab value="posts">Skapa Inlägg</Tabs.Tab>
            <Tabs.Tab value="players" rightSection={<Badge size="sm">{players.length}</Badge>}>
              Spelare
            </Tabs.Tab>
            <Tabs.Tab value="recent">Senaste</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="posts" pt="md">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="md">
              {POST_TEMPLATES.map((template, index) => {
                const IconComponent = template.icon;
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Paper 
                      p="md"
                      style={{ 
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        ':hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 'var(--mantine-shadow-md)'
                        }
                      }}
                    >
                      <Group mb="md" justify="space-between">
                        <IconComponent size={32} color="var(--mantine-color-blue-5)" />
                        {template.bulkCapable && (
                          <Badge size="sm" color="green" variant="light">
                            Bulk
                          </Badge>
                        )}
                      </Group>
                      <Title order={4} mb="xs">
                        {template.name}
                      </Title>
                      <Text size="sm" c="dimmed" mb="md">
                        {template.description}
                      </Text>
                      <Stack gap="xs">
                        <Button
                          fullWidth
                          color="blue.5"
                          onClick={() => handleCreatePost(template.id)}
                        >
                          Skapa {template.name}
                        </Button>
                        {template.bulkCapable && (
                          <Button
                            fullWidth
                            variant="light"
                            color="green"
                            size="xs"
                            onClick={() => router.push(`/teams/${teamId}/bulk-generate?type=${template.id}`)}
                          >
                            Bulk-generera
                          </Button>
                        )}
                      </Stack>
                    </Paper>
                  </motion.div>
                );
              })}
            </SimpleGrid>
          </Tabs.Panel>

          <Tabs.Panel value="players" pt="md">
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Paper p="md">
                    <Group mb="md">
                      <Avatar
                        src={player.image}
                        size="lg"
                        radius="md"
                      />
                      <Box style={{ flex: 1 }}>
                        <Text fw={600}>
                          {player.name}
                        </Text>
                        <Group gap="xs" mt={4}>
                          <Badge size="sm" variant="light">
                            #{player.number}
                          </Badge>
                          <Badge size="sm" variant="outline">
                            {player.position}
                          </Badge>
                        </Group>
                      </Box>
                    </Group>
                    
                    <Group>
                      <Button
                        size="sm"
                        color="blue.5"
                        style={{ flex: 1 }}
                        onClick={() => handleCreatePost('player', player.id)}
                      >
                        Spelarfokus
                      </Button>
                      <Button
                        size="sm"
                        variant="light"
                        style={{ flex: 1 }}
                        onClick={() => handleCreatePost('matchday', player.id)}
                      >
                        Matchdag
                      </Button>
                    </Group>
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </Tabs.Panel>

          <Tabs.Panel value="recent" pt="md">
            <Paper p="xl" ta="center">
              <FileText size={64} color="var(--mantine-color-gray-4)" style={{ margin: '0 auto 1rem' }} />
              <Title order={4} c="dimmed" mb="sm">
                Inga tidigare inlägg
              </Title>
              <Text c="dimmed">
                Dina skapade inlägg kommer visas här
              </Text>
            </Paper>
          </Tabs.Panel>
        </Tabs>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
            <Paper p="md" ta="center" bg="blue.0">
              <Group justify="center" mb="xs">
                <Users size={24} color="var(--mantine-color-blue-6)" />
              </Group>
              <Text size="xl" fw={700} c="blue.6" mb="xs">
                {players.length}
              </Text>
              <Text size="sm" c="dimmed">Spelare i truppen</Text>
            </Paper>
            
            <Paper p="md" ta="center" bg="green.0">
              <Group justify="center" mb="xs">
                <Target size={24} color="var(--mantine-color-green-6)" />
              </Group>
              <Text size="xl" fw={700} c="green.6" mb="xs">
                {POST_TEMPLATES.length}
              </Text>
              <Text size="sm" c="dimmed">Tillgängliga mallar</Text>
            </Paper>
            
            <Paper p="md" ta="center" bg="yellow.0">
              <Group justify="center" mb="xs">
                <Infinity size={24} color="var(--mantine-color-yellow-6)" />
              </Group>
              <Text size="xl" fw={700} c="yellow.6" mb="xs">
                ∞
              </Text>
              <Text size="sm" c="dimmed">Möjligheter</Text>
            </Paper>
          </SimpleGrid>
        </motion.div>
      </Container>
    </Box>
  );
}