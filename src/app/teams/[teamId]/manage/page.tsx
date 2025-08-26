'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
  Chip,
  Link,
  Textarea,
  Divider
} from '@heroui/react';
import { motion } from 'framer-motion';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  age?: number;
  image?: string;
}

interface Match {
  id: string;
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
  type: 'league' | 'cup' | 'friendly';
}

export default function TeamManagePage() {
  const brand = HABO_IF_BRAND;
  const router = useRouter();
  const params = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const teamId = params?.teamId as string;
  const [teamData, setTeamData] = useState<any>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedTab, setSelectedTab] = useState('players');
  const [modalType, setModalType] = useState<'player' | 'match' | 'csv'>('player');
  const { isOpen: isCsvOpen, onOpen: onCsvOpen, onOpenChange: onCsvOpenChange } = useDisclosure();
  const [csvData, setCsvData] = useState('');
  
  // Form states
  const [playerForm, setPlayerForm] = useState({
    name: '',
    number: '',
    position: '',
    age: '',
    image: ''
  });
  
  const [matchForm, setMatchForm] = useState({
    date: '',
    time: '',
    opponent: '',
    location: '',
    isHome: true,
    type: 'league' as 'league' | 'cup' | 'friendly'
  });

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
    loadTeamData();
  }, [teamId, router]);

  const loadTeamData = () => {
    // Load existing data from localStorage or API
    const savedPlayers = localStorage.getItem(`team-${teamId}-players`);
    const savedMatches = localStorage.getItem(`team-${teamId}-matches`);
    
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
    
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
  };

  const handleAddPlayer = () => {
    setModalType('player');
    setPlayerForm({
      name: '',
      number: '',
      position: '',
      age: '',
      image: ''
    });
    onOpen();
  };

  const handleAddMatch = () => {
    setModalType('match');
    setMatchForm({
      date: '',
      time: '',
      opponent: '',
      location: '',
      isHome: true,
      type: 'league'
    });
    onOpen();
  };

  const savePlayer = () => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: playerForm.name,
      number: parseInt(playerForm.number),
      position: playerForm.position,
      age: playerForm.age ? parseInt(playerForm.age) : undefined,
      image: playerForm.image || undefined
    };

    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    localStorage.setItem(`team-${teamId}-players`, JSON.stringify(updatedPlayers));
    onOpenChange();
  };

  const saveMatch = () => {
    const newMatch: Match = {
      id: Date.now().toString(),
      date: matchForm.date,
      time: matchForm.time,
      opponent: matchForm.opponent,
      location: matchForm.location,
      isHome: matchForm.isHome,
      type: matchForm.type
    };

    const updatedMatches = [...matches, newMatch].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setMatches(updatedMatches);
    localStorage.setItem(`team-${teamId}-matches`, JSON.stringify(updatedMatches));
    onOpenChange();
  };

  const deletePlayer = (playerId: string) => {
    const updatedPlayers = players.filter(p => p.id !== playerId);
    setPlayers(updatedPlayers);
    localStorage.setItem(`team-${teamId}-players`, JSON.stringify(updatedPlayers));
  };

  const deleteMatch = (matchId: string) => {
    const updatedMatches = matches.filter(m => m.id !== matchId);
    setMatches(updatedMatches);
    localStorage.setItem(`team-${teamId}-matches`, JSON.stringify(updatedMatches));
  };

  const handleCsvImport = () => {
    if (!csvData.trim()) return;
    
    const lines = csvData.trim().split('\n');
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    
    // Expected headers: name, number, position, age (optional), image (optional)
    const newPlayers: Player[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length < 3) continue; // Skip incomplete rows
      
      const nameIndex = headers.indexOf('name') || headers.indexOf('namn');
      const numberIndex = headers.indexOf('number') || headers.indexOf('nummer');
      const positionIndex = headers.indexOf('position');
      const ageIndex = headers.indexOf('age') || headers.indexOf('ålder');
      const imageIndex = headers.indexOf('image') || headers.indexOf('bild');
      
      if (nameIndex === -1 || numberIndex === -1 || positionIndex === -1) continue;
      
      const player: Player = {
        id: Date.now().toString() + i,
        name: values[nameIndex],
        number: parseInt(values[numberIndex]),
        position: values[positionIndex],
        age: ageIndex !== -1 && values[ageIndex] ? parseInt(values[ageIndex]) : undefined,
        image: imageIndex !== -1 ? values[imageIndex] : undefined
      };
      
      newPlayers.push(player);
    }
    
    if (newPlayers.length > 0) {
      const updatedPlayers = [...players, ...newPlayers];
      setPlayers(updatedPlayers);
      localStorage.setItem(`team-${teamId}-players`, JSON.stringify(updatedPlayers));
      setCsvData('');
      onCsvOpenChange();
    }
  };

  const generateBulkContent = () => {
    router.push(`/teams/${teamId}/bulk-generate`);
  };

  if (!teamData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Laddar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Link href={`/teams/${teamId}/dashboard`}>
                <img 
                  src="/images/logos/habo-if-2025.png" 
                  alt="Habo IF"
                  className="h-8 object-contain"
                />
              </Link>
              <div>
                <h1 
                  className="text-xl font-black uppercase tracking-wider"
                  style={{ 
                    color: brand.colors.royalBlue,
                    fontFamily: brand.typography.primary.fontFamily
                  }}
                >
                  Hantera Lag
                </h1>
                <p className="text-xs text-gray-600">{teamData.teamName}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                color="secondary"
                variant="flat"
                onClick={generateBulkContent}
                isDisabled={players.length === 0 && matches.length === 0}
              >
                Generera Material
              </Button>
              <Button
                as={Link}
                href={`/teams/${teamId}/dashboard`}
                variant="bordered"
                size="sm"
              >
                ← Tillbaka
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Tabs 
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            className="mb-8"
          >
            <Tab key="players" title={`Spelare (${players.length})`}>
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Spelarlista</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="bordered"
                      onClick={() => {
                        setModalType('csv');
                        onCsvOpen();
                      }}
                    >
                      📄 Import CSV
                    </Button>
                    <Button
                      className="font-bold text-white"
                      style={{ backgroundColor: brand.colors.royalBlue }}
                      onClick={handleAddPlayer}
                    >
                      + Lägg till spelare
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  {players.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="mb-4">Ingen spelare registrerad än</p>
                      <Button onClick={handleAddPlayer} variant="bordered">
                        Lägg till första spelaren
                      </Button>
                    </div>
                  ) : (
                    <Table aria-label="Spelarlista">
                      <TableHeader>
                        <TableColumn>NAMN</TableColumn>
                        <TableColumn>NUMMER</TableColumn>
                        <TableColumn>POSITION</TableColumn>
                        <TableColumn>ÅLDER</TableColumn>
                        <TableColumn>ÅTGÄRDER</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {players.map((player) => (
                          <TableRow key={player.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar
                                  src={player.image}
                                  name={player.name.split(' ').map(n => n[0]).join('')}
                                  size="sm"
                                />
                                <span className="font-medium">{player.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Chip size="sm" variant="flat">#{player.number}</Chip>
                            </TableCell>
                            <TableCell>{player.position}</TableCell>
                            <TableCell>{player.age || '-'}</TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                color="danger"
                                variant="flat"
                                onClick={() => deletePlayer(player.id)}
                              >
                                Ta bort
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </Tab>

            <Tab key="matches" title={`Matcher (${matches.length})`}>
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Matchschema</h2>
                  <Button
                    className="font-bold text-white"
                    style={{ backgroundColor: brand.colors.royalBlue }}
                    onClick={handleAddMatch}
                  >
                    + Lägg till match
                  </Button>
                </CardHeader>
                <CardBody>
                  {matches.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="mb-4">Inga matcher registrerade än</p>
                      <Button onClick={handleAddMatch} variant="bordered">
                        Lägg till första matchen
                      </Button>
                    </div>
                  ) : (
                    <Table aria-label="Matchschema">
                      <TableHeader>
                        <TableColumn>DATUM</TableColumn>
                        <TableColumn>TID</TableColumn>
                        <TableColumn>MOTSTÅNDARE</TableColumn>
                        <TableColumn>PLATS</TableColumn>
                        <TableColumn>TYP</TableColumn>
                        <TableColumn>ÅTGÄRDER</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {matches.map((match) => (
                          <TableRow key={match.id}>
                            <TableCell>
                              {new Date(match.date).toLocaleDateString('sv-SE')}
                            </TableCell>
                            <TableCell>{match.time}</TableCell>
                            <TableCell className="font-medium">{match.opponent}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={match.isHome ? 'text-green-600' : 'text-blue-600'}>
                                  {match.isHome ? '🏠' : '✈️'}
                                </span>
                                {match.location}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                size="sm" 
                                color={match.type === 'league' ? 'primary' : match.type === 'cup' ? 'warning' : 'default'}
                              >
                                {match.type === 'league' ? 'Liga' : match.type === 'cup' ? 'Cup' : 'Vänskap'}
                              </Chip>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                color="danger"
                                variant="flat"
                                onClick={() => deleteMatch(match.id)}
                              >
                                Ta bort
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </motion.div>

        {/* Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  {modalType === 'player' ? 'Lägg till spelare' : 'Lägg till match'}
                </ModalHeader>
                <ModalBody>
                  {modalType === 'player' ? (
                    <div className="space-y-4">
                      <Input
                        label="Namn"
                        placeholder="Förnamn Efternamn"
                        value={playerForm.name}
                        onChange={(e) => setPlayerForm({...playerForm, name: e.target.value})}
                        variant="bordered"
                        isRequired
                      />
                      <Input
                        label="Tröjnummer"
                        placeholder="1-99"
                        type="number"
                        value={playerForm.number}
                        onChange={(e) => setPlayerForm({...playerForm, number: e.target.value})}
                        variant="bordered"
                        isRequired
                      />
                      <Select
                        label="Position"
                        placeholder="Välj position"
                        selectedKeys={playerForm.position ? [playerForm.position] : []}
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0] as string;
                          setPlayerForm({...playerForm, position: value});
                        }}
                        variant="bordered"
                        isRequired
                      >
                        <SelectItem key="Målvakt">Målvakt</SelectItem>
                        <SelectItem key="Försvarare">Försvarare</SelectItem>
                        <SelectItem key="Mittfältare">Mittfältare</SelectItem>
                        <SelectItem key="Anfallare">Anfallare</SelectItem>
                      </Select>
                      <Input
                        label="Ålder"
                        placeholder="Frivilligt"
                        type="number"
                        value={playerForm.age}
                        onChange={(e) => setPlayerForm({...playerForm, age: e.target.value})}
                        variant="bordered"
                      />
                      <Input
                        label="Profilbild URL"
                        placeholder="https://... (frivilligt)"
                        value={playerForm.image}
                        onChange={(e) => setPlayerForm({...playerForm, image: e.target.value})}
                        variant="bordered"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Input
                        label="Datum"
                        type="date"
                        value={matchForm.date}
                        onChange={(e) => setMatchForm({...matchForm, date: e.target.value})}
                        variant="bordered"
                        isRequired
                      />
                      <Input
                        label="Tid"
                        placeholder="15:00"
                        value={matchForm.time}
                        onChange={(e) => setMatchForm({...matchForm, time: e.target.value})}
                        variant="bordered"
                        isRequired
                      />
                      <Input
                        label="Motståndare"
                        placeholder="Lag/klubb namn"
                        value={matchForm.opponent}
                        onChange={(e) => setMatchForm({...matchForm, opponent: e.target.value})}
                        variant="bordered"
                        isRequired
                      />
                      <Input
                        label="Plats/Arena"
                        placeholder="Hajmyren, Habo"
                        value={matchForm.location}
                        onChange={(e) => setMatchForm({...matchForm, location: e.target.value})}
                        variant="bordered"
                        isRequired
                      />
                      <Select
                        label="Hemmamatch?"
                        selectedKeys={[matchForm.isHome.toString()]}
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0] as string;
                          setMatchForm({...matchForm, isHome: value === 'true'});
                        }}
                        variant="bordered"
                      >
                        <SelectItem key="true">Ja - Hemmamatch</SelectItem>
                        <SelectItem key="false">Nej - Bortamatch</SelectItem>
                      </Select>
                      <Select
                        label="Matchtyp"
                        selectedKeys={[matchForm.type]}
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0] as string;
                          setMatchForm({...matchForm, type: value as any});
                        }}
                        variant="bordered"
                      >
                        <SelectItem key="league">Liga/Serie</SelectItem>
                        <SelectItem key="cup">Cup/Turnering</SelectItem>
                        <SelectItem key="friendly">Vänskapsmatch</SelectItem>
                      </Select>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button variant="bordered" onPress={onClose}>
                    Avbryt
                  </Button>
                  <Button 
                    className="font-bold text-white"
                    style={{ backgroundColor: brand.colors.royalBlue }}
                    onPress={modalType === 'player' ? savePlayer : saveMatch}
                    isDisabled={
                      modalType === 'player' 
                        ? !playerForm.name || !playerForm.number || !playerForm.position
                        : !matchForm.date || !matchForm.time || !matchForm.opponent || !matchForm.location
                    }
                  >
                    Spara
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* CSV Import Modal */}
        <Modal isOpen={isCsvOpen} onOpenChange={onCsvOpenChange} size="2xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  Importera spelare från CSV
                </ModalHeader>
                <ModalBody>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Format för CSV-fil:</h4>
                      <code className="text-sm bg-white p-2 rounded block">
                        name,number,position,age,image<br/>
                        Oliver Andersson,7,Anfallare,16,https://...<br/>
                        William Karlsson,10,Mittfältare,15,
                      </code>
                      <p className="text-sm text-gray-600 mt-2">
                        Obligatoriska kolumner: name, number, position<br/>
                        Valfria kolumner: age, image
                      </p>
                    </div>
                    
                    <Textarea
                      label="CSV Data"
                      placeholder="Klistra in din CSV-data här..."
                      value={csvData}
                      onChange={(e) => setCsvData(e.target.value)}
                      variant="bordered"
                      minRows={8}
                      maxRows={15}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="bordered" onPress={onClose}>
                    Avbryt
                  </Button>
                  <Button 
                    className="font-bold text-white"
                    style={{ backgroundColor: brand.colors.royalBlue }}
                    onPress={handleCsvImport}
                    isDisabled={!csvData.trim()}
                  >
                    Importera Spelare
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    </div>
  );
}