'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Input,
  Link,
  Divider
} from '@heroui/react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';
import Logo from '@/components/ui/Logo';

// Temporary hardcoded team credentials - replace with proper auth later
const TEAM_CREDENTIALS = [
  { id: 'p15', teamName: 'P15', password: 'haboif2025' },
  { id: 'f15', teamName: 'F15', password: 'haboif2025' },
  { id: 'p13', teamName: 'P13', password: 'haboif2025' },
  { id: 'f13', teamName: 'F13', password: 'haboif2025' },
  { id: 'herr-a', teamName: 'Herr A', password: 'haboif2025' },
  { id: 'dam-a', teamName: 'Dam A', password: 'haboif2025' }
];

export default function TeamLoginPage() {
  const brand = HABO_IF_BRAND;
  const router = useRouter();
  const [teamId, setTeamId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple validation
    const team = TEAM_CREDENTIALS.find(
      t => t.id.toLowerCase() === teamId.toLowerCase() && 
          t.password === password
    );

    if (team) {
      // Store in sessionStorage (temporary solution)
      sessionStorage.setItem('teamAuth', JSON.stringify({
        teamId: team.id,
        teamName: team.teamName,
        loginTime: new Date().toISOString()
      }));

      // Redirect to team dashboard
      router.push(`/teams/${team.id}/dashboard`);
    } else {
      setError('Fel lag-ID eller lösenord');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo size="xl" className="mx-auto mb-4" />
          <h1 
            className="text-3xl font-black uppercase tracking-wider"
            style={{ 
              color: brand.colors.royalBlue,
              fontFamily: brand.typography.primary.fontFamily
            }}
          >
            LAGLEDARE INLOGG
          </h1>
          <p className="text-gray-600 mt-2">
            Logga in för att skapa grafik för ditt lag
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border border-gray-200">
          <CardHeader className="pb-0 pt-8 px-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Ange dina uppgifter
            </h2>
          </CardHeader>
          <CardBody className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                placeholder="Lag-ID (t.ex. p15, f13, herr-a)"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                isRequired
              />

              <Input
                placeholder="Lösenord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
              />

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full font-bold text-white"
                style={{
                  backgroundColor: brand.colors.royalBlue,
                  fontFamily: brand.typography.primary.fontFamily
                }}
                isLoading={isLoading}
              >
                LOGGA IN
              </Button>
            </form>

            <Divider className="my-6" />

            {/* Demo Info */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900 font-semibold mb-2">
                Demo-inloggningar:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {TEAM_CREDENTIALS.slice(0, 4).map(team => (
                  <div key={team.id} className="text-blue-700">
                    <span className="font-semibold">{team.teamName}:</span> {team.id} / haboif2025
                  </div>
                ))}
              </div>
            </div>

            {/* Back Link */}
            <div className="text-center mt-6">
              <Link
                href="/brand-guidelines"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Tillbaka till Brand Guidelines
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          © 2025 {brand.organization.name}. Alla rättigheter förbehållna.
        </p>
      </motion.div>
    </div>
  );
}