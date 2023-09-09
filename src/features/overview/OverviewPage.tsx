import React from 'react';
import { Navbar, Button } from '@mantine/core';
import { useActiveNavScroll } from '@shared/hooks/useActiveNavScroll';
import classNames from 'classnames';
import { Shell } from '@shared/components/shell/Shell';
import {
  IconAtom,
  IconBuildingBank,
  IconCalendarTime,
  IconReportMoney,
  IconReportSearch,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';

import { overviewStyles } from './overviewStyles';
import { OverviewSection } from './OverviewSection';

export const careerLinks = [
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
    <Shell
      navbar={
        <Navbar height={400} p="xs" className={classes.navBar}>
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
        </Navbar>
      }
    >
      <div className={classes.content}>
        {careerLinks.map(({ label, Icon, anchor }) => (
          <OverviewSection label={label} Icon={Icon} anchor={anchor} key={`career-${label}`} />
        ))}
      </div>
    </Shell>
  );
};
