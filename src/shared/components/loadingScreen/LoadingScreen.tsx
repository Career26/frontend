import React, { useState } from 'react';

import './loadingScreen.scss';
import './bounce.css';
import { Typewriter } from './TypeWriter';

export const LoadingScreen = () => {
  const lines = ['line 1...', 'item 2...', 'dave...'];
  const [lineIndex, setLineIndex] = useState(0);

  const onComplete = () => {
    setLineIndex(lineIndex + 1);
  };

  return (
    <div className="container">
      <div className="bounceContainer">
        <div className="logo">LOGO HERE</div>
        <div className="shadow" />

        <h1>
          <Typewriter
            text={lines[lineIndex] || ''}
            textDelay={50}
            repeatDelay={1000}
            deleteDelay={3000}
            onComplete={onComplete}
          />
        </h1>
      </div>
    </div>
  );
};
