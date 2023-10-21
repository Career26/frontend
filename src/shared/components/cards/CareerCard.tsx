import { Badge, Card, Group, Text, createStyles, rem } from '@mantine/core';
import React from 'react';

const careerCardStyles = createStyles((theme) => ({
  cardHeader: {
    background: var(--mantine-color-gray-0);
    align-items: center;
    paddint: rem(10),
    height: '50px',
    padding-top: theme.spacing.sm,
    padding-bottom: theme.spacing.sm,
  },
  title: {
    fontSize: rem(18),
    fontWeight: 800,
    padding-bottom: '0 !important',
    lineHeight: 1.1,
    color: var(--mantine-color-gray-9);
    text-align: 'center',
    [theme.fn.smallerThan('lg')]: {
      text-align: 'left',
      padding-bottom: theme.spacing.xs,
    },
  },
  industrySection: {
    display: flex;
    placeContent: 'center',
    justifyContent: 'space-between',
  },
  careerSection: {
    overflow: 'hidden',
    padding-bottom: theme.spacing.md,
  },
  cardContainer: {
    height: '100%',
    display: flex;
    width: 'fit-content',
    flex-direction: column;
    justifyContent: 'space-between',
  },
  headerButtons: {
    display: flex;
    justifyContent: 'flex-end',
    gap: rem(10),
    align-items: center;
  },
}));

type CareerCardProps = {
  title: string;
  subTitle?: string;
  badge?: string;
  color?: string;
  content?: React.ReactNode;
  Actions?: React.ReactNode;
};

export const CareerCard = ({
  title,
  subTitle,
  badge,
  color,
  content,
  Actions,
}: CareerCardProps) => {
  const { classes } = careerCardStyles();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.cardContainer}>
      <Card.Section withBorder className={classes.cardHeader} inheritPadding>
        <Group justify="apart">
          <Text fw={800} className={classes.title}>
            {title}
          </Text>
          {Actions && <div className={classes.headerButtons}>{Actions}</div>}
        </Group>
      </Card.Section>
      <Group justify="apart" mt="md" mb="xs" className={classes.industrySection}>
        {subTitle && <Text fw={800}>{subTitle}</Text>}
        {badge && (
          <Badge color={color} variant="light">
            {badge}
          </Badge>
        )}
      </Group>
      {content && (
        <Text size="sm" className={classes.careerSection} lineClamp={5}>
          {content}
        </Text>
      )}
    </Card>
  );
};
