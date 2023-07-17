import { Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { mockCardData } from '@mocks/careerTestMocks';
import Grid from '@mui/material/Grid';

import { CareerCard } from '../careerCard/CareerCard';

type CareerRefinementProps = {
  selectedCardIds: string[];
  setSelectedCardIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const checkIsSelected = (id: string, selectedCardIds: string[]) =>
  !!selectedCardIds.find((cardId) => cardId === id);

export const CareerRefinement = ({
  selectedCardIds,
  setSelectedCardIds,
}: CareerRefinementProps) => {
  const [loading, setLoading] = useState(true);

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
    <div className="dialogContainer">
      <div className="dialogContent">
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          {mockCardData.map((card) => (
            <Grid item key={`refinement-${card.jobTitle}`} sx={{ padding: '8px' }}>
              <CareerCard
                {...card}
                onClick={() => clickCard(card.id)}
                selected={checkIsSelected(card.id, selectedCardIds)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
