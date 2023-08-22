import { PageHeader } from '@shared/components/pageHeader/PageHeader';
import React from 'react';
import { CareerPathNavigation } from '@shared/components/careerPathNavigation/CareerPathNavigation';

import { featuresTag, pricingTag } from '../landingPage/config/landingPageConstants';

export const OverviewPage = () => (
  <>
    <PageHeader
      links={[
        { label: 'Features', link: `#${featuresTag}` },
        { label: 'Pricing', link: `#${pricingTag}` },
      ]}
    />
    <CareerPathNavigation />
  </>
);
