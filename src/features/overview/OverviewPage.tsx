import React from 'react';
import { Navbar, Button, createStyles, rem } from '@mantine/core';
import { useActiveNavScroll } from '@shared/hooks/useActiveNavScroll';
import classNames from 'classnames';
import { Shell } from '@shared/components/shell/Shell';
import { HEADER_HEIGHT } from '@shared/components/pageHeader/pageHeaderStyles';
import { ProgressionTile } from '@shared/components/tiles/ProgressionTile';
import { useAppSelector } from '@state/store';
import { selectProfileId, selectSelectedCareerPathId } from '@slices/userSlice';
import { useGetCareerOverviewQuery } from '@apis/overviewApi';
import { LoadingScreen } from '@shared/components/loadingScreen/LoadingScreen';

import { OverviewSection } from './OverviewSection';
import { overviewLinks } from './config/overviewConstants';
import { CareerProgressionTile } from './tiles/careerProgressionTile/CareerProgressionTile';
import { TopEmployersTile } from './tiles/TopEmployersTile';
import { RoleOverviewTile } from './tiles/RoleOverviewTile';
import { OverlapsTile } from './tiles/OverlapsTile';

const NAVBAR_WIDTH = rem(250);

const overviewStyles = createStyles((theme) => ({
  wrapper: {
    '.mantine-AppShell-main': {
      [theme.fn.smallerThan('md')]: {
        '> div': {
          paddingLeft: '0 !important',
        },
      },
    },
  },
  content: {
    height: '420vh',
    flexDirection: 'column',
    paddingLeft: `${NAVBAR_WIDTH} !important`,
    paddingTop: HEADER_HEIGHT,
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
    '> a': {
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

  icon: {
    paddingRight: rem(20),
  },

  subHeader: {
    fontSize: rem(17),
    color: theme.colors.gray[7],
  },
}));

export const OverviewPage = () => {
  const { activeAnchor } = useActiveNavScroll({ navItems: overviewLinks });
  const { classes } = overviewStyles();
  const profileId = useAppSelector(selectProfileId);
  const careerId = useAppSelector(selectSelectedCareerPathId);
  const { data, isFetching } = useGetCareerOverviewQuery(
    { careerId, profileId },
    { skip: !profileId || !careerId },
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <Shell
        navbar={
          <Navbar height={400} p="xs" className={classes.navBar}>
            <Navbar.Section grow mt="md" className={classes.navLink}>
              {overviewLinks.map(({ label, Icon, anchor }) => (
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
          {overviewLinks.map(({ label, Icon, anchor }) => (
            <OverviewSection label={label} Icon={Icon} anchor={anchor} key={`career-${label}`}>
              {anchor === 'progression' && (
                <CareerProgressionTile
                  promotionTimeline={data.promotionTimeline}
                  salaryProgression={data.salaryProgression}
                />
              )}
              {anchor === 'employers' && <TopEmployersTile employers={data.exampleEmployers} />}
              {anchor === 'role' && <RoleOverviewTile roleSummary={data.roleSummary} />}
              {anchor === 'overlaps' && <OverlapsTile careerOverlaps={data.careerOverlaps} />}
              {anchor === 'timeline' && (
                <ProgressionTile
                  progressionList={data.assessmentStages.map((item, index) => ({
                    title: `${index + 1} ${item.stage}`,
                    descriptions: [item.description],
                  }))}
                />
              )}
              {anchor === 'preparation' && (
                <ProgressionTile
                  progressionList={data.supplementalExperiences.map((item) => ({
                    title: `Year ${item.year}`,
                    descriptions: [item.activity],
                  }))}
                />
              )}
            </OverviewSection>
          ))}
        </div>
      </Shell>
    </div>
  );
};
