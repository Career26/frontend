import React from 'react';
import { Card, Text, Button, Modal, LoadingOverlay } from '@mantine/core';
import { CareerPath } from '@datatypes/career';
import { useDisclosure } from '@mantine/hooks';

import { careerPathTileStyles } from './careerPathTileStyles';
import { IndustrySection } from './IndustrySection';
import { CareerPathContent } from './CareeerPathContent';

export const CareerPathTile = ({
  title,
  role,
  startingSalary,
  industry,
  reason,
  companies,
  skills,
  buttons,
  onClickExplore,
  loading = false,
}: CareerPath & { buttons?: JSX.Element; loading?: boolean; onClickExplore?: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = careerPathTileStyles();
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.cardContainer}>
        <Card.Section component="div" withBorder className={classes.cardHeader}>
          <Text weight={500} className={classes.title}>
            {title}
          </Text>
        </Card.Section>
        <IndustrySection industry={industry} startingSalary={startingSalary} />
        <Text size="sm" color="dimmed" className={classes.careerSection} lineClamp={5}>
          {role}
        </Text>
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={onClickExplore || open}
        >
          Explore more
        </Button>
        {buttons}
        <LoadingOverlay visible={loading} overlayBlur={2} />
      </Card>
      <Modal
        size={500}
        className={classes.modal}
        opened={opened}
        onClose={close}
        centered
        title={
          <Text weight={500} className={classes.title}>
            {title}
          </Text>
        }
      >
        <CareerPathContent
          reason={reason}
          role={role}
          industry={industry}
          startingSalary={startingSalary}
          companies={companies}
          skills={skills}
        />
      </Modal>
    </>
  );
};
