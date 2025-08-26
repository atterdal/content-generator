import JSZip from 'jszip';
import { GeneratedGraphic, Player } from '@/types';

export const downloadImage = (imageData: string, filename: string) => {
  // Convert base64 to blob
  const byteCharacters = atob(imageData.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadAllImagesAsZip = async (
  graphics: GeneratedGraphic[],
  players: Player[],
  teamName: string = 'HaboIF'
) => {
  const zip = new JSZip();
  
  // Group graphics by player for better organization
  for (const graphic of graphics) {
    const player = players.find(p => p.id === graphic.playerId);
    if (!player) continue;

    // Create safe filename
    const playerName = player.name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    const timestamp = graphic.generatedAt.toISOString().slice(0, 10); // YYYY-MM-DD
    const filename = `${player.number}_${playerName}_${timestamp}.png`;

    // Convert base64 to binary
    const base64Data = graphic.imageData.split(',')[1];
    zip.file(filename, base64Data, { base64: true });
  }

  // Generate ZIP file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  
  // Create download
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${teamName}_Grafiker_${new Date().toISOString().slice(0, 10)}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getPlayerGraphics = (playerId: string, graphics: GeneratedGraphic[]) => {
  return graphics.filter(g => g.playerId === playerId);
};

export const formatFilename = (player: Player, timestamp?: Date) => {
  const playerName = player.name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
  const date = timestamp ? timestamp.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  return `${player.number}_${playerName}_${date}.png`;
};