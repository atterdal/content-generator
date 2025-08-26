// Enkel font loader - låter CSS göra jobbet
export const waitForFonts = (): Promise<void> => {
  return new Promise((resolve) => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        console.log('All fonts loaded via CSS');
        resolve();
      });
    } else {
      // Fallback - vänta bara en kort stund
      setTimeout(() => {
        console.log('Font loading timeout - proceeding with fallbacks');
        resolve();
      }, 500);
    }
  });
};