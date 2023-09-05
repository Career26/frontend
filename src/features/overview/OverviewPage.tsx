import React from 'react';
import { Button, Navbar, ScrollArea } from '@mantine/core';
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
import { useActiveNavScroll } from '@shared/hooks/useActiveNavScroll';
import classNames from 'classnames';

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
  const { activeAnchor } = useActiveNavScroll({ navItems: careerLinks });
  const { classes } = overviewStyles();

  return (
    <Shell>
      <>
        <Navbar height={400} p="xs" className={classes.navBar}>
          <ScrollArea>
            <Navbar.Section grow mt="md" className={classes.navLink}>
              {careerLinks.map(({ label, Icon, anchor }) => (
                <a href={`#${anchor}`} key={`link-${label}`}>
                  <Button
                    className={classNames(classes.navButton, {
                      [classes.active]: activeAnchor === anchor,
                    })}
                  >
                    <div className={classes.icon}>
                      <Icon />
                    </div>
                    {label}
                  </Button>
                </a>
              ))}
            </Navbar.Section>
          </ScrollArea>
        </Navbar>

        <ScrollArea>
          <div className={classes.content}>
            {careerLinks.map(({ label, Icon, anchor }) => (
              <div className={classes.section} key={`career-${label}`} id={anchor}>
                <div className={classes.header}>
                  <Icon />
                  {label}
                </div>
                <div className={classes.subHeader}>Description</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </>
    </Shell>
  );
};
