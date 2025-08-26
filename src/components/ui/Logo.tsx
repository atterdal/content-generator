import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: CSSProperties;
  alt?: string;
}

const sizeClasses = {
  xs: 'h-4',
  sm: 'h-6',
  md: 'h-8', 
  lg: 'h-12',
  xl: 'h-24'
};

export default function Logo({ 
  variant = 'default', 
  size = 'md', 
  className,
  style,
  alt = 'Habo IF'
}: LogoProps) {
  const src = variant === 'white' 
    ? '/images/logos/habo-if-2025-white.png'
    : '/images/logos/habo-if-2025.png';

  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={cn(
        sizeClasses[size],
        'object-contain',
        className
      )}
    />
  );
}