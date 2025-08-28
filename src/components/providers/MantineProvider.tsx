'use client';

import { MantineProvider as Provider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';

// Skapa Habo IF tema med deras färger
const haboTheme = createTheme({
  fontFamily: '"Alverata", "Georgia", serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { 
    fontFamily: '"Alverata", "Georgia", serif',
    fontWeight: '900'
  },
  
  colors: {
    // Habo IF blå som primary
    blue: [
      '#e6eef9',
      '#b3cbed',
      '#80a8e1',
      '#4d85d5',
      '#1a62c9',
      '#0629A0', // Index 5 - Habo IF Royal Blue
      '#052080',
      '#041860',
      '#031040',
      '#020820'
    ],
    // Habo IF guld som accent
    gold: [
      '#faf7f2',
      '#f0e9d9',
      '#e6dbc0',
      '#dccda7',
      '#d2bf8e',
      '#B6975C', // Index 5 - Habo IF Heritage Gold
      '#9e8350',
      '#866f44',
      '#6e5b38',
      '#56472c'
    ]
  },
  
  primaryColor: 'blue',
  primaryShade: 5,
  
  defaultRadius: 'md',
  
  components: {
    Button: {
      defaultProps: {
        fw: 700,
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        withBorder: true,
      },
    },
  },
});

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider theme={haboTheme}>
      <Notifications position="top-right" />
      {children}
    </Provider>
  );
}