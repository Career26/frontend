import { useEffect, useState } from 'react';

import styles from './loadingScreen.module.css';

interface TypeSomethingProps {
  text: string;
  textDelay: number;
  repeatDelay?: number;
  deleteDelay?: number;
  onComplete?: () => void;
}

const TypeSomething = ({
  text,
  textDelay,
  repeatDelay,
  deleteDelay,
  onComplete,
}: TypeSomethingProps) => {
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

export const TypeWriter = ({
  text,
  repeatSequence,
}: {
  repeatSequence?: boolean;
  text: string[];
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
    <div className={styles.container}>
      {selectedText && (
        <div className={styles.typeWriter}>
          <h1>
            <TypeSomething
              text={selectedText}
              textDelay={40}
              repeatDelay={1000}
              deleteDelay={2000}
              onComplete={onComplete}
            />
          </h1>
        </div>
      )}
    </div>
  );
};
