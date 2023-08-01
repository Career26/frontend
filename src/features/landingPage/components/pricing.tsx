import React from 'react';
import { createStyles, Container, Text, Button, rem, Card, Badge } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  card: {
    background: theme.colors.blue[0],
    width: rem(330),
    borderRadius: 'sm',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  priceText: {
    fontSize: rem(28),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
  },

  benefitsContainer: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },

  benefitContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

interface PricingComponentProps {
  title: string;
  amount: string;
  peroid: string;
  benefits: string[];
  buttonText: string;
  onClick: () => void;
}

export const Pricing = ({
  title,
  amount,
  peroid,
  benefits,
  buttonText,
  onClick,
}: PricingComponentProps) => {
  const { classes } = useStyles();

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
            <Container className={classes.benefitContainer} py={index % 2 == 0 ? 0 : 'sm'}>
              <IconCircleCheck />
              <Text pl={'xs'} size="md" color="dimmed">
                {benefit}
              </Text>
            </Container>
          ))}
        </Container>

        <Button size="md" mb={'sm'} onClick={onClick}>
          {buttonText}
        </Button>
      </Card>
    </Container>
  );
};