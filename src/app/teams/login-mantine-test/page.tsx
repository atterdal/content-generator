'use client';

import { Button, Text, Container } from '@mantine/core';

export default function TestMantinePage() {
  return (
    <Container size="sm" py={40}>
      <Text size="xl" fw={700}>Mantine Test</Text>
      <Button>Click me</Button>
    </Container>
  );
}