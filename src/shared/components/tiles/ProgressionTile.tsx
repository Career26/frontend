import { Card, CardSection, Container, Stack, createStyles, rem } from '@mantine/core';
import { IconArrowBigDownLines } from '@tabler/icons-react';
import React from 'react';

const useProgressionStyles = createStyles((theme) => ({
  cardHeader: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: rem(10),
    background: theme.colors.blue[4],
    color: 'white',
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
              <Card shadow="md" radius="md" p="md" withBorder key={`preparation-${index}`}>
                <CardSection className={classes.cardHeader}>{item.title}</CardSection>
                {description}
              </Card>
            ))}
            {index !== progressionList.length - 1 && <IconArrowBigDownLines />}
          </>
        ))}
      </Stack>
    </Container>
  );
};
