import React from 'react';
import { Shell } from '@shared/components/shell/Shell';
import { ProgressionTile } from '@shared/components/tiles/ProgressionTile';
import { useAppSelector } from '@state/store';
import { selectSelectedCareerPathId } from '@slices/sessionSlice';
import { useGetCareerOverviewQuery } from '@apis/overviewApi';
import featureStyles from '@shared/styles/featureStyles.module.scss';
import { selectProfileId } from '@apis/profileApi';
import { LoadingLens } from '@shared/components/loadingScreen/LoadingLens';

import { OverviewSection } from './OverviewSection';
import { overviewLinks } from './config/overviewConstants';
import { CareerProgressionTile } from './tiles/careerProgressionTile/CareerProgressionTile';
import { TopEmployersTile } from './tiles/TopEmployersTile';
import { RoleOverviewTile } from './tiles/RoleOverviewTile';
import { OverlapsTile } from './tiles/OverlapsTile';
import { OverviewNavBar } from './OverviewNavBar';

export const OverviewPage = () => {
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
      <Shell navbar={<OverviewNavBar />}>
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
