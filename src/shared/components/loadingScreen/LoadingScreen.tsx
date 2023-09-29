import React from 'react';
import { Image } from '@mantine/core';

import magnifyingGlass from './magnifying-glass.svg';

import './loadingScreen.scss';

export const LoadingScreen = () => (
  <div className="splash">
    <div className="circle">
      <Image className="magnifying-glass" src={magnifyingGlass} alt="Magnifying Glass" />
    </div>
  </div>
);
