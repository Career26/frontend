import { Grid, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import { RefinementCard } from './RefinementCard';

type ChoiceRefinementProps = {};

const mockChoiceData = [1, 2, 3, 4, 5, 6, 7, 8].map((_i, j) => ({
  header: `Indudstry ${j}`,
  info: `Info about industry ${j} blah blah blah blah blah blah blah blah blah`,
}));

export const ChoiceRefinement = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Grid>
      {mockChoiceData.map((choice) => (
        <Grid.Col md={6} lg={3} key={`refinement-${choice.header}`}>
          <RefinementCard {...choice} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
