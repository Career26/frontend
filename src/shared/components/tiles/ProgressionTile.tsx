import { Card, Container, Stack, createStyles, rem } from '@mantine/core';
import { IconArrowBigDownLines } from '@tabler/icons-react';
import React from 'react';

const useProgressionStyles = createStyles((theme) => ({
  cardHeader: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
    padding: rem(10),
    background: theme.colors.blue[4],
    color: 'white',
  },
  cardContainer: {
    width: '35vh',
  },
  cardDescription: {
    padding: rem(10),
    textAlign: 'left',
  },
}));

type ProgressionItem = { title: string; descriptions: string[] };

export const ProgressionTile = ({ progressionList }: { progressionList: ProgressionItem[] }) => {
  const { classes } = useProgressionStyles();
  return (
    <Container>
      <Stack align="center">
        {progressionList.map((item, index) => (
          <>
            {item.descriptions.map((description) => (
              <Card
                className={classes.cardContainer}
                shadow="md"
                radius="md"
                p="md"
                withBorder
                key={`preparation-${index}`}
              >
                <Card.Section className={classes.cardHeader} withBorder>
                  {item.title}
                </Card.Section>
                <div className={classes.cardDescription}>{description}</div>
              </Card>
            ))}
            {index !== progressionList.length - 1 && <IconArrowBigDownLines size={40} />}
          </>
        ))}
      </Stack>
    </Container>
  );
};
