import { Grid, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import { RefinementCard } from './RefinementCard';
import { CardInformation } from './choiceRefinementTypes';

type ChoiceRefinementProps = {};

const mockCardData: CardInformation[] = [1, 2, 3, 4, 5, 6, 7, 8].map((_i, j) => ({
  id: String(j),
  header: `Indudstry ${j}`,
  info: `Info about industry ${j} blah blah blah blah blah blah blah blah blah`,
}));

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
        <Grid.Col md={6} lg={3} key={`refinement-${card.header}`}>
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
