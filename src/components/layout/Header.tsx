'use client';

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Paper,
  Anchor,
  Menu,
  Text,
  SimpleGrid,
  Collapse,
  UnstyledButton,
  Stack
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  LogIn, 
  ChevronDown, 
  Palette, 
  Type, 
  Image, 
  Layout, 
  Camera, 
  Eye, 
  Users,
  FileText
} from 'lucide-react';

const IDENTITY_MENU_ITEMS = [
  { 
    title: 'Färger', 
    description: 'Primära och sekundära färgpaletter',
    icon: Palette, 
    href: '/brand-guidelines/colors' 
  },
  { 
    title: 'Typografi', 
    description: 'Fonter, storlekar och hierarkier',
    icon: Type, 
    href: '/brand-guidelines/typography' 
  },
  { 
    title: 'Logotyp', 
    description: 'Variationer och användningsriktlinjer',
    icon: Image, 
    href: '/brand-guidelines/logo' 
  },
  { 
    title: 'Layouter', 
    description: 'Grid-system och designmallar',
    icon: Layout, 
    href: '/brand-guidelines/layouts' 
  },
  { 
    title: 'Fotografi', 
    description: 'Bildstil och riktlinjer',
    icon: Camera, 
    href: '/brand-guidelines/photography' 
  },
  { 
    title: 'Tillämpningar', 
    description: 'Exempel på användning',
    icon: Eye, 
    href: '/brand-guidelines/applications' 
  }
];

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [mobileIdentityOpened, { toggle: toggleMobileIdentity }] = useDisclosure(false);

  return (
    <Paper shadow="sm" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Box h={60} px="md">
        <Group justify="space-between" h="100%">
          <Group>
            <Anchor href="/" style={{ textDecoration: 'none' }}>
              <img 
                src="/images/logos/habo-if-2025.png" 
                alt="Habo IF"
                style={{ height: 32, objectFit: 'contain' }}
              />
            </Anchor>
          </Group>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Anchor href="/" size="sm" fw={500} p="md" style={{ textDecoration: 'none' }}>
              Hem
            </Anchor>
            <Anchor href="/brand-guidelines/who-we-are" size="sm" fw={500} p="md" style={{ textDecoration: 'none' }}>
              Vilka Vi Är
            </Anchor>
            <Anchor href="/brand-guidelines/tone-voice" size="sm" fw={500} p="md" style={{ textDecoration: 'none' }}>
              Ton & Röst
            </Anchor>
            
            {/* Identity Mega Menu */}
            <Menu trigger="hover" openDelay={100} closeDelay={400} width={800}>
              <Menu.Target>
                <Box
                  style={{
                    padding: '0 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                >
                  <Text size="sm" fw={500}>
                    Identitet
                  </Text>
                  <ChevronDown size={16} style={{ marginLeft: 4 }} />
                </Box>
              </Menu.Target>

              <Menu.Dropdown>
                <Box p="lg">
                  <Text size="lg" fw={700} mb="md" c="blue.7">
                    Grafisk Identitet
                  </Text>
                  <Text size="sm" c="dimmed" mb="xl">
                    Alla element som definierar Habo IF:s visuella identitet
                  </Text>
                  
                  <SimpleGrid cols={2} spacing="md">
                    {IDENTITY_MENU_ITEMS.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Anchor 
                          key={item.href}
                          href={item.href} 
                          style={{ textDecoration: 'none' }}
                        >
                          <Box
                            p="sm"
                            style={{
                              borderRadius: 'var(--mantine-radius-md)',
                              transition: 'background-color 0.2s',
                              ':hover': {
                                backgroundColor: 'var(--mantine-color-blue-0)'
                              }
                            }}
                          >
                            <Group>
                              <Box
                                style={{
                                  padding: 8,
                                  borderRadius: 'var(--mantine-radius-sm)',
                                  backgroundColor: 'var(--mantine-color-blue-0)'
                                }}
                              >
                                <IconComponent size={16} color="var(--mantine-color-blue-6)" />
                              </Box>
                              <Box style={{ flex: 1 }}>
                                <Text size="sm" fw={600} c="dark">
                                  {item.title}
                                </Text>
                                <Text size="xs" c="dimmed">
                                  {item.description}
                                </Text>
                              </Box>
                            </Group>
                          </Box>
                        </Anchor>
                      );
                    })}
                  </SimpleGrid>

                  <Divider my="md" />
                  
                  <Group justify="center">
                    <Button 
                      variant="light" 
                      component="a" 
                      href="/brand-guidelines"
                      size="sm"
                    >
                      Se alla riktlinjer
                    </Button>
                  </Group>
                </Box>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Group visibleFrom="sm">
            <Button 
              leftSection={<LogIn size={16} />}
              component="a"
              href="/teams/login"
              color="blue.5"
            >
              Lagledare
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" size="sm" />
        </Group>
      </Box>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          
          <Anchor href="/" size="sm" fw={500} p="md" style={{ textDecoration: 'none', display: 'block' }}>
            Hem
          </Anchor>
          
          <Anchor href="/brand-guidelines/who-we-are" size="sm" fw={500} p="md" style={{ textDecoration: 'none', display: 'block' }}>
            Vilka Vi Är
          </Anchor>
          
          <Anchor href="/brand-guidelines/tone-voice" size="sm" fw={500} p="md" style={{ textDecoration: 'none', display: 'block' }}>
            Ton & Röst
          </Anchor>

          {/* Mobile Identity Menu */}
          <Box>
            <UnstyledButton
              onClick={toggleMobileIdentity}
              style={{
                width: '100%',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Text size="sm" fw={500}>Identitet</Text>
              <ChevronDown 
                size={16} 
                style={{ 
                  transform: mobileIdentityOpened ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }} 
              />
            </UnstyledButton>
            
            <Collapse in={mobileIdentityOpened}>
              <Stack gap="xs" pl="md">
                {IDENTITY_MENU_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Anchor 
                      key={item.href}
                      href={item.href}
                      style={{ textDecoration: 'none', display: 'block' }}
                      onClick={closeDrawer}
                    >
                      <Group p="sm" style={{ borderRadius: 'var(--mantine-radius-sm)' }}>
                        <IconComponent size={16} color="var(--mantine-color-blue-6)" />
                        <Text size="sm">{item.title}</Text>
                      </Group>
                    </Anchor>
                  );
                })}
              </Stack>
            </Collapse>
          </Box>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button 
              leftSection={<LogIn size={16} />}
              component="a"
              href="/teams/login"
              color="blue.5"
              onClick={closeDrawer}
            >
              Lagledare
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Paper>
  );
}