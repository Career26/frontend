import React from 'react';
import { Navbar, Button, createStyles, rem } from '@mantine/core';
import { useActiveNavScroll } from '@shared/hooks/useActiveNavScroll';
import classNames from 'classnames';
import { Shell } from '@shared/components/shell/Shell';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';

import { OverviewSection } from './OverviewSection';
import { careerLinks } from './config/overviewConstants';

const NAVBAR_WIDTH = rem(250);

const overviewStyles = createStyles((theme) => ({
  content: {
    height: '420vh',
    flexDirection: 'column',
    paddingLeft: `${NAVBAR_WIDTH} !important`,
    paddingTop: HEADER_HEIGHT,
  },
  navBar: {
    width: NAVBAR_WIDTH,
    height: `calc(100% - ${HEADER_HEIGHT})`,
  },

  navLink: {
    display: 'flex',
    flexDirection: 'column',
    '> a': {
      textDecoration: 'none',
      ':not(:first-child)': { paddingTop: rem(20) },
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

  icon: {
    paddingRight: rem(20),
  },

  subHeader: {
    fontSize: rem(17),
    color: theme.colors.gray[7],
  },
}));

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
