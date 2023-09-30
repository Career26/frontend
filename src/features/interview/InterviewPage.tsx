import { Button, Navbar, ScrollArea } from '@mantine/core';
import { mockInterviewQuestions } from '@mocks/interviewMocks';
import { Shell } from '@shared/components/shell/Shell';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { featureStyles } from '@shared/styles/featureStyles';
import { navStyles } from '@shared/styles/navStyles';
import { selectSelectedInterviewId } from '@slices/interviewSlice';
import { useAppSelector } from '@state/store';
import classNames from 'classnames';
import React from 'react';

export const InterviewPage = () => {
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
        <div className={featureClasses.content}>Hello</div>
      </Shell>
    </div>
  );
};
