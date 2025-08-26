import Link from 'next/link';
import { BrandConfig } from '@/apps/habo-if/config/brand';

interface BrandGuidelinesTemplateProps {
  brandConfig: BrandConfig;
  currentSection: string;
  title: string;
  children: React.ReactNode;
}

export default function BrandGuidelinesTemplate({
  brandConfig,
  currentSection,
  title,
  children
}: BrandGuidelinesTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            <Link 
              href="/brand-guidelines"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Brand Guidelines</span>
            </Link>
            <div className="w-px h-4 bg-gray-300"></div>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}