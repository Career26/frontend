import React from 'react';
import { createStyles, Container, Text, Button, rem, Card, Badge } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  pricingContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  pricingCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  pricingCard: {
    background: theme.colors.blue[0],
    width: rem(330),
    borderRadius: 'sm',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pricingPlanPrice: {
    fontSize: rem(28),
    fontWeight: 800,
    lineHeight: 1.1,
    color: theme.colors.gray[9],
  },
  bulletPointMain: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },
  paddedPoint: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    display: 'flex',
    flexDirection: 'row',
  },
  bulletPointContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

type PricingComponentProps = {
  title: string;
  amount: string;
  peroid: string;
  benefits: string[];
  buttonText: string;
};

export const Pricing = ({ title, amount, peroid, benefits, buttonText }: PricingComponentProps) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.pricingCardContainer}>
      <Card className={classes.pricingCard}>
        <Badge size="xl" radius="sm" variant="light">
          {title}
        </Badge>
        <Text className={classes.pricingPlanPrice}>
          {amount}{' '}
          <Text className={classes.pricingPlanPrice} component="span">
            / {peroid}
          </Text>
        </Text>
        <Container my="sm" className={classes.bulletPointMain}>
          {benefits.map((benefit, index) => (
            <Container className={classes.bulletPointContainer} py={index % 2 == 0 ? 0 : 'sm'}>
              <IconCircleCheck />
              <Text pl={'xs'} size="md" color="dimmed">
                {benefit}
              </Text>
            </Container>
          ))}
        </Container>

        <Button size="md" mb={'sm'}>
          {buttonText}
        </Button>
      </Card>
    </Container>
  );
};
