import { CareerPath } from '@datatypes/career';
import { ActionIcon, Badge, Card, Group, Text, createStyles, rem } from '@mantine/core';
import {
  IconCircleCheck,
  IconSquareRoundedMinusFilled,
  IconSquareRoundedPlusFilled,
} from '@tabler/icons-react';
import React from 'react';

const careerPathTileStyles = createStyles((theme) => ({
  cardHeader: {
    background: theme.colors.blue[0],
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

export const CareerPathTile = ({
  title,
  role,
  onClickAction,
  industry,
  startingSalary,
  selected,
  loading,
}: CareerPath & { loading?: boolean; onClickAction?: () => void }) => {
  const { classes } = careerPathTileStyles();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.cardContainer}>
      <Card.Section withBorder className={classes.cardHeader} inheritPadding>
        <Group position="apart">
          <Text weight={500} className={classes.title}>
            {title}
          </Text>
          {onClickAction && (
            <div className={classes.headerButtons}>
              {selected && <IconCircleCheck size={30} fill="green" color="white" />}
              <ActionIcon
                loading={loading}
                onClick={onClickAction}
                color={selected ? 'red' : 'gray'}
              >
                {selected ? <IconSquareRoundedMinusFilled /> : <IconSquareRoundedPlusFilled />}
              </ActionIcon>
            </div>
          )}
        </Group>
      </Card.Section>
      <Group position="apart" mt="md" mb="xs" className={classes.industrySection}>
        <Text weight={500}>{startingSalary}</Text>
        <Badge color="pink" variant="light">
          {industry}
        </Badge>
      </Group>
      <Text size="sm" color="dimmed" className={classes.careerSection} lineClamp={5}>
        {role}
      </Text>
    </Card>
  );
};
