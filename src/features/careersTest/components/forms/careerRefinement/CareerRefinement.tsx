import React from 'react';
import { mockCardData } from '@mocks/careerTestMocks';
import Grid from '@mui/material/Grid';

import { CareerCard } from '@careersTest/components/cards/CareerCard';

type CareerRefinementProps = {
  selectedCardIds: string[];
  setSelectedCardIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export const CareerRefinement = ({
  selectedCardIds,
  setSelectedCardIds,
}: CareerRefinementProps) => {
  const clickAdd = (id: string) => {
    setSelectedCardIds([...selectedCardIds, id]);
  };

  const clickRemove = (id: string) => {
    setSelectedCardIds([...selectedCardIds].filter((cardId) => cardId !== id));
  };

  return (
    <div className="dialogContainer">
      <div className="dialogContent">
        <Grid container spacing={2}>
          {mockCardData.map((card) => (
            <Grid key={`refinement-${card.jobTitle}`} item xs={12} sm={6}>
              <CareerCard
                {...card}
                onClickAdd={() => clickAdd(card.id)}
                onClickRemove={() => clickRemove(card.id)}
                selected={!!selectedCardIds.find((cardId) => cardId === card.id)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
