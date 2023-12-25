import { Card, Container, Group, Text } from '@mantine/core';

import { useAppSelector } from '@state/store';
import { selectSelectedCareerPath, selectSelectedCareerPathId } from '@slices/sessionSlice';
import { useGetCareerOverviewQuery } from '@apis/overviewApi';
import { selectProfileId } from '@apis/profileApi';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import { LoaderWithText } from '@shared/components/loadingScreen/LoaderWithText';
import { Shell } from '@shared/components/shell/Shell';
import { CareerProgressionTile } from '@overview/careerProgressionTile/CareerProgressionTile';
import { TopEmployersTile } from '@overview/TopEmployersTile';
import { OverlapsTile } from '@overview/OverlapsTile';
import { OverviewNavBar } from '@overview/OverviewNavBar';
import { ProgressionTile } from '@overview/ProgressionTile';
import { RoleSummaryTile } from '@overview/RoleSummaryTile';

import { overviewLinks } from '@shared/constants/overviewConstants';

const Index = () => {
  const { isMobile } = useMobileStyles();
  const profileId = useAppSelector(selectProfileId) || '';
  const careerId = useAppSelector(selectSelectedCareerPathId);
  const careerPath = useAppSelector(selectSelectedCareerPath);
  const { data, isFetching } = useGetCareerOverviewQuery(
    { careerId, profileId },
    { skip: !profileId || !careerId },
  );

  if (isFetching) {
    return (
      <Shell navbar={!isMobile ? <OverviewNavBar /> : undefined}>
        <LoaderWithText
          text={[
            `Fetching insights for ${careerPath?.title}...`,
            `This can take up to 30 seconds...`,
          ]}
        />
      </Shell>
    );
  }

  return (
    <Shell navbar={!isMobile ? <OverviewNavBar /> : undefined}>
      <>
        {overviewLinks.map(({ label, Icon, anchor }) => {
          if (!data) {
            return null;
          }
          return (
            <Container py="md" key={`career-${label}`}>
              <Card padding="lg" radius="md" withBorder>
                <Card.Section withBorder inheritPadding py="xs" bg="navy" c="white">
                  <Group>
                    <Icon size={35} stroke={1} />
                    <Text fw="bold" size="xl">
                      {label}
                    </Text>
                  </Group>
                </Card.Section>
                {anchor === 'role' && <RoleSummaryTile {...data.roleSummary} />}
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
          );
        })}
      </>
    </Shell>
  );
};

export default Index;
