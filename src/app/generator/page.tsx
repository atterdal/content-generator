'use client';

import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import GraphicsGenerator from '@/components/ui/GraphicsGenerator';
import { HABO_IF_BRAND } from '@/apps/habo-if/config/brand';

export default function GeneratorPage() {
  const brand = HABO_IF_BRAND;

  return (
    <div className="min-h-screen bg-habo-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="text-2xl font-black uppercase text-habo-blue font-habo-primary"
            >
              Grafikgenerator
            </h1>
            <Button 
              as="a"
              href="/brand-guidelines"
              variant="bordered"
              color="primary"
              className="font-bold"
            >
              Tillbaka till Riktlinjer
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-habo-blue to-habo-gradient-end text-white p-6">
            <div>
              <h2 className="text-xl font-black uppercase font-habo-primary mb-2">
                Skapa Professionell Grafik
              </h2>
              <p className="font-habo-secondary opacity-95">
                Generera automatiskt grafik som följer Habo IFs varumärkesriktlinjer
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Graphics Generator Component */}
        <GraphicsGenerator />
      </main>
    </div>
  );
}