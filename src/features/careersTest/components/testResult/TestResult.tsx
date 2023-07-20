import { Loader, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { mockCardData } from '@mocks/careerTestMocks';
import Insights from '@mui/icons-material/Insights';
import Task from '@mui/icons-material/Task';
import Science from '@mui/icons-material/Science';

import { CareerCard } from '../cards/CareerCard';

import './testResult.scss';

const FooterItem = ({ icon, info }: { icon: React.ReactNode; info: string }) => (
  <div className="item">
    {icon}
    <div className="info">{info}</div>
  </div>
);

export const TestResult = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dialogContainer">
      <div className="dialogContent">
        <Text fw={700}>Your Results</Text>
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          {mockCardData.map((card, i) => (
            <Grid item key={`refinement-${card.jobTitle}`} sx={{ padding: '8px' }}>
              <CareerCard {...card} locked={i > 3} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="footer">
        Explore more with a free account and get access to
        <div className="items">
          <FooterItem icon={<Science />} info="Interview questions and SJTs" />
          <FooterItem icon={<Task />} info="CV and cover letter refinement" />
          <FooterItem icon={<Insights />} info="Industry insights" />
        </div>
      </div>
    </div>
  );
};
