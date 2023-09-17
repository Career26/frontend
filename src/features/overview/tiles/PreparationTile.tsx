import { SupplementalExperience } from '@datatypes/overview';
import { Card, CardSection, Stack, createStyles, rem } from '@mantine/core';
import { IconArrowBigDownLines } from '@tabler/icons-react';
import React from 'react';

const usePreparationStyles = createStyles((theme) => ({
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

export const PreparationTile = ({
  supplementalExperiences,
}: {
  supplementalExperiences: SupplementalExperience[];
}) => {
  const { classes } = usePreparationStyles();
  return (
    <Stack align="center">
      {supplementalExperiences.map((item, index) => (
        <>
          <Card shadow="md" radius="md" p="md" withBorder key={item.year}>
            <CardSection className={classes.cardHeader}>Year {item.year}</CardSection>
            {item.activity}
          </Card>
          {index !== supplementalExperiences.length - 1 && <IconArrowBigDownLines />}
        </>
      ))}
    </Stack>
  );
};
