import { Card, Group, Text } from '@mantine/core';
import { IconArrowBigDownLines } from '@tabler/icons-react';
import React from 'react';
import commonStyles from '@shared/styles/commonStyles.module.scss';

type ProgressionItem = { title: string; descriptions: string[] };

const getMappedList = (progressionList: ProgressionItem[]) =>
  progressionList.reduce<ProgressionItem[]>((agg, item) => {
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

export const ProgressionTile = ({
  progressionList,
  id,
}: {
  id: string;
  progressionList: ProgressionItem[];
}) => {
  const mappedList = getMappedList(progressionList);
  return (
    <Group py="md" id={id}>
      {mappedList.map((item, index) => (
        <Group justify="center" display="flex" key={`progression-${item.title}`} w="100%">
          <Card shadow="sm" padding="lg" radius="md" withBorder w="100%">
            <Card.Section
              withBorder
              inheritPadding
              py="xs"
              fw="bold"
              variant="light"
              className={commonStyles.lightNavyBg}
            >
              {item.title}
            </Card.Section>
            <div className={commonStyles.row}>
              {item.descriptions.map((description) => (
                <Text w={`${100 / item.descriptions.length}%`} key={`description-${description}`}>
                  {description}
                </Text>
              ))}
            </div>
          </Card>
          {index !== mappedList.length - 1 && <IconArrowBigDownLines size={40} color="navy" />}
        </Group>
      ))}
    </Group>
  );
};
