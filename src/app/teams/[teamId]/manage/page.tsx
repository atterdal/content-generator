'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Paper,
  Button,
  TextInput,
  Select,
  Tabs,
  Table,
  Modal,
  Avatar,
  Badge,
  Title,
  Text,
  Group,
  Stack,
  ActionIcon,
  Box,
  Anchor,
  Flex
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { 
  ArrowLeft,
  UserPlus,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

// Mock player data
const INITIAL_PLAYERS = {
  'p15': [
    { id: 1, name: 'Oliver Andersson', number: 7, position: 'Anfallare', image: '/images/elements/Edward3.jpg', email: 'oliver@example.com' },
    { id: 2, name: 'William Karlsson', number: 10, position: 'Mittfältare', image: '/images/elements/Robert1.jpg', email: 'william@example.com' },
  ],
  'f15': [
    { id: 1, name: 'Emma Andersson', number: 8, position: 'Mittfältare', image: '/images/elements/Ester-Movement.jpg', email: 'emma@example.com' },
  ]
};

const POSITIONS = [
  { value: 'Målvakt', label: 'Målvakt' },
  { value: 'Försvarare', label: 'Försvarare' },
  { value: 'Mittfältare', label: 'Mittfältare' },
  { value: 'Anfallare', label: 'Anfallare' }
];

export default function TeamManagePage() {
  const brand = HABO_IF_BRAND;
  const router = useRouter();
  const params = useParams();
  const teamId = params?.teamId as string;
  const [opened, { open, close }] = useDisclosure(false);
  
  const [teamData, setTeamData] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState('players');
  const [editingPlayer, setEditingPlayer] = useState<any>(null);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    number: '',
    position: '',
    email: ''
  });

  useEffect(() => {
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
    setPlayers(INITIAL_PLAYERS[teamId as keyof typeof INITIAL_PLAYERS] || []);
  }, [teamId, router]);

  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.number || !newPlayer.position) {
      notifications.show({
        title: 'Fyll i alla fält',
        message: 'Namn, nummer och position krävs',
        color: 'red',
      });
      return;
    }

    const player = {
      id: Date.now(),
      ...newPlayer,
      number: parseInt(newPlayer.number),
      image: '/images/elements/Edward3.jpg'
    };

    setPlayers([...players, player]);
    setNewPlayer({ name: '', number: '', position: '', email: '' });
    close();

    notifications.show({
      title: 'Spelare tillagd!',
      message: `${player.name} har lagts till i truppen`,
      color: 'green',
    });
  };

  const handleDeletePlayer = (playerId: number) => {
    setPlayers(players.filter(p => p.id !== playerId));
    notifications.show({
      title: 'Spelare borttagen',
      message: 'Spelaren har tagits bort från truppen',
      color: 'blue',
    });
  };

  if (!teamData) {
    return (
      <Container size="lg" py="xl">
        <Text ta="center" c="dimmed">Laddar...</Text>
      </Container>
    );
  }

  return (
    <Box bg="gray.0" mih="100vh">
      {/* Page Header */}
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
                Hantera {teamData.teamName}
              </Title>
              <Text size="sm" c="dimmed">Laguppställning och spelarinformation</Text>
            </Box>
            
            <Button
              component="a"
              href={`/teams/${teamId}/dashboard`}
              variant="outline"
              leftSection={<ArrowLeft size={16} />}
              size="sm"
            >
              Tillbaka
            </Button>
          </Flex>
        </Paper>
      </Container>

      {/* Main Content */}
      <Container size="lg" pb="xl">
        <Tabs value={selectedTab} onChange={setSelectedTab}>
          <Tabs.List>
            <Tabs.Tab value="players">
              Spelare ({players.length})
            </Tabs.Tab>
            <Tabs.Tab value="settings">
              Laginställningar
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="players" pt="md">
            <Paper p="lg">
              <Flex justify="space-between" align="center" mb="md">
                <Title order={3}>Truppen</Title>
                <Button 
                  onClick={open}
                  leftSection={<UserPlus size={16} />}
                  color="blue.5"
                >
                  Lägg till spelare
                </Button>
              </Flex>

              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Spelare</Table.Th>
                    <Table.Th>Nummer</Table.Th>
                    <Table.Th>Position</Table.Th>
                    <Table.Th>E-post</Table.Th>
                    <Table.Th>Åtgärder</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {players.map((player) => (
                    <Table.Tr key={player.id}>
                      <Table.Td>
                        <Group>
                          <Avatar src={player.image} size="sm" radius="md" />
                          <Text fw={500}>{player.name}</Text>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light">#{player.number}</Badge>
                      </Table.Td>
                      <Table.Td>{player.position}</Table.Td>
                      <Table.Td>{player.email || '-'}</Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="light" color="blue">
                            <Edit size={16} />
                          </ActionIcon>
                          <ActionIcon 
                            variant="light" 
                            color="red"
                            onClick={() => handleDeletePlayer(player.id)}
                          >
                            <Trash2 size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>

              {players.length === 0 && (
                <Paper p="xl" ta="center" c="dimmed">
                  <Text>Inga spelare registrerade än</Text>
                  <Text size="sm">Klicka på "Lägg till spelare" för att komma igång</Text>
                </Paper>
              )}
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="md">
            <Paper p="lg">
              <Title order={3} mb="md">Laginställningar</Title>
              <Stack>
                <TextInput
                  label="Lagnamn"
                  value={teamData.teamName}
                  readOnly
                />
                <TextInput
                  label="Hemmaplan"
                  placeholder="Hajmyren"
                />
                <Select
                  label="Division"
                  data={[
                    { value: 'div1', label: 'Division 1' },
                    { value: 'div2', label: 'Division 2' },
                    { value: 'div3', label: 'Division 3' }
                  ]}
                />
                <Button color="blue.5" leftSection={<Save size={16} />}>
                  Spara inställningar
                </Button>
              </Stack>
            </Paper>
          </Tabs.Panel>
        </Tabs>

        {/* Add Player Modal */}
        <Modal opened={opened} onClose={close} title="Lägg till ny spelare">
          <Stack>
            <TextInput
              label="Namn"
              placeholder="Ange spelarens namn"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
            />
            <TextInput
              label="Nummer"
              placeholder="Ange tröjnummer"
              type="number"
              value={newPlayer.number}
              onChange={(e) => setNewPlayer({...newPlayer, number: e.target.value})}
            />
            <Select
              label="Position"
              placeholder="Välj position"
              data={POSITIONS}
              value={newPlayer.position}
              onChange={(value) => setNewPlayer({...newPlayer, position: value || ''})}
            />
            <TextInput
              label="E-post (valfritt)"
              placeholder="spelare@example.com"
              value={newPlayer.email}
              onChange={(e) => setNewPlayer({...newPlayer, email: e.target.value})}
            />
            <Group justify="flex-end">
              <Button variant="outline" onClick={close} leftSection={<X size={16} />}>
                Avbryt
              </Button>
              <Button onClick={handleAddPlayer} leftSection={<UserPlus size={16} />}>
                Lägg till
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Container>
    </Box>
  );
}