import { AssessmentStage } from '@datatypes/overview';
import { Carousel } from '@mantine/carousel';
import { Card, CardSection, Container, createStyles, rem } from '@mantine/core';
import React from 'react';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

const timelineStyles = createStyles((theme) => ({
  cardHeader: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: rem(10),
    background: theme.colors.blue[4],
    color: 'white',
  },
  title: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '24px' },
  reasonSection: {
    marginTop: '10px',
    width: '30vh',
    height: '20vh',
    padding: 0,
  },
  carousel: {
    '.mantine-Carousel-slide': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  numberCircle: {
    width: '5vh',
    borderRadius: '5vh',
    textAlign: 'center',
    fontSize: '3vh',
    border: '2px solid #666',
  },
}));

export const ApplicationTimelineTile = ({
  assessmentStages,
}: {
  assessmentStages: AssessmentStage[];
}) => {
  const { classes } = timelineStyles();
  return (
    <Container>
      <Carousel
        dragFree
        height={200}
        slideGap="lg"
        controlSize={50}
        className={classes.carousel}
        slideSize="50%"
        align="center"
        nextControlIcon={<IconArrowRight size={30} />}
        previousControlIcon={<IconArrowLeft size={30} />}
      >
        {assessmentStages.map((item, index) => (
          <Carousel.Slide key={item.stage}>
            <Card shadow="md" radius="md" p="md" withBorder style={{ width: '50vh' }}>
              <CardSection className={classes.cardHeader}>
                <div className={classes.title}>
                  <div className={classes.numberCircle}>{index}</div>
                  {item.stage}
                </div>
              </CardSection>
              {item.description}
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};
