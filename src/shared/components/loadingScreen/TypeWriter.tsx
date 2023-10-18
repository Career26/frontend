import React, { useEffect, useState } from 'react';

export const Typewriter = ({
  text,
  textDelay,
  repeatDelay,
  deleteDelay,
  onComplete,
}: {
  text: string;
  textDelay: number;
  repeatDelay?: number;
  deleteDelay?: number;
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
