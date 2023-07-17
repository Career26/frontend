import React, { useEffect, useState } from 'react';
import { ConfirmationDialog } from '@shared/components/dialogs/ConfirmationDialog';
import { Stepper } from '@shared/components/stepper/Stepper';

import { CareerRefinement } from './components/careerRefinement/CareerRefinement';
import { TestResult } from './components/testResult/TestResult';

import './careersTest.scss';

const finalStep = 4;

const steps = [
  { label: 'About you' },
  { label: 'Areas of interest' },
  { label: 'Previous experiences' },
  { label: 'Refine your choices' },
];

export const CareersTest = () => {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

  const clickNext = () => {
    if (activeStep === finalStep) {
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  const checkNextIsDisabled = () => {
    if (activeStep !== 3) {
      return loading;
    }
    return loading || !selectedCardIds.length;
  };

  useEffect(() => {
    if (activeStep === finalStep) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  }, [activeStep]);

  return (
    <ConfirmationDialog
      open
      title="Careers Test"
      onCancel={clickBack}
      onConfirm={clickNext}
      cancelLabel="Back"
      confirmDisabled={checkNextIsDisabled()}
      confirmLabel={activeStep === finalStep && !loading ? 'Create Account' : 'Next'}
      extraClasses="careersTest"
    >
      <Stepper activeStep={activeStep} steps={steps} />
      {activeStep === 3 && (
        <CareerRefinement
          selectedCardIds={selectedCardIds}
          setSelectedCardIds={setSelectedCardIds}
        />
      )}
      {activeStep === 4 && <TestResult />}
    </ConfirmationDialog>
  );
};
