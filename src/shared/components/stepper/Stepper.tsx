import React from 'react';
import MuiStepper from '@mui/material/Stepper';
import { Step, StepLabel } from '@mui/material';

import './stepperStyles.scss';

type StepperItem = {
  label: string;
  error?: boolean;
};

type StepperProps = {
  activeStep: number;
  steps: StepperItem[];
};

export const Stepper = ({ activeStep, steps }: StepperProps) => (
  <MuiStepper activeStep={activeStep} className="stepper">
    {steps.map((item) => (
      <Step key={`stepper-${item.label}`}>
        <StepLabel error={item.error}>{item.label}</StepLabel>
      </Step>
    ))}
  </MuiStepper>
);
