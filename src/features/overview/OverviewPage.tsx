import React from 'react';
import { CareerPathNavigation } from '@shared/components/careerPathNavigation/CareerPathNavigation';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';
import { useAppSelector } from '@state/store';
import {
  selectCareerPaths,
  selectSelectedCareerPath,
  selectSelectedCareerPathId,
} from '@slices/careerPathsSlice';
import { Box, Button, Container, Navbar, ScrollArea } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import { LandingPage } from '../landingPage/LandingPage';
import { Feature } from '@shared/components/feature/Feature';
import { landingPageStyles } from '../landingPage/landinPageStyles';
import { overviewStyles } from './overviewStyles';

import {
  IconBuildingBank,
  IconReportSearch,
  IconReportMoney,
  IconUsers,
  IconTrendingUp,
  IconAtom,
  IconCalendarTime,
} from '@tabler/icons-react';

const careerLinks = [
  { label: 'Industry Insights', Icon: IconBuildingBank },
  { label: 'Role Overview', Icon: IconReportSearch },
  { label: 'Salary Expecation', Icon: IconReportMoney },
  { label: 'Top Employers', Icon: IconUsers },
  { label: 'Career Progression', Icon: IconTrendingUp },
  { label: 'Typical Skills', Icon: IconAtom },
  { label: 'Application Timeline', Icon: IconCalendarTime },
];

export const OverviewPage = () => {
  const selectedCareerPath = useAppSelector(selectSelectedCareerPath);
  const careerPaths = useAppSelector(selectCareerPaths);
  const selectedCareerPathId = useAppSelector(selectSelectedCareerPathId);
  const { classes } = overviewStyles();

  return (
    <div style={{ display: 'flex' }}>
      <Navbar height={400} p="xs" className={classes.navBar}>
        <Navbar.Section grow mt="md" className={classes.navLink}>
          {careerLinks.map(({ label, Icon }) => (
            <Button leftIcon={<Icon />} key={`career-path-${label}`} size="xs">
              {label}
            </Button>
          ))}
        </Navbar.Section>
      </Navbar>

      <div className={classes.pageContent}>
        <ScrollArea>
          {careerLinks.map(({ label, Icon }) => (
            <div className={classes.section} key={`career-${label}`}>
              <div className={classes.header}>
                <Icon />
                {label}
              </div>
              <div className={classes.subHeader}>Description</div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
