import React from 'react';
import { Shell } from '@shared/components/shell/Shell';
import { useAppSelector } from '@state/store';
import { selectSelectedCareerPath, selectSelectedCareerPathId } from '@slices/sessionSlice';
import { useGetCareerOverviewQuery } from '@apis/overviewApi';
import { selectProfileId } from '@apis/profileApi';
import { Card, Container, Group, Text } from '@mantine/core';
import { LoaderWithText } from '@shared/components/loadingScreen/LoaderWithText';

import { overviewLinks } from './config/overviewConstants';
import { CareerProgressionTile } from './tiles/careerProgressionTile/CareerProgressionTile';
import { TopEmployersTile } from './tiles/TopEmployersTile';
import { OverlapsTile } from './tiles/OverlapsTile';
import { OverviewNavBar } from './OverviewNavBar';
import { ProgressionTile } from './tiles/ProgressionTile';

export const OverviewPage = () => {
  const profileId = useAppSelector(selectProfileId) || '';
  const careerId = useAppSelector(selectSelectedCareerPathId);
  const careerPath = useAppSelector(selectSelectedCareerPath);
  const { data, isFetching } = useGetCareerOverviewQuery(
    { careerId, profileId },
    { skip: !profileId || !careerId },
  );

  if (isFetching) {
    return (
      <Shell navbar={<OverviewNavBar />}>
        <LoaderWithText
          text={[
            {
              text: `Fetching insights for ${careerPath?.title}...`,
              textDelay: 40,
              repeatDelay: 1000,
              deleteDelay: 2000,
            },
            {
              text: `This can take up to 10 seconds...`,
              textDelay: 40,
              repeatDelay: 1000,
              deleteDelay: 2000,
            },
          ]}
        />
      </Shell>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Shell navbar={<OverviewNavBar />}>
      <>
        {overviewLinks.map(({ label, Icon, anchor }) => (
          <Container py="md" key={`career-${label}`}>
            <Card padding="lg" radius="md" withBorder>
              <Card.Section withBorder inheritPadding py="xs" bg="navy" c="white">
                <Group>
                  <Icon size={50} />
                  <Text fw="bold" size="2rem">
                    {label}
                  </Text>
                </Group>
              </Card.Section>
              {anchor === 'role' && (
                <Text py="md" id="role">
                  {data.roleSummary}
                </Text>
              )}
              {anchor === 'employers' && <TopEmployersTile employers={data.exampleEmployers} />}
              {anchor === 'progression' && (
                <CareerProgressionTile
                  promotionTimeline={data.promotionTimeline}
                  salaryProgression={data.salaryProgression}
                />
              )}
              {anchor === 'preparation' && (
                <ProgressionTile
                  progressionList={data.supplementalExperiences.map((item) => ({
                    title: `Year ${item.year}`,
                    descriptions: [item.activity],
                  }))}
                  id="preparation"
                />
              )}
              {anchor === 'timeline' && (
                <ProgressionTile
                  progressionList={data.assessmentStages.map((item, index) => ({
                    title: `${index + 1} ${item.stage}`,
                    descriptions: [item.description],
                  }))}
                  id="timeline"
                />
              )}
              {anchor === 'overlaps' && <OverlapsTile careerOverlaps={data.careerOverlaps} />}
            </Card>
          </Container>
        ))}
      </>
    </Shell>
  );
};
