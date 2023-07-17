import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Modal, Stepper } from '@mantine/core';
import { StepperButtons } from '@shared/components/StepperButtons';

import { ChoiceRefinement } from './components/choiceRefinement/ChoiceRefinement';
import { TestResult } from './components/testResult/TestResult';

const finalStep = 4;

export const CareerTest = () => {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const metaDataForm = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      degree: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const clickNext = () => {
    if (activeStep === finalStep) {
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (activeStep === finalStep) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  }, [activeStep]);

  return (
    <Modal opened title="Careers Test" onClose={() => {}} withCloseButton={false} size="auto">
      <Stepper active={activeStep} onStepClick={setActiveStep} size="auto">
        <Stepper.Step label="About you" />
        <Stepper.Step label="Areas of interest" />
        <Stepper.Step label="Previous experiences" />
        <Stepper.Step label="Refine your choices">
          <ChoiceRefinement />
        </Stepper.Step>
        <Stepper.Completed>
          <TestResult />
        </Stepper.Completed>
      </Stepper>
      <StepperButtons
        clickBack={clickBack}
        clickNext={clickNext}
        loading={loading}
        nextLabel={activeStep === finalStep && !loading ? 'Create Account' : 'Next'}
      />
    </Modal>
  );
};
