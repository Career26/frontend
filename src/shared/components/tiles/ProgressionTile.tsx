import { Badge, Card, Container, Stack, createStyles, rem } from '@mantine/core';
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
  descriptionsContainer: {
    display: 'flex',
    gap: '24px',
  },
}));

type ProgressionItem = { title: string; descriptions: string[] };

export const ProgressionTile = ({ progressionList }: { progressionList: ProgressionItem[] }) => {
  const { classes } = useProgressionStyles();
  const mappedList = progressionList.reduce<ProgressionItem[]>((agg, item) => {
    const existingYear = agg.find((aggItem) => aggItem.title === item.title);
    if (!existingYear) {
      return [...agg, item];
    }
    return agg.map((aggItem) =>
      aggItem.title === existingYear.title
        ? { ...aggItem, descriptions: [...existingYear.descriptions, ...item.descriptions] }
        : aggItem,
    );
  }, []);
  return (
    <Container>
      <Stack align="center">
        {mappedList.map((item, index) => (
          <>
            <Badge variant="filled" size="xl">
              {item.title}
            </Badge>
            <div className={classes.descriptionsContainer} key={`preparation-${index}`}>
              {item.descriptions.map((description) => (
                <Card
                  className={classes.cardContainer}
                  key={description}
                  shadow="md"
                  radius="md"
                  p="md"
                  withBorder
                >
                  <div className={classes.cardDescription}>{description}</div>
                </Card>
              ))}
            </div>

            {index !== mappedList.length - 1 && <IconArrowBigDownLines size={40} />}
          </>
        ))}
      </Stack>
    </Container>
  );
};
