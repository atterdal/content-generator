export interface NavigationItem {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: 'primary' | 'secondary';
}

export const BRAND_GUIDELINES_NAVIGATION: NavigationItem[] = [
  {
    title: 'Logotyp',
    description: 'Logotyper, versioner och användningsriktlinjer',
    href: '/brand-guidelines/logo',
    icon: '⚡',
    color: 'primary'
  },
  {
    title: 'Färger',
    description: 'Primära och sekundära färger för alla material',
    href: '/brand-guidelines/colors',
    icon: '🎨',
    color: 'secondary'
  },
  {
    title: 'Typografi',
    description: 'Typsnitt och texthierarki för digital och tryck',
    href: '/brand-guidelines/typography',
    icon: '🔤',
    color: 'primary'
  },
  {
    title: 'Fotografi',
    description: 'Bildstil och riktlinjer för spelarporträtt',
    href: '/brand-guidelines/photography',
    icon: '📸',
    color: 'secondary'
  },
  {
    title: 'Layouter',
    description: '4×6 grid-system och designprinciper',
    href: '/brand-guidelines/layouts',
    icon: '📐',
    color: 'primary'
  },
  {
    title: 'Tillgänglighet',
    description: 'WCAG-riktlinjer och kontrastkrav',
    href: '/brand-guidelines/accessibility',
    icon: '♿',
    color: 'secondary'
  },
  {
    title: 'Tillämpningar',
    description: 'Exempel på material och användning',
    href: '/brand-guidelines/applications',
    icon: '📱',
    color: 'primary'
  },
  {
    title: 'Ton & Röst',
    description: 'Hur vi kommunicerar och uttrycker oss',
    href: '/brand-guidelines/tone-voice',
    icon: '💬',
    color: 'secondary'
  },
  {
    title: 'Vilka vi är',
    description: 'Vår historia, värderingar och vision',
    href: '/brand-guidelines/who-we-are',
    icon: '🏛️',
    color: 'primary'
  }
];