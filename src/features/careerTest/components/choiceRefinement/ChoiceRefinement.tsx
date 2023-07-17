import { Grid, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { mockCardData } from '@mocks/careerTestMocks';

import { RefinementCard } from './RefinementCard';

const checkIsSelected = (id: string, selectedCardIds: string[]) =>
  !!selectedCardIds.find((cardId) => cardId === id);

export const ChoiceRefinement = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

  const clickCard = (id: string) => {
    const isSelected = checkIsSelected(id, selectedCardIds);
    if (isSelected) {
      const newSelection = selectedCardIds.filter((cardId) => cardId !== id);
      setSelectedCardIds(newSelection);
    } else {
      setSelectedCardIds([...selectedCardIds, id]);
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Grid>
      {mockCardData.map((card) => (
        <Grid.Col md={4} lg={4} key={`refinement-${card.header}`}>
          <RefinementCard
            {...card}
            onClick={() => clickCard(card.id)}
            selected={checkIsSelected(card.id, selectedCardIds)}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};
