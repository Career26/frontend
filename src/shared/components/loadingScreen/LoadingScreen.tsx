import React, { useEffect, useState } from 'react';
import { Image } from '@mantine/core';
import magnifyingGlass from '@assets/magnifyingGlass.svg';

import './loadingScreen.scss';
import './bounce.css';

const Typewriter = ({
  text,
  textDelay,
  repeatDelay,
  deleteDelay,
  onComplete,
}: {
  text: string;
  textDelay: number;
  repeatDelay: number;
  deleteDelay: number;
  onComplete?: () => void;
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex === -1 && onComplete) {
      onComplete();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === text.length && !isComplete) {
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, deleteDelay);
      return () => clearTimeout(timeout);
    }
    if (currentIndex < text.length && !isComplete) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, textDelay);
      return () => clearTimeout(timeout);
    }
    if (currentIndex > -1) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText.slice(0, -1));
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }, textDelay);
      return () => clearTimeout(timeout);
    }
    if (currentIndex === -1) {
      const timeout = setTimeout(() => {
        setIsComplete(false);
        setCurrentIndex(0);
      }, repeatDelay);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [currentIndex, repeatDelay, textDelay, text, isComplete, deleteDelay]);

  return <span>{currentText}</span>;
};

export default Typewriter;

export const LoadingScreen = () => {
  const lines = ['line 1...', 'item 2...', 'dave...'];
  const [lineIndex, setLineIndex] = useState(0);

  const onComplete = () => {
    setLineIndex(lineIndex + 1);
  };

  return (
    <div className="container">
      <div className="bounceContainer">
        <div className="logo" />
        <div className="shadow" />
      </div>
      <div>
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
