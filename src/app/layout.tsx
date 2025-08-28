import type { Metadata } from "next";
import { Geist, Geist_Mono, PT_Serif } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider, createTheme, mantineHtmlProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Header } from '@/components/layout/Header';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

// Habo IF tema med deras färger
const haboTheme = createTheme({
  fontFamily: '"Alverata Black", Georgia, serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { 
    fontFamily: '"Alverata Black", Georgia, serif',
    fontWeight: '900',
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
    Paper: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        withBorder: true,
      },
    },
  },
});

export const metadata: Metadata = {
  title: "Habo IF - Grafisk Manual & Generator",
  description: "Habo IF:s officiella grafikgenerator och varumärkesguide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ptSerif.variable} antialiased`}
      >
        <MantineProvider theme={haboTheme}>
          <Notifications position="top-right" />
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}