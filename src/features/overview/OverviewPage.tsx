import React from 'react';
import { CareerPathNavigation } from '@shared/components/careerPathNavigation/CareerPathNavigation';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppSelector } from '@state/store';
import {
  selectCareerPaths,
  selectSelectedCareerPath,
  selectSelectedCareerPathId,
} from '@slices/careerPathsSlice';
import { Box, Button, Container, Navbar } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import { LandingPage } from '../landingPage/LandingPage';
import { Feature } from '@shared/components/feature/Feature';
import { landingPageStyles } from '../landingPage/landinPageStyles';
import { overviewStyles } from './overviewStyles';

const careerLinks = [
  'Industry Insights',
  'Role Overview',
  'Salary Expecation',
  'Top Employers',
  'Career Progression',
  'Typical Skills',
  'Application Timeline',
];

export const OverviewPage = () => {
  const selectedCareerPath = useAppSelector(selectSelectedCareerPath);
  const careerPaths = useAppSelector(selectCareerPaths);
  const selectedCareerPathId = useAppSelector(selectSelectedCareerPathId);
  const { classes } = overviewStyles();

  return (
    <div style={{ display: 'flex' }}>
      <Navbar height={400} p="xs" width={{ base: 300 }}>
        <Navbar.Section grow mt="md" style={{ display: 'flex', flexDirection: 'column' }}>
          {careerLinks.map((item) => (
            <Button key={`career-path-${item}`} size="xs">
              {item}
            </Button>
          ))}
        </Navbar.Section>
      </Navbar>

      <Container>
        {careerLinks.map((item) => (
          <div>
            <div className={classes.header}>
              Icon
              {item}
            </div>
            <div className={classes.subHeader}>Description</div>
          </div>
        ))}
      </Container>
    </div>
  );
};
