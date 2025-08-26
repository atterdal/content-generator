import { BrandConfig } from '@/apps/habo-if/config/brand';

interface BrandSectionProps {
  brandConfig: BrandConfig;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Agnostic brand section component following Headspace design pattern
 * 5-column text area + 7-column visual area
 */
export default function BrandSection({
  brandConfig,
  title,
  description,
  children,
  className = ""
}: BrandSectionProps) {
  return (
    <div className={`mb-20 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Text Column (5 columns) */}
        <div className="lg:col-span-5">
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ 
              fontFamily: brandConfig.typography.primary.fontFamily,
              color: brandConfig.colors.royalBlue,
              textTransform: brandConfig.typography.primary.case === 'uppercase' ? 'uppercase' : 'none'
            }}
          >
            {title}
          </h2>
          <p 
            className="leading-relaxed"
            style={{ 
              fontFamily: brandConfig.typography.secondary.fontFamily,
              fontSize: `${brandConfig.typography.secondary.sizes.body}px`,
              color: '#6b7280'
            }}
          >
            {description}
          </p>
        </div>
        
        {/* Visual Column (7 columns) */}
        <div className="lg:col-span-7">
          {children}
        </div>
      </div>
    </div>
  );
}