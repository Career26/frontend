import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Group,
  Indicator,
  Loader,
  Modal,
  Stepper,
} from '@mantine/core';
import { ChoiceRefinement } from './components/choiceRefinement/ChoiceRefinement';

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
      <Stepper active={activeStep} onStepClick={setActiveStep} breakpoint="sm">
        <Stepper.Step label="About you" description="Who are you?" />
        <Stepper.Step label="Areas of interest" description="What excites you?" />
        <Stepper.Step label="Previous experiences" description="What have you done?" />
        <Stepper.Step label="Refine your choices" description="What industries suit you?">
          <ChoiceRefinement />
        </Stepper.Step>
        <Stepper.Completed>
          {!loading && (
            <>
              <div>*--Results Diagram here here--*</div>
              <div>
                Create a FREE account now to explore your potential careers
                <li>Discover industry insights</li>
                <li>Get access to real interview quesitons</li>
                <li>Refine your CV and cover letter</li>
              </div>
            </>
          )}
          {loading && <Loader />}
        </Stepper.Completed>
      </Stepper>
      <Group position="apart" mt="xl">
        <Button variant="default" onClick={clickBack} disabled={activeStep === 0 || loading}>
          Back
        </Button>
        <Button onClick={clickNext} disabled={loading}>
          {activeStep === finalStep && !loading ? 'Create Account' : 'Next'}
        </Button>
      </Group>
    </Modal>
  );
};
