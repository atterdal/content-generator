'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Stack,
  Center,
  Box,
  Select,
  Divider,
  Alert
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Volleyball, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

// Mock teams data
const TEAMS = [
  { value: 'p15', label: 'P15' },
  { value: 'f15', label: 'F15' },
  { value: 'p13', label: 'P13' },
  { value: 'f13', label: 'F13' },
  { value: 'herr-a', label: 'Herr A-lag' },
  { value: 'dam-a', label: 'Dam A-lag' }
];

// Mock credentials
const MOCK_CREDENTIALS = {
  'p15': { password: 'habo2024' },
  'f15': { password: 'habo2024' },
  'p13': { password: 'habo2024' },
  'f13': { password: 'habo2024' },
  'herr-a': { password: 'habo2024' },
  'dam-a': { password: 'habo2024' }
};

export default function TeamLoginMantinePage() {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!selectedTeam || !password) {
      setError('Välj lag och ange lösenord');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    const teamCreds = MOCK_CREDENTIALS[selectedTeam as keyof typeof MOCK_CREDENTIALS];
    if (!teamCreds || teamCreds.password !== password) {
      setError('Felaktigt lösenord');
      setIsLoading(false);
      return;
    }

    // Store auth in session
    const teamLabel = TEAMS.find(t => t.value === selectedTeam)?.label;
    sessionStorage.setItem('teamAuth', JSON.stringify({
      teamId: selectedTeam,
      teamName: teamLabel,
      loginTime: Date.now()
    }));

    // Show success notification
    notifications.show({
      title: 'Inloggning lyckades!',
      message: `Välkommen ${teamLabel}`,
      color: 'green',
    });

    // Redirect to dashboard
    router.push(`/teams/${selectedTeam}/dashboard`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0629A0 0%, #1a62c9 50%, #4d85d5 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background pattern */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,0.1) 35px,
            rgba(255,255,255,0.1) 70px
          )`
        }}
      />

      <Container size={420} style={{ paddingTop: 80, paddingBottom: 80, position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Center mb="xl">
            <img
              src="/images/logos/habo-if-2025-white.png"
              alt="Habo IF"
              style={{ height: 80, objectFit: 'contain' }}
            />
          </Center>

          <Title
            order={1}
            ta="center"
            c="white"
            mb={8}
            style={{ fontFamily: HABO_IF_BRAND.typography.primary.fontFamily }}
          >
            LAGLEDARE
          </Title>
          
          <Text c="white" ta="center" size="sm" mb={40} opacity={0.9}>
            Logga in för att skapa grafik för ditt lag
          </Text>

          <Paper radius="md" p={30} shadow="xl">
            <form onSubmit={handleSubmit}>
              <Stack>
                <Select
                  label="Välj lag"
                  placeholder="Välj ditt lag"
                  data={TEAMS}
                  value={selectedTeam}
                  onChange={setSelectedTeam}
                  leftSection={<Volleyball size={16} />}
                  size="md"
                  styles={{
                    label: { fontWeight: 600 }
                  }}
                />

                <PasswordInput
                  label="Lösenord"
                  placeholder="Ange lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  size="md"
                  styles={{
                    label: { fontWeight: 600 }
                  }}
                />

                {error && (
                  <Alert
                    icon={<AlertCircle size={16} />}
                    color="red"
                    variant="light"
                  >
                    {error}
                  </Alert>
                )}

                <Button
                  fullWidth
                  size="md"
                  type="submit"
                  loading={isLoading}
                  leftSection={<LogIn size={16} />}
                  mt="md"
                  color="blue.5"
                >
                  Logga in
                </Button>
              </Stack>
            </form>

            <Divider label="DEMO" labelPosition="center" my="md" />

            <Paper p="md" radius="md" bg="gray.0">
              <Text size="sm" fw={600} mb="xs">
                Test-inloggning:
              </Text>
              <Text size="xs" c="dimmed">
                Välj valfritt lag och använd lösenord: <Text span fw={600} ff="monospace">habo2024</Text>
              </Text>
            </Paper>
          </Paper>

          <Text c="white" ta="center" size="xs" mt="xl" opacity={0.7}>
            © 2024 Habo IF - Grafikgenerator v3.0
          </Text>
        </motion.div>
      </Container>
    </Box>
  );
}