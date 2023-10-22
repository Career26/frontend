import React from 'react';
import { Container, Text, Button, Card, Badge } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';

import styles from './pricingTileStyles.module.scss';

interface PricingComponentProps {
  title: string;
  amount: string;
  peroid: string;
  benefits: string[];
  buttonText: string;
  onClick: () => void;
}

export const PricingTile = ({
  title,
  amount,
  peroid,
  benefits,
  buttonText,
  onClick,
}: PricingComponentProps) => (
  <Container className={styles.main}>
    <Card className={styles.card}>
      <Badge size="xl" radius="sm" variant="light">
        {title}
      </Badge>

      <Text className={styles.priceText}>
        {amount}{' '}
        <Text inherit component="span">
          / {peroid}
        </Text>
      </Text>

      <Container my="sm" className={styles.benefitsContainer}>
        {benefits.map((benefit, index) => (
          <Container
            key={index}
            className={styles.benefitContainer}
            py={index % 2 === 0 ? 0 : 'sm'}
          >
            <IconCircleCheck />
            <Text pl="xs" className={styles.benefitText} color="dimmed">
              {benefit}
            </Text>
          </Container>
        ))}
      </Container>

      <Button size="md" mb="sm" onClick={onClick}>
        {buttonText}
      </Button>
    </Card>
  </Container>
);
