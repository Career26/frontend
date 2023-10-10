import { Button, Container, Navbar, Paper, ScrollArea, createStyles, rem } from '@mantine/core';
import { mockInterviewQuestions } from '@mocks/interviewMocks';
import { Shell } from '@shared/components/shell/Shell';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { featureStyles } from '@shared/styles/featureStyles';
import { navStyles } from '@shared/styles/navStyles';
import { selectSelectedInterviewId } from '@slices/interviewSlice';
import { useAppSelector } from '@state/store';
import classNames from 'classnames';
import React from 'react';

const interviewStyles = createStyles({
  container: {
    flexDirection: 'column',
    marginTop: rem(20),
    display: 'flex',
    gap: rem(20),
    width: '100%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: rem(20),
  },
});

export const InterviewPage = () => {
  const { classes } = interviewStyles();
  const { classes: featureClasses } = featureStyles();
  const { classes: navClasses } = navStyles();
  const { toggleInterviewId } = usePageNavigation();
  const selectedInterviewId = useAppSelector(selectSelectedInterviewId);
  return (
    <div className={featureClasses.wrapper}>
      <Shell
        navbar={
          <Navbar p="xs" className={navClasses.navBar}>
            <Navbar.Section grow mt="md" className={navClasses.navLink}>
              <ScrollArea h="80vh">
                {Object.entries(mockInterviewQuestions).map(([id, { title }]) => (
                  <Button
                    onClick={() => toggleInterviewId(id)}
                    key={title}
                    className={classNames(navClasses.navButton, navClasses.linkAction, {
                      [navClasses.active]: selectedInterviewId === id,
                    })}
                  >
                    {title}
                  </Button>
                ))}
              </ScrollArea>
            </Navbar.Section>
          </Navbar>
        }
      >
        <div className={featureClasses.content}>
          <Container className={classes.container}>
            <Paper h={200} shadow="md" radius="md" p="md" withBorder>
              QUESTION
            </Paper>
            <Paper h={200} shadow="md" radius="md" p="md" withBorder>
              Answer
            </Paper>
            <div className={classes.buttons}>
              <Button variant="outline">Submit</Button>
            </div>
            <Paper h={200} shadow="md" radius="md" p="md" withBorder>
              Rating and feedback
            </Paper>
            <div className={classes.buttons}>
              <Button variant="light">Retry</Button>
              <Button variant="outline">Next</Button>
            </div>
          </Container>
        </div>
      </Shell>
    </div>
  );
};
