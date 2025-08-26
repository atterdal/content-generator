/**
 * Habo IF Brand Configuration
 * Complete brand profile including colors, typography, and content
 */

export interface BrandColors {
  // Primary colors
  royalBlue: string;
  heritageGold: string;
  pureWhite: string;
  
  // Secondary colors
  blueVoid: string;
  gradientStart: string;
  gradientEnd: string;
  
  // Background colors
  classicBeige: string;
  deepBackground: string;
  
  // Gradients
  gradientPrimary: string;
  gradientDark: string;
  gradient50deg: string;
}

export interface BrandTypography {
  primary: {
    fontFamily: string;
    usage: string;
    case: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
    sizes: {
      display: number;
      h1: number;
      h2: number;
    };
  };
  secondary: {
    fontFamily: string;
    usage: string;
    case: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    sizes: {
      body: number;
      subheader: number;
      caption: number;
    };
  };
}

export interface BrandOrganization {
  name: string;
  shortName: string;
  sport: string;
  fullName: string;
  established: number;
  tagline: string;
  coreValues: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroBackgroundImage: string;
  brandGuidelinesDescription: string;
}

export interface BrandConfig {
  organization: BrandOrganization;
  colors: BrandColors;
  typography: BrandTypography;
  
  // Default text content (will be database-driven in future)
  defaultTexts: {
    sectionHeader: string;
    secondarySectionHeader: string;
    textPattern: string;
    mainHeader: string;
    subHeader: string;
  };
  
  // Post type specific texts (will be database-driven in future)
  postTypeTexts: {
    matchday: {
      sectionHeader: string;
      mainHeader: string;
    };
    training: {
      sectionHeader: string;
      mainHeader: string;
    };
    playerSpotlight: {
      sectionHeader: string;
      secondarySectionHeader: string;
      mainHeader: string;
      subHeader: string;
    };
  };
}

/**
 * Habo IF Complete Brand Profile
 * Centralized configuration for all brand elements
 */
export const HABO_IF_BRAND: BrandConfig = {
  organization: {
    name: 'HABO IF',
    shortName: 'HaboIF',
    sport: 'FOTBOLL',
    fullName: 'HABO IDROTTSFÖRENING',
    established: 1926,
    tagline: 'Vi Brinner Blått',
    coreValues: ['Glädje', 'Utveckling', 'Gemenskap'],
    heroTitle: 'Fostrade i Blått & Vitt.',
    heroSubtitle: 'Förenade för Guld.',
    heroDescription: 'I våra hjärtan brinner en blå eld, nedärvd från generation till generation. Den ger näring åt vår glädje, stärker vår gemenskap och driver vår utveckling. När den lågan brinner i oss blir vi ostoppbara, och kan smida varje blåvit droppe svett till blänkande guld.',
    heroBackgroundImage: '/images/elements/Robert-Movement-wide.jpg',
    brandGuidelinesDescription: 'Allt du behöver för att skapa konsekvent och professionell kommunikation'
  },
  
  colors: {
    // Primary colors
    royalBlue: '#0629A0',
    heritageGold: '#B6975C',
    pureWhite: '#FFFFFF',
    
    // Secondary colors
    blueVoid: '#030133',
    gradientStart: '#11669f',
    gradientEnd: '#002e6a',
    
    // Background colors
    classicBeige: '#f0ede6',
    deepBackground: '#faf8f3',
    
    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #11669f 0%, #002e6a 100%)',
    gradientDark: 'linear-gradient(135deg, #030133 0%, #11669f 100%)',
    gradient50deg: 'linear-gradient(50deg, #11669f 0%, #0629A0 100%)'
  },
  
  typography: {
    primary: {
      fontFamily: '"Alverata Black", Georgia, serif',
      usage: 'Headlines, logos, call-to-action buttons',
      case: 'uppercase',
      sizes: {
        display: 72,
        h1: 32,
        h2: 24
      }
    },
    secondary: {
      fontFamily: '"PT Serif", serif',
      usage: 'Body text, descriptions, longer content',
      case: 'none',
      sizes: {
        body: 18,
        subheader: 20,
        caption: 14
      }
    }
  },
  
  defaultTexts: {
    sectionHeader: 'HABO IF',
    secondarySectionHeader: 'FOTBOLL',
    textPattern: 'HABO IF FOTBOLL',
    mainHeader: 'HABO IF',
    subHeader: 'FOTBOLL'
  },
  
  postTypeTexts: {
    matchday: {
      sectionHeader: 'MATCHDAG',
      mainHeader: 'MATCHDAG'
    },
    training: {
      sectionHeader: 'TRÄNING',
      mainHeader: 'TRÄNING'
    },
    playerSpotlight: {
      sectionHeader: 'MÅNADENS SPELARE',
      secondarySectionHeader: 'MITTFÄLTARE',
      mainHeader: 'MARCUS',
      subHeader: 'ERIKSSON'
    }
  }
};