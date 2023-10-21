import { Badge, Container, Stack } from '@mantine/core';
import { IconArrowBigDownLines } from '@tabler/icons-react';
import React from 'react';

import { TextCard } from '../cards/TextCard';
import styles from './tileStyles.module.scss';

type ProgressionItem = { title: string; descriptions: string[] };

export const ProgressionTile = ({ progressionList }: { progressionList: ProgressionItem[] }) => {
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
            <div className={styles.container} key={`preparation-${index}`}>
              {item.descriptions.map((description) => (
                <TextCard content={description} key={description} />
              ))}
            </div>

            {index !== mappedList.length - 1 && <IconArrowBigDownLines size={40} />}
          </>
        ))}
      </Stack>
    </Container>
  );
};
