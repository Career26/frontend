import { Grid, List, Loader, ScrollArea, Text, ThemeIcon } from '@mantine/core';
import { IconFileAnalytics, IconSearch, IconTool } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { mockTestResultData } from '@mocks/careerTestMocks';

import { ResultCard } from './ResultCard';

const reasonsToExplore = [
  { label: 'Interview quesitons for Video and SJT', icon: <IconFileAnalytics /> },
  { label: 'CV and cover letter refinement', icon: <IconTool /> },
  { label: 'Industry overviews and insights', icon: <IconSearch /> },
];

export const TestResult = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Text fw={700}>Your Results</Text>
      <ScrollArea h={300}>
        <Grid>
          {mockTestResultData.map((result, i) => (
            <Grid.Col md={6} lg={6} key={`test-result-${result.id}`}>
              <ResultCard {...result} disabled={i > 2} />
            </Grid.Col>
          ))}
        </Grid>
      </ScrollArea>

      <Text>Explore more with a free account and get access to</Text>
      <List>
        {reasonsToExplore.map((reasonToExplore) => (
          <List.Item
            key={reasonToExplore.label}
            icon={<ThemeIcon>{reasonToExplore.icon}</ThemeIcon>}
          >
            {reasonToExplore.label}
          </List.Item>
        ))}
      </List>
    </>
  );
};
