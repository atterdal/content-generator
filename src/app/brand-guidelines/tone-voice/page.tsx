'use client';

import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Box,
  SimpleGrid,
  Badge,
  BackgroundImage,
  Group
} from '@mantine/core';
import { 
  MessageCircle, 
  Heart, 
  Users, 
  Zap, 
  CheckCircle, 
  XCircle,
  Hash
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

const VOICE_TRAITS = [
  {
    icon: Heart,
    title: 'Äkta',
    description: 'Vi låtsas inte vara något vi inte är. Vår kommunikation speglar våra verkliga värderingar och erfarenheter från Hajmyren.',
    examples: ['Pratar om både segrar och nederlag', 'Erkänner utmaningar och firar framsteg', 'Delar verkliga berättelser från klubben']
  },
  {
    icon: Users,
    title: 'Inkluderande',
    description: 'Alla ska känna sig välkomna i våra budskap, oavsett ålder, kön, bakgrund eller fotbollskunskap.',
    examples: ['Använder "vi" istället för "ni"', 'Förklarar fotbollstermer när det behövs', 'Representerar hela vår mångfald']
  },
  {
    icon: Zap,
    title: 'Passionerad',
    description: 'Vår kärlek till fotboll och klubben lyser igenom i allt vi skriver och säger. Men alltid med respekt för motståndare.',
    examples: ['Entusiasm utan arrogans', 'Stolthet över våra spelare', 'Respekt för alla i fotbollsfamiljen']
  }
];

const COMMUNICATION_EXAMPLES = {
  good: [
    {
      title: 'Matchresultat',
      content: 'Vilken fight våra U17-killar visade idag! Trots att vi kom efter tidigt kämpade sig laget tillbaka och Marcus Svensson blev matchhjälte med sitt avgörande mål i 89:e minuten. Det här är Habo IF-andan när den är som bäst! #HaboIF #VibrinnerBlått',
      note: 'Visar stolthet, berättar historia, inkluderar känslor'
    },
    {
      title: 'Tränarintervju', 
      content: 'Anna Pettersson har lett våra P13 i tre år och hennes passion smittar av sig. "Det bästa med att träna på Habo IF är att se när spelarna plötsligt förstår något nytt. Det glittret i ögonen - det är därför jag gör det här." Tack Anna för allt du ger våra unga spelare!',
      note: 'Personligt, citat som visar värderingar, tacksamhet'
    }
  ],
  bad: [
    {
      title: 'Matchresultat',
      content: 'Habo IF besegrade XYZ FC med 3-2. Målen gjordes av M. Svensson (89\'). Nästa match spelas på torsdag 19:00.',
      note: 'Kalt, opersonligt, ingen känslomässig koppling'
    },
    {
      title: 'Efter förlust',
      content: 'Besvikna över resultatet idag. Domaren tog helt fel beslut vid 0-1 målet och vår motståndare spelade otroligt smutsigt. Vi förtjänade att vinna den här matchen.',
      note: 'Klagande, skyller på andra, dålig förlorare'
    }
  ]
};

export default function ToneVoicePage() {
  const brand = HABO_IF_BRAND;

  return (
    <>
      {/* Hero Section */}
      <BackgroundImage
        src="/images/elements/habo-if-communication.jpg"
        h={400}
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
              Kommunikation
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
              Ton & Röst
            </Title>
            <Text size="xl" maw={600} mx="auto" opacity={0.9}>
              Hur vi kommunicerar är lika viktigt som vad vi säger
            </Text>
          </Stack>
        </Container>
      </BackgroundImage>

      {/* Main Content */}
      <Container size="lg" py="xl">
        <Stack spacing="xl">
          {/* Our Voice Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper p="xl">
              <Title order={2} mb="lg" ta="center" c="blue.7">
                Vår Röst
              </Title>
              <Text size="lg" mb="xl" ta="center" c="dimmed" maw={600} mx="auto">
                Tre grundläggande egenskaper som definierar hur vi kommunicerar
              </Text>
              
              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                {VOICE_TRAITS.map((trait, index) => {
                  const IconComponent = trait.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Paper 
                        p="lg" 
                        style={{
                          height: '100%',
                          background: index === 0 ? 'linear-gradient(135deg, #0629A0 0%, #1a62c9 100%)' : 
                                    index === 1 ? 'var(--mantine-color-gold-0)' : 'var(--mantine-color-yellow-2)',
                          color: index === 0 ? 'white' : 'inherit'
                        }}
                      >
                        <Stack>
                          <Box
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 'var(--mantine-radius-md)',
                              backgroundColor: index === 0 ? 'var(--mantine-color-gold-5)' : 'var(--mantine-color-blue-5)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <IconComponent size={28} color="white" />
                          </Box>
                          <Title 
                            order={3} 
                            tt="uppercase"
                            c={index === 0 ? 'gold.5' : 'blue.7'}
                            style={{ 
                              fontFamily: brand.typography.primary.fontFamily,
                              letterSpacing: '0.05em'
                            }}
                          >
                            {trait.title}
                          </Title>
                          <Text size="sm" mb="md" c={index === 0 ? 'white' : 'dimmed'}>
                            {trait.description}
                          </Text>
                          <Stack gap="xs">
                            {trait.examples.map((example, i) => (
                              <Text key={i} size="xs" c={index === 0 ? 'white' : 'dimmed'}>
                                • {example}
                              </Text>
                            ))}
                          </Stack>
                        </Stack>
                      </Paper>
                    </motion.div>
                  );
                })}
              </SimpleGrid>
            </Paper>
          </motion.div>

          {/* Communication Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Paper p="xl">
              <Title order={2} mb="lg" ta="center" c="blue.7">
                Kommunikationsexempel
              </Title>
              <Text size="lg" mb="xl" ta="center" c="dimmed" maw={600} mx="auto">
                Konkreta exempel på bra och dålig kommunikation i praktiken
              </Text>
              
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                {/* Good Examples */}
                <Box>
                  <Group mb="lg">
                    <CheckCircle size={24} color="var(--mantine-color-green-6)" />
                    <Title order={3} c="green.7">Bra Exempel</Title>
                  </Group>
                  <Stack gap="md">
                    {COMMUNICATION_EXAMPLES.good.map((example, index) => (
                      <Paper key={index} p="md" style={{ borderLeft: '4px solid var(--mantine-color-green-5)' }}>
                        <Title order={5} c="green.7" mb="sm">{example.title}</Title>
                        <Text size="sm" style={{ fontStyle: 'italic' }} mb="sm">
                          "{example.content}"
                        </Text>
                        <Text size="xs" c="dimmed">{example.note}</Text>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
                
                {/* Bad Examples */}
                <Box>
                  <Group mb="lg">
                    <XCircle size={24} color="var(--mantine-color-red-6)" />
                    <Title order={3} c="red.7">Undvik Detta</Title>
                  </Group>
                  <Stack gap="md">
                    {COMMUNICATION_EXAMPLES.bad.map((example, index) => (
                      <Paper key={index} p="md" style={{ borderLeft: '4px solid var(--mantine-color-red-5)' }}>
                        <Title order={5} c="red.7" mb="sm">{example.title}</Title>
                        <Text size="sm" style={{ fontStyle: 'italic' }} mb="sm">
                          "{example.content}"
                        </Text>
                        <Text size="xs" c="dimmed">{example.note}</Text>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              </SimpleGrid>
            </Paper>
          </motion.div>

          {/* Language Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Paper p="xl">
              <Title order={2} mb="lg" ta="center" c="blue.7">
                Språkguider
              </Title>
              <Text size="lg" mb="xl" ta="center" c="dimmed" maw={600} mx="auto">
                Specifika ordval och fraser som hjälper oss kommunicera konsekvent
              </Text>
              
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                {/* Word Choices */}
                <Box>
                  <Title order={3} mb="lg" c="blue.7">Ordval & Fraser</Title>
                  <Stack gap="md">
                    {[
                      {
                        instead: 'Istället för "supporters" säg:',
                        suggestion: '"Habo IF-familjen", "våra fantastiska supportrar", "er som står bakom oss"'
                      },
                      {
                        instead: 'Istället för "förlust" säg:',
                        suggestion: '"lärorik match", "steg i utvecklingen", "dagen när vi lärde oss mest"'
                      },
                      {
                        instead: 'Istället för "tränare" säg:',
                        suggestion: '"vår coach Marcus", "lagledningen", namn på person när det är möjligt'
                      }
                    ].map((item, index) => (
                      <Paper key={index} p="md" bg="gray.0">
                        <Text fw={500} mb="sm">{item.instead}</Text>
                        <Text size="sm" c="blue.6" style={{ fontStyle: 'italic' }}>
                          {item.suggestion}
                        </Text>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
                
                {/* Brand Signatures */}
                <Box>
                  <Title order={3} mb="lg" c="blue.7">Våra Signaturer</Title>
                  <Stack gap="md">
                    <Paper p="md" style={{ borderLeft: '4px solid var(--mantine-color-gold-5)' }}>
                      <Text fw={600} mb="sm">Huvudslagord</Text>
                      <Title 
                        order={4} 
                        tt="uppercase" 
                        c="blue.7" 
                        mb="xs"
                        style={{ fontFamily: brand.typography.primary.fontFamily }}
                      >
                        Vi Brinner Blått
                      </Title>
                      <Text size="sm" c="dimmed">Vårt känslomässiga löfte - passion, stolthet, gemenskap</Text>
                    </Paper>
                    
                    <Paper p="md">
                      <Text fw={600} mb="sm">Hashtags</Text>
                      <Group gap="xs" mb="sm">
                        <Badge leftSection={<Hash size={12} />}>#HaboIF</Badge>
                        <Badge leftSection={<Hash size={12} />}>#VibrinnerBlått</Badge>
                        <Badge leftSection={<Hash size={12} />}>#Hajmyren</Badge>
                      </Group>
                      <Text size="xs" c="dimmed">Använd konsekvent, max 3 hashtags per inlägg</Text>
                    </Paper>
                    
                    <Paper p="md">
                      <Text fw={600} mb="sm">Avslutningsfraser</Text>
                      <Stack gap={4}>
                        <Text size="sm">• "Vi ses på Hajmyren!"</Text>
                        <Text size="sm">• "Tillsammans är vi starkare"</Text>
                        <Text size="sm">• "Med hjärta för Habo"</Text>
                        <Text size="sm">• "Blått är vår färg, gemenskap är vår styrka"</Text>
                      </Stack>
                    </Paper>
                  </Stack>
                </Box>
              </SimpleGrid>
            </Paper>
          </motion.div>
        </Stack>
      </Container>
    </>
  );
}