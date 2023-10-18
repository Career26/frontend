import React, { useState } from 'react';

import './loadingScreen.scss';
import './bounce.css';
import { Typewriter } from './TypeWriter';

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
        <div className="logo">LOGO HERE</div>
        <div className="shadow" />

        {selectedText && (
          <h1>
            <Typewriter
              text={selectedText.text}
              textDelay={selectedText.textDelay}
              repeatDelay={selectedText.repeatDelay}
              deleteDelay={selectedText.deleteDelay}
              onComplete={onComplete}
            />
          </h1>
        )}
      </div>
    </div>
  );
};
