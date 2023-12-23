import { Card, Group, Text } from '@mantine/core';
import React from 'react';

interface FormContentProps {
  title?: string;
  children: React.ReactNode;
}

export const FormContent = ({ title, children }: FormContentProps) => (
  <Card radius="md" p="md" withBorder>
    {title && (
      <Card.Section withBorder inheritPadding py="xs" bg="navy" c="white">
        <Group justify="center">
          <Text fw="bold" size="lg">
            {title}
          </Text>
        </Group>
      </Card.Section>
    )}
    {children}
  </Card>
);
