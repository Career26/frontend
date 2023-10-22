import React, { useState } from 'react';

import logo from '@assets/trans-bkg-navy-logo.png';

import { Typewriter } from './TypeWriter';
import './loadingScreen.scss';
import './bounce.css';
import { Image } from '@mantine/core';

type LoadingScreenText = {
  text: string;
  textDelay: number;
  deleteDelay?: number;
  repeatDelay?: number;
};

export const LoadingScreenWithText = ({
  text,
  repeatSequence,
}: {
  repeatSequence?: boolean;
  text: LoadingScreenText[];
}) => {
  const [lineIndex, setLineIndex] = useState(0);

  const onComplete = () => {
    if (lineIndex === text.length - 1 && repeatSequence) {
      setLineIndex(0);
    } else {
      setLineIndex(lineIndex + 1);
    }
  };

  const selectedText = text[lineIndex];

  return (
    <div className="container">
      <div className="bounceContainer">
        <div className="logo">
          <Image src={logo} />
        </div>
        <div className="shadow" />
      </div>
      {selectedText && (
        <div className="typeWriter">
          <h1>
            <Typewriter
              text={selectedText.text}
              textDelay={selectedText.textDelay}
              repeatDelay={selectedText.repeatDelay}
              deleteDelay={selectedText.deleteDelay}
              onComplete={onComplete}
            />
          </h1>
        </div>
      )}
    </div>
  );
};
