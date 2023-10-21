import React from 'react';
import { Button, AppShell } from '@mantine/core';
import { useActiveNavScroll } from '@shared/hooks/useActiveNavScroll';
import classNames from 'classnames';
import { Shell } from '@shared/components/shell/Shell';
import { ProgressionTile } from '@shared/components/tiles/ProgressionTile';
import { useAppSelector } from '@state/store';
import { selectSelectedCareerPathId } from '@slices/sessionSlice';
import { useGetCareerOverviewQuery } from '@apis/overviewApi';
import navStyles from '@shared/styles/navStyles.module.scss';
import featureStyles from '@shared/styles/featureStyles.module.scss';
import { selectProfileId } from '@apis/profileApi';
import { LoadingLens } from '@shared/components/loadingScreen/LoadingLens';

import { OverviewSection } from './OverviewSection';
import { overviewLinks } from './config/overviewConstants';
import { CareerProgressionTile } from './tiles/careerProgressionTile/CareerProgressionTile';
import { TopEmployersTile } from './tiles/TopEmployersTile';
import { RoleOverviewTile } from './tiles/RoleOverviewTile';
import { OverlapsTile } from './tiles/OverlapsTile';
import styles from './overviewStyles.module.scss';

export const OverviewPage = () => {
  const { activeAnchor } = useActiveNavScroll({ navItems: overviewLinks });
  const profileId = useAppSelector(selectProfileId) || '';
  const careerId = useAppSelector(selectSelectedCareerPathId);
  const { data, isFetching } = useGetCareerOverviewQuery(
    { careerId, profileId },
    { skip: !profileId || !careerId },
  );

  if (isFetching) {
    return <LoadingLens />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={featureStyles.wrapper}>
      <Shell
        navbar={
          <AppShell.Navbar h={400} p="xs" className={navStyles.navBar}>
            <AppShell.Section grow mt="md" className={navStyles.navLink}>
              {overviewLinks.map(({ label, Icon, anchor }) => (
                <a href={`#${anchor}`} key={`link-${label}`} className={navStyles.linkAction}>
                  <Button
                    className={classNames(navStyles.navButton, {
                      [navStyles.active]: activeAnchor === anchor,
                    })}
                  >
                    <div className={styles.icon}>
                      <Icon />
                    </div>
                    {label}
                  </Button>
                </a>
              ))}
            </AppShell.Section>
          </AppShell.Navbar>
        }
      >
        <div className={featureStyles.content}>
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
