import { Badge, Card, Group, Text, createStyles, rem } from '@mantine/core';
import React from 'react';

const careerCardStyles = createStyles((theme) => ({
  cardHeader: {
    background: theme.colors.gray[0],
    alignItems: 'center',
    paddint: rem(10),
    height: '50px',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    fontSize: rem(18),
    fontWeight: 800,
    paddingBottom: '0 !important',
    lineHeight: 1.1,
    color: theme.colors.gray[9],
    textAlign: 'center',
    [theme.fn.smallerThan('lg')]: {
      textAlign: 'left',
      paddingBottom: theme.spacing.xs,
    },
  },
  industrySection: {
    display: 'flex',
    placeContent: 'center',
    justifyContent: 'space-between',
  },
  careerSection: {
    overflow: 'hidden',
    paddingBottom: theme.spacing.md,
  },
  cardContainer: {
    height: '100%',
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: rem(10),
    alignItems: 'center',
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
        <Group position="apart">
          <Text weight={500} className={classes.title}>
            {title}
          </Text>
          {Actions && <div className={classes.headerButtons}>{Actions}</div>}
        </Group>
      </Card.Section>
      <Group position="apart" mt="md" mb="xs" className={classes.industrySection}>
        {subTitle && <Text weight={500}>{subTitle}</Text>}
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
