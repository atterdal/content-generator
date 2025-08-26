import { ColorTheme, COLOR_THEMES } from '@/types';
import { createFloaterDesign } from './Builder';

// Alla 6 layouter från gamla systemet
export const ALL_LAYOUTS = [
  // Layout 1: Hero vänster
  `"beige beige trans trans"
   "hero hero trans trans"
   "hero hero trans trans"
   "hero hero blue vert"
   "hero hero blue vert"
   "logo trans blue vert"`,
  
  // Layout 2: Hero central
  `"beige beige beige beige"
   "blue hero hero logo"
   "blue hero hero trans"
   "blue hero hero trans"
   "blue hero hero trans"
   "bluetext bluetext bluetext bluetext"`,
  
  // Layout 3: Hero höger
  `"blue blue graphic graphic"
   "blue blue hero hero"
   "vert logo hero hero"
   "vert blue hero hero"
   "vert blue hero hero"
   "blue blue blue blue"`,
  
  // Layout 4: Hero central vertikal
  `"bluetext bluetext bluetext bluetext"
   "vert hero hero blue"
   "vert hero hero blue"
   "vert hero hero blue"
   "vert hero hero blue"
   "logo logo logo blue"`,
  
  // Layout 5: Hero övre vänster
  `"hero hero beige beige"
   "hero hero vert trans"
   "hero hero vert trans"
   "hero hero vert trans"
   "logo logo trans trans"
   "trans trans trans trans"`,
  
  // Layout 6: Hero höger asymmetrisk
  `"beige beige beige vert"
   "blue hero hero vert"
   "blue hero hero vert"
   "blue hero hero vert"
   "logo hero hero vert"
   "blue blue blue vert"`
];

// För bakåtkompatibilitet
export const testLayout = ALL_LAYOUTS[0];

// Test function that recreates exact old behavior with new system
export async function testFloaterSystem(canvas: HTMLCanvasElement): Promise<string> {
  const theme = COLOR_THEMES[0]; // Use first theme for consistent testing
  
  return await createFloaterDesign(canvas, testLayout, theme)
    
    // FLOATER Layer 0: Background (hela canvas)
    .addBackgroundFloater(0)
    
    // FLOATER Layer 3: Text pattern (hela canvas, 50% chance)
    .addPatternFloater(3, 'SAMPLE TEXT PATTERN ', undefined, 0.5)
    
    // BLOCK Layer 2: Color blocks (grid-positioned)
    .addColorBlock('beige', theme.beige, 2)
    .addGradientBlock('blue', 2)
    
    // BLOCK Layer 4: Hero (grid-positioned)
    .addHeroBlock('hero', 0)
    
    // BLOCK Layer 5: Text and logos (grid-positioned)
    .addLogoBlock('logo', 0) // No padding for logo block
    .addTextBlock('vert', 'VERTICAL TEXT', {
      layer: 5,
      fontSize: 18,
      color: '#FFFFFF',
      vertical: true
    })
    
    // Handle transparent blocks
    .addTransparentBlock('trans')
    
    // FLOATER Layer 6: Canvas-wide overlay (50% chance)
    .addOverlayFloater(6, 'MATCHDAG', 'Svenska Cupen', undefined, 0.5)
    
    .build();
}

// Advanced test with custom floater positioning
export async function testCustomFloaterPositioning(canvas: HTMLCanvasElement): Promise<string> {
  const theme = COLOR_THEMES[1];
  
  return await createFloaterDesign(canvas, testLayout, theme)
    
    // Background floater (hela canvas)
    .addFloater(0)
      .addBackground('color', { color: '#041b70' })
      .build()
    
    // Partial pattern floater (bara övre halvan)
    .addFloater(3, [0, 0, 1080, 540]) // [x1, y1, x2, y2]
      .addPattern('SAMPLE TEXT PATTERN ', 0.2)
      .build()
    
    // Grid blocks
    .addHeroBlock('hero')
    .addColorBlock('beige', theme.beige, 2)
    .addLogoBlock('logo')
    
    // Custom positioned overlay (nedre höger kvart)
    .addFloater(6, [540, 540, 1080, 1080])
      .addOverlay('MATCH', 'Lördag')
      .build()
    
    .build();
}

// Comparison test - same layout, different approaches
export async function testComparison(canvas: HTMLCanvasElement): Promise<{
  fullCanvasFloaters: string;
  customPositionedFloaters: string;
  mixedApproach: string;
}> {
  
  const theme = COLOR_THEMES[0];
  
  // Test 1: Full canvas floaters (old style)
  const fullCanvasFloaters = await createFloaterDesign(canvas, testLayout, theme)
    .addBackgroundFloater(0)
    .addPatternFloater(3, 'SAMPLE TEXT PATTERN ')
    .addHeroBlock('hero')
    .addLogoBlock('logo')
    .addOverlayFloater(6, 'MATCHDAG', 'Svenska Cupen')
    .build();
  
  // Test 2: Custom positioned floaters
  const customPositionedFloaters = await createFloaterDesign(canvas, testLayout, theme)
    .addFloater(0).addBackground('color', { color: theme.blue }).build()
    .addFloater(3, [100, 100, 980, 400]).addPattern('SAMPLE TEXT PATTERN ').build()
    .addHeroBlock('hero')
    .addLogoBlock('logo') 
    .addFloater(6, [200, 600, 880, 900]).addOverlay('MATCH', 'Imorgon').build()
    .build();
  
  // Test 3: Mixed approach
  const mixedApproach = await createFloaterDesign(canvas, testLayout, theme)
    .addBackgroundFloater(0) // Full canvas background
    .addFloater(3, [0, 0, 1080, 800]).addPattern('SAMPLE ').build() // Partial pattern
    .addHeroBlock('hero')
    .addColorBlock('beige', theme.beige, 2)
    .addLogoBlock('logo')
    .addOverlayFloater(6, 'MATCH', 'Lördag') // Full canvas overlay
    .build();
  
  return {
    fullCanvasFloaters,
    customPositionedFloaters,
    mixedApproach
  };
}

// Usage example for Dashboard integration
export async function generateWithFloaterSystem(canvas: HTMLCanvasElement): Promise<string> {
  // Random layout and theme (same as old system)
  const layout = ALL_LAYOUTS[Math.floor(Math.random() * ALL_LAYOUTS.length)];
  const theme = COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)];
  
  return await createFloaterDesign(canvas, layout, theme)
    .addBackgroundFloater(0)
    .addPatternFloater(3, 'SAMPLE TEXT PATTERN ', undefined, 0.5)
    
    // Hero blocks
    .addHeroBlock('hero', 0)
    
    // Color blocks
    .addColorBlock('beige', theme.beige, 2)
    .addGradientBlock('blue', 2)
    .addGradientBlock('graphic', 2) // Same as blue but different name
    
    // Logo blocks
    .addLogoBlock('logo', 0)
    
    // Text blocks
    .addTextBlock('vert', 'VERTICAL TEXT', {
      layer: 5,
      fontSize: 18,
      color: '#FFFFFF',
      vertical: true
    })
    .addTextBlock('bluetext', 'HEMMAMATCH 15:00', {
      layer: 5,
      fontSize: 18,
      color: '#FFFFFF'
    })
    
    // Transparent blocks
    .addTransparentBlock('trans')
    
    // Canvas-wide overlay
    .addOverlayFloater(6, 'MATCHDAG', 'Svenska Cupen', undefined, 0.5)
    .build();
}

/*
USAGE EXAMPLES:

// Basic test
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const image = await testFloaterSystem(canvas);

// Custom positioning test
const customImage = await testCustomFloaterPositioning(canvas);

// Comparison test
const comparison = await testComparison(canvas);
console.log('Generated 3 different approaches');

// Integration with Dashboard
const dashboardImage = await generateWithFloaterSystem(canvas);
*/