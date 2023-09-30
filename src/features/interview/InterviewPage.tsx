import { Button, Navbar, ScrollArea, createStyles, rem } from '@mantine/core';
import { mockInterviewQuestions } from '@mocks/interviewMocks';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';
import { Shell } from '@shared/components/shell/Shell';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { navStyles } from '@shared/styles/navStyles';
import { selectSelectedInterviewId } from '@slices/interviewSlice';
import { useAppSelector } from '@state/store';
import classNames from 'classnames';
import React from 'react';

const NAVBAR_WIDTH = rem(250);

const interviewPageStyles = createStyles((theme) => ({
  wrapper: {
    '.mantine-AppShell-main': {
      [theme.fn.smallerThan('md')]: {
        '> div': {
          paddingLeft: '0 !important',
        },
      },
    },
  },
  scrollArea: {
    height: '100%',
  },
  content: {
    height: '420vh',
    flexDirection: 'column',
    paddingLeft: `${NAVBAR_WIDTH} !important`,
    paddingTop: HEADER_HEIGHT,
  },
}));

export const InterviewPage = () => {
  const { classes } = interviewPageStyles();
  const { classes: navClasses } = navStyles();
  const { toggleInterviewId } = usePageNavigation();
  const selectedInterviewId = useAppSelector(selectSelectedInterviewId);
  return (
    <div className={classes.wrapper}>
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
        <div className={classes.content}>Hello</div>
      </Shell>
    </div>
  );
};
