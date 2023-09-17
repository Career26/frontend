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

type PreparationItem = { title: string | JSX.Element; description: string };

export const ProgressionTile = ({ preparationList }: { preparationList: PreparationItem[] }) => {
  const { classes } = useProgressionStyles();
  return (
    <Container>
      <Stack align="center">
        {preparationList.map((item, index) => (
          <>
            <Card shadow="md" radius="md" p="md" withBorder key={`preparation-${index}`}>
              <CardSection className={classes.cardHeader}>{item.title}</CardSection>
              {item.description}
            </Card>
            {index !== preparationList.length - 1 && <IconArrowBigDownLines />}
          </>
        ))}
      </Stack>
    </Container>
  );
};
