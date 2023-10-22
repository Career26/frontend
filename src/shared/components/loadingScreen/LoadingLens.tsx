import React from 'react';
import logo from '@assets/trans-bkg-navy-logo.png';
import './bounce.css';
import { Image } from '@mantine/core';

export const LoadingLens = () => (
  <div className="bounceContainer">
    <div className="logo">
      <Image src={logo} h="20vh" w="20vh" />
    </div>
  </div>
);
