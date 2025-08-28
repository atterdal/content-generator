'use client';

import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Box,
  SimpleGrid,
  List,
  ThemeIcon,
  Group,
  Badge,
  Card
} from '@mantine/core';
import { Users, Target, Trophy, Heart } from 'lucide-react';

export default function WhoWeArePage() {
  return (
    <Container size="lg" py={40}>
      <Stack gap={48}>
        {/* Header Section */}
        <Box>
          <Title order={1} size={48} mb={16}>
            Vilka vi är
          </Title>
          <Text size="xl" c="dimmed">
            Habo IF är mer än bara fotboll - vi är en gemenskap som skapar framtida ledare.
          </Text>
        </Box>

        {/* Mission Section */}
        <Paper p={32} radius="md" withBorder>
          <Group gap={16} mb={24}>
            <ThemeIcon size={40} radius="md" color="blue">
              <Target size={24} />
            </ThemeIcon>
            <Title order={2}>Vår Mission</Title>
          </Group>
          <Text size="lg" mb={24}>
            Att erbjuda fotbollsträning av högsta kvalitet för alla åldrar, 
            samtidigt som vi fostrar gemenskap, respekt och personlig utveckling.
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={24}>
            <Card p="lg" withBorder>
              <Title order={4} mb={8}>Breddverksamhet</Title>
              <Text size="sm" c="dimmed">
                Vi välkomnar alla oavsett bakgrund eller färdighetsnivå. 
                Hos oss får alla chansen att utvecklas i sin egen takt.
              </Text>
            </Card>
            <Card p="lg" withBorder>
              <Title order={4} mb={8}>Elitverksamhet</Title>
              <Text size="sm" c="dimmed">
                För de som vill satsa lite extra erbjuder vi strukturerad 
                träning med fokus på att nå sin fulla potential.
              </Text>
            </Card>
          </SimpleGrid>
        </Paper>

        {/* Values Section */}
        <Box>
          <Group gap={16} mb={24}>
            <ThemeIcon size={40} radius="md" color="blue">
              <Heart size={24} />
            </ThemeIcon>
            <Title order={2}>Våra Värderingar</Title>
          </Group>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing={24}>
            <Paper p={24} radius="md" withBorder>
              <Trophy size={32} style={{ marginBottom: 16, color: '#0629A0' }} />
              <Title order={4} mb={8}>Gemenskap</Title>
              <Text size="sm" c="dimmed">
                Vi skapar en inkluderande miljö där alla känner sig välkomna 
                och blir en del av Habo IF-familjen.
              </Text>
            </Paper>
            <Paper p={24} radius="md" withBorder>
              <Users size={32} style={{ marginBottom: 16, color: '#0629A0' }} />
              <Title order={4} mb={8}>Respekt</Title>
              <Text size="sm" c="dimmed">
                Vi visar respekt för varandra, motståndare, domare och alla 
                som är involverade i vår verksamhet.
              </Text>
            </Paper>
            <Paper p={24} radius="md" withBorder>
              <Target size={32} style={{ marginBottom: 16, color: '#0629A0' }} />
              <Title order={4} mb={8}>Utveckling</Title>
              <Text size="sm" c="dimmed">
                Vi fokuserar på kontinuerlig utveckling, både som fotbollsspelare 
                och som människor.
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        {/* History Section */}
        <Paper p={32} radius="md" withBorder>
          <Title order={2} mb={24}>Vår Historia</Title>
          <Stack gap={16}>
            <Text>
              Habo IF grundades 1929 och har sedan dess varit en central del av 
              idrottslivet i Habo kommun. Med nästan 100 års historia har vi 
              fostrat generationer av fotbollsspelare.
            </Text>
            <List spacing={8}>
              <List.Item>
                <Text component="span" fw={600}>1929:</Text> Föreningen grundas
              </List.Item>
              <List.Item>
                <Text component="span" fw={600}>1950-talet:</Text> Första ungdomslaget startas
              </List.Item>
              <List.Item>
                <Text component="span" fw={600}>1980-talet:</Text> Damverksamheten etableras
              </List.Item>
              <List.Item>
                <Text component="span" fw={600}>2000-talet:</Text> Ny konstgräsplan invigs
              </List.Item>
              <List.Item>
                <Text component="span" fw={600}>2020-talet:</Text> Digital transformation och modernisering
              </List.Item>
            </List>
          </Stack>
        </Paper>

        {/* Facts Section */}
        <Box>
          <Title order={2} mb={24}>Habo IF i siffror</Title>
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
            <Paper p={20} radius="md" withBorder ta="center">
              <Text size="xl" fw={700} c="blue">600+</Text>
              <Text size="sm" c="dimmed">Aktiva medlemmar</Text>
            </Paper>
            <Paper p={20} radius="md" withBorder ta="center">
              <Text size="xl" fw={700} c="blue">40+</Text>
              <Text size="sm" c="dimmed">Lag</Text>
            </Paper>
            <Paper p={20} radius="md" withBorder ta="center">
              <Text size="xl" fw={700} c="blue">100+</Text>
              <Text size="sm" c="dimmed">Ledare</Text>
            </Paper>
            <Paper p={20} radius="md" withBorder ta="center">
              <Text size="xl" fw={700} c="blue">1929</Text>
              <Text size="sm" c="dimmed">Grundad</Text>
            </Paper>
          </SimpleGrid>
        </Box>

        {/* Contact Section */}
        <Paper p={32} radius="md" bg="blue.0">
          <Title order={2} mb={16}>Bli en del av Habo IF</Title>
          <Text mb={24}>
            Vill du vara med och bidra? Vi söker alltid nya ledare, funktionärer 
            och sponsorer som vill vara med och utveckla föreningen.
          </Text>
          <Group>
            <Badge size="lg" variant="filled">Kontakta oss</Badge>
            <Badge size="lg" variant="light">info@haboif.se</Badge>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
}