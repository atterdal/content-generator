'use client';

import Link from 'next/link';
import { BrandConfig } from '@/apps/habo-if/config/brand';

export interface NavigationItem {
  href: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
}

interface NavigationGridProps {
  brandConfig: BrandConfig;
  items: NavigationItem[];
  columns?: 2 | 3 | 4;
  variant?: 'cards' | 'minimal' | 'gradient';
}

export default function NavigationGrid({ 
  brandConfig,
  items,
  columns = 3,
  variant = 'cards'
}: NavigationGridProps) {
  const brand = brandConfig;
  
  const getGridColumns = () => {
    switch(columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const renderCard = (item: NavigationItem) => {
    switch(variant) {
      case 'gradient':
        return (
          <Link
            key={item.href}
            href={item.href}
            className="block group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
            style={{ background: brand.colors.gradient50deg }}
          >
            <div className="p-8">
              {item.icon && (
                <div className="text-4xl mb-4">{item.icon}</div>
              )}
              <h3 
                className="text-xl font-black uppercase tracking-wider mb-2"
                style={{ 
                  color: brand.colors.pureWhite,
                  fontFamily: brand.typography.primary.fontFamily
                }}
              >
                {item.title}
              </h3>
              <p 
                className="text-sm opacity-90"
                style={{ 
                  color: brand.colors.pureWhite,
                  fontFamily: brand.typography.secondary.fontFamily
                }}
              >
                {item.description}
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        );
        
      case 'minimal':
        return (
          <Link
            key={item.href}
            href={item.href}
            className="block group"
          >
            <div className="border-b border-gray-200 pb-4 transition-colors hover:border-gray-400">
              <h3 
                className="text-lg font-black uppercase tracking-wider mb-1 group-hover:text-blue-600 transition-colors"
                style={{ 
                  fontFamily: brand.typography.primary.fontFamily
                }}
              >
                {item.title}
              </h3>
              <p 
                className="text-sm text-gray-600"
                style={{ 
                  fontFamily: brand.typography.secondary.fontFamily
                }}
              >
                {item.description}
              </p>
            </div>
          </Link>
        );
        
      case 'cards':
      default:
        return (
          <Link
            key={item.href}
            href={item.href}
            className="block group hover:shadow-lg transition-all duration-300 bg-white rounded-lg border border-gray-200 hover:border-gray-300"
          >
            <div className="p-6">
              {item.icon && (
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: item.color || brand.colors.classicBeige }}
                >
                  <span className="text-2xl">{item.icon}</span>
                </div>
              )}
              <h3 
                className="text-lg font-black uppercase tracking-wider mb-2 group-hover:text-blue-600 transition-colors"
                style={{ 
                  fontFamily: brand.typography.primary.fontFamily
                }}
              >
                {item.title}
              </h3>
              <p 
                className="text-sm text-gray-600"
                style={{ 
                  fontFamily: brand.typography.secondary.fontFamily
                }}
              >
                {item.description}
              </p>
            </div>
          </Link>
        );
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-6`}>
      {items.map(renderCard)}
    </div>
  );
}