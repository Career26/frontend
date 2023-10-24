import { Card, Group, Text } from '@mantine/core';
import React from 'react';

export const FormContent = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <Card shadow="sm" radius="md" p="md" withBorder>
    {title && (
      <Card.Section withBorder inheritPadding py="xs" bg="navy" c="white">
        <Group justify="center">
          <Text fw="bold" size="1.5rem">
            {title}
          </Text>
        </Group>
      </Card.Section>
    )}
    {children}
  </Card>
);
