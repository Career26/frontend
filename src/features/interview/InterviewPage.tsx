import { Button, Navbar, ScrollArea, createStyles, rem } from '@mantine/core';
import { mockInterviewQuestions } from '@mocks/interviewMocks';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';
import { Shell } from '@shared/components/shell/Shell';
import useCareerNavigation from '@shared/hooks/useCareerNavigation';
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
  navBar: {
    width: NAVBAR_WIDTH,
    height: `calc(100% - ${HEADER_HEIGHT})`,
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    '> button': {
      textDecoration: 'none',
      ':not(:first-of-type)': { paddingTop: rem(20) },
      paddingLeft: rem(10),
      paddingRight: rem(10),
    },
  },
  navButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex',
    alignItems: 'center',
    width: '100%',
    height: rem(60),
    backgroundColor: 'white',
    color: theme.colors.gray[9],
    '&:hover': {
      backgroundColor: theme.colors.blue[1],
    },
  },
  active: {
    backgroundColor: theme.colors.blue[6],
    color: 'white',
    '&:hover': {
      backgroundColor: theme.colors.blue[4],
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
  const { toggleInterviewId } = useCareerNavigation();
  const selectedInterviewId = useAppSelector(selectSelectedInterviewId);
  return (
    <div className={classes.wrapper}>
      <Shell
        navbar={
          <Navbar p="xs" className={classes.navBar}>
            <Navbar.Section grow mt="md" className={classes.navLink}>
              <ScrollArea h="80vh">
                {Object.entries(mockInterviewQuestions).map(([id, { title }]) => (
                  <Button
                    onClick={() => toggleInterviewId(id)}
                    key={title}
                    className={classNames(classes.navButton, {
                      [classes.active]: selectedInterviewId === id,
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
