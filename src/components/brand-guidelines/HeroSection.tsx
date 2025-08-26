'use client';

import { BrandConfig } from '@/apps/habo-if/config/brand';

interface HeroSectionProps {
  brandConfig: BrandConfig;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundType?: 'gradient' | 'beige' | 'white';
  size?: 'large' | 'medium' | 'small';
}

export default function HeroSection({ 
  brandConfig,
  title,
  subtitle,
  description,
  backgroundType = 'beige',
  size = 'large'
}: HeroSectionProps) {
  const brand = brandConfig;
  
  const getBackgroundStyle = () => {
    switch(backgroundType) {
      case 'gradient':
        return { background: brand.colors.gradient50deg };
      case 'beige':
        return { backgroundColor: brand.colors.classicBeige };
      case 'white':
        return { backgroundColor: brand.colors.pureWhite };
      default:
        return { backgroundColor: brand.colors.classicBeige };
    }
  };

  const getSizeClasses = () => {
    switch(size) {
      case 'large':
        return 'pt-32 pb-24';
      case 'medium':
        return 'pt-20 pb-16';
      case 'small':
        return 'pt-12 pb-10';
      default:
        return 'pt-20 pb-16';
    }
  };

  const getTitleSize = () => {
    switch(size) {
      case 'large':
        return 'text-6xl md:text-7xl lg:text-8xl';
      case 'medium':
        return 'text-5xl md:text-6xl lg:text-7xl';
      case 'small':
        return 'text-3xl md:text-4xl lg:text-5xl';
      default:
        return 'text-5xl md:text-6xl lg:text-7xl';
    }
  };

  return (
    <section className={getSizeClasses()} style={getBackgroundStyle()}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl">
          {subtitle && (
            <p 
              className="text-sm font-black uppercase tracking-[0.2em] mb-4"
              style={{ 
                color: brand.colors.heritageGold,
                fontFamily: brand.typography.primary.fontFamily
              }}
            >
              {subtitle}
            </p>
          )}
          
          <h1 
            className={`${getTitleSize()} font-black uppercase tracking-tight mb-6`}
            style={{ 
              color: backgroundType === 'gradient' ? brand.colors.pureWhite : brand.colors.royalBlue,
              fontFamily: brand.typography.primary.fontFamily
            }}
          >
            {title}
          </h1>
          
          {description && (
            <p 
              className="text-xl md:text-2xl leading-relaxed"
              style={{ 
                color: backgroundType === 'gradient' ? brand.colors.pureWhite : '#6b7280',
                fontFamily: brand.typography.secondary.fontFamily,
                fontStyle: 'italic'
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}