import React from 'react';
import logo from '@assets/logo.png';
import c26 from '@assets/career-26.png';
import { Image, Loader } from '@mantine/core';

import './loadingScreen.scss';

export const LoadingLens = () => (
  <div className="lensContainer">
    <div className="logoContainer">
      <Image src={logo} h={70} w="auto" fit="contain" className="logo" />
      <Image src={c26} h={80} w="auto" fit="contain" className="title" />
      <Loader color="blue" type="dots" className="dots" size="xl" />
    </div>
  </div>
);
