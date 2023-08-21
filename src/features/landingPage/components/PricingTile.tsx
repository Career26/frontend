import React from 'react';
import { Container, Text, Button, Card, Badge } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';

import { pricingTileStyles } from './pricingTileStyles';

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
}: PricingComponentProps) => {
  const { classes } = pricingTileStyles();

  return (
    <Container className={classes.main}>
      <Card className={classes.card}>
        <Badge size="xl" radius="sm" variant="light">
          {title}
        </Badge>

        <Text className={classes.priceText}>
          {amount}{' '}
          <Text inherit component="span">
            / {peroid}
          </Text>
        </Text>

        <Container my="sm" className={classes.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <Container
              key={index}
              className={classes.benefitContainer}
              py={index % 2 === 0 ? 0 : 'sm'}
            >
              <IconCircleCheck />
              <Text pl="xs" className={classes.benefitText} color="dimmed">
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
};
