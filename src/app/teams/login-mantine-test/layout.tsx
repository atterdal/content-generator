import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  );
}