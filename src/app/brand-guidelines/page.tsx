'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Paper,
  SimpleGrid,
  Box,
  Badge,
  Anchor,
  BackgroundImage
} from '@mantine/core';
import { 
  Palette,
  Type,
  Image,
  Eye,
  Camera,
  Layout,
  Users,
  ArrowRight
} from 'lucide-react';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

const GUIDELINE_SECTIONS = [
  {
    id: 'colors',
    title: 'Färger',
    description: 'Primära och sekundära färgpaletter',
    icon: Palette,
    href: '/brand-guidelines/colors',
    status: 'complete'
  },
  {
    id: 'typography',
    title: 'Typografi',
    description: 'Fonter, storlekar och hierarkier',
    icon: Type,
    href: '/brand-guidelines/typography',
    status: 'complete'
  },
  {
    id: 'logo',
    title: 'Logotyp',
    description: 'Variationer och användningsriktlinjer',
    icon: Image,
    href: '/brand-guidelines/logo',
    status: 'complete'
  },
  {
    id: 'layouts',
    title: 'Layouter',
    description: 'Grid-system och designmallar',
    icon: Layout,
    href: '/brand-guidelines/layouts',
    status: 'complete'
  },
  {
    id: 'photography',
    title: 'Fotografi',
    description: 'Bildstil och riktlinjer',
    icon: Camera,
    href: '/brand-guidelines/photography',
    status: 'complete'
  },
  {
    id: 'tone-voice',
    title: 'Ton & Röst',
    description: 'Kommunikationsstil och språk',
    icon: Users,
    href: '/brand-guidelines/tone-voice',
    status: 'complete'
  },
  {
    id: 'applications',
    title: 'Tillämpningar',
    description: 'Exempel på användning',
    icon: Eye,
    href: '/brand-guidelines/applications',
    status: 'complete'
  }
];

export default function BrandGuidelinesPage() {
  const brand = HABO_IF_BRAND;

  return (
    <>
      {/* Hero Section */}
      <BackgroundImage
        src="/images/elements/Robert-Movement-wide.jpg"
        h={500}
        style={{ position: 'relative' }}
      >
        <Box 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(6, 41, 160, 0.8) 0%, rgba(26, 98, 201, 0.6) 100%)'
          }}
        />
        <Container size="lg" h="100%" style={{ position: 'relative', zIndex: 1 }}>
          <Stack justify="center" h="100%" ta="center" c="white">
            <Badge size="lg" variant="light" color="gold.5" mb="md">
              Grafisk Manual v3.0
            </Badge>
            <Title 
              order={1} 
              size={48}
              fw={900}
              tt="uppercase"
              style={{ 
                fontFamily: brand.typography.primary.fontFamily,
                letterSpacing: '0.1em'
              }}
            >
              {brand.organization.heroTitle}
            </Title>
            <Text size="xl" maw={600} mx="auto" opacity={0.9}>
              {brand.organization.heroSubtitle}
            </Text>
            <Text size="md" maw={800} mx="auto" mt="md" opacity={0.8}>
              {brand.organization.brandGuidelinesDescription}
            </Text>
            <Group justify="center" mt="xl">
              <Button 
                size="lg" 
                color="gold.5"
                rightSection={<ArrowRight size={18} />}
                component="a"
                href="#sections"
              >
                Utforska Riktlinjer
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                color="white"
                component="a"
                href="/teams/login"
              >
                Skapa Grafik
              </Button>
            </Group>
          </Stack>
        </Container>
      </BackgroundImage>

      {/* Navigation Cards */}
      <Container size="lg" py="xl" id="sections">
        <Stack ta="center" mb="xl">
          <Title order={2} c="blue.7">
            Varumärkesriktlinjer
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Allt du behöver för att skapa konsekvent och professionell kommunikation för Habo IF
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {GUIDELINE_SECTIONS.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Paper
                key={section.id}
                p="lg"
                style={{
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 'var(--mantine-shadow-lg)'
                  }
                }}
                onClick={() => window.location.href = section.href}
              >
                <Stack>
                  <Group>
                    <Box
                      style={{
                        padding: 12,
                        borderRadius: 'var(--mantine-radius-md)',
                        backgroundColor: 'var(--mantine-color-blue-0)'
                      }}
                    >
                      <IconComponent size={24} color="var(--mantine-color-blue-6)" />
                    </Box>
                    <Badge variant="dot" color="green" size="sm">
                      {section.status}
                    </Badge>
                  </Group>
                  <Box>
                    <Title order={4} mb="xs">
                      {section.title}
                    </Title>
                    <Text size="sm" c="dimmed">
                      {section.description}
                    </Text>
                  </Box>
                  <Group justify="space-between" mt="auto">
                    <Text 
                      size="sm"
                      fw={600}
                      c="blue.5"
                    >
                      Läs mer
                    </Text>
                    <ArrowRight size={16} color="var(--mantine-color-blue-5)" />
                  </Group>
                </Stack>
              </Paper>
            );
          })}
        </SimpleGrid>

        {/* Quick Stats */}
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt="xl">
          <Paper p="lg" ta="center" bg="blue.0">
            <Title order={3} c="blue.7" mb="xs">7</Title>
            <Text size="sm" c="dimmed">Riktlinjesektioner</Text>
          </Paper>
          <Paper p="lg" ta="center" bg="gold.0">
            <Title order={3} c="gold.7" mb="xs">6</Title>
            <Text size="sm" c="dimmed">Designlayouter</Text>
          </Paper>
          <Paper p="lg" ta="center" bg="green.0">
            <Title order={3} c="green.7" mb="xs">∞</Title>
            <Text size="sm" c="dimmed">Kreativa möjligheter</Text>
          </Paper>
        </SimpleGrid>

        {/* Call to Action */}
        <Paper p="xl" mt="xl" bg="blue.0" ta="center">
          <Title order={3} c="blue.7" mb="md">
            Redo att skapa?
          </Title>
          <Text size="lg" c="dimmed" mb="xl">
            Använd våra mallar och riktlinjer för att skapa professionell grafik
          </Text>
          <Group justify="center">
            <Button 
              size="lg" 
              color="blue.5"
              component="a"
              href="/teams/login"
              rightSection={<ArrowRight size={18} />}
            >
              Kom igång
            </Button>
          </Group>
        </Paper>
      </Container>
    </>
  );
}