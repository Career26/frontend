import React from 'react';
import { Box, Button, Navbar, ScrollArea } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import {
  IconBuildingBank,
  IconReportSearch,
  IconReportMoney,
  IconUsers,
  IconTrendingUp,
  IconAtom,
  IconCalendarTime,
} from '@tabler/icons-react';
import { usePageNavigation } from '@shared/hooks/usePageNavigation';

import { overviewStyles } from './overviewStyles';

const careerLinks = [
  { label: 'Industry Insights', Icon: IconBuildingBank, anchor: 'industry' },
  { label: 'Role Overview', Icon: IconReportSearch, anchor: 'role' },
  { label: 'Salary Expecation', Icon: IconReportMoney, anchor: 'salary' },
  { label: 'Top Employers', Icon: IconUsers, anchor: 'employers' },
  { label: 'Career Progression', Icon: IconTrendingUp, anchor: 'progression' },
  { label: 'Typical Skills', Icon: IconAtom, anchor: 'skill' },
  { label: 'Application Timeline', Icon: IconCalendarTime, anchor: 'timeline' },
];

export const OverviewPage = () => {
  const { classes } = overviewStyles();
  return (
    <Shell>
      <>
        <Navbar
          height={400}
          p="xs"
          className={classes.navBar}
          style={{ marginTop: '0 !important' }}
        >
          <Navbar.Section grow mt="md" className={classes.navLink}>
            {careerLinks.map(({ label, Icon, anchor }) => (
              <a href={`#${anchor}`} key={`link-${label}`}>
                <div className={classes.icon}>
                  <Icon />
                </div>
                {label}
              </a>
            ))}
          </Navbar.Section>
        </Navbar>

        <ScrollArea>
          <div className={classes.pageContent}>
            {careerLinks.map(({ label, Icon, anchor }) => (
              <div className={classes.section} key={`career-${label}`}>
                <a id={anchor}>
                  <div className={classes.header}>
                    <Icon />
                    {label}
                  </div>
                  <div className={classes.subHeader}>Description</div>
                </a>
              </div>
            ))}
          </div>
        </ScrollArea>
      </>
    </Shell>
  );
};
