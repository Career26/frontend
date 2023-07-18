import React, { useEffect, useState } from 'react';
import { ConfirmationDialog } from '@shared/components/dialogs/ConfirmationDialog';
import { Stepper } from '@shared/components/stepper/Stepper';
import { Formik, Form, FormikContextType } from 'formik';

import { CareerRefinement } from './components/careerRefinement/CareerRefinement';
import { TestResult } from './components/testResult/TestResult';
import { initialCareersFormValues } from './config/careersFormConstants';
import { CareersTestFormValues } from './careersTestTypes';
import { educationFormSchema } from './config/careersFormSchemas';
import { EducationForm } from './components/forms/EducationForm';

import './careersTest.scss';

const steps = [
  { label: 'Education' },
  { label: 'Past Experience' },
  { label: 'Interests' },
  { label: 'Work Preferences' },
  { label: 'Work-life Balance' },
  { label: 'Refine Choices' },
];

const finalStep = steps.length;

export const CareersTest = () => {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

  const clickNext = (values: CareersTestFormValues) => {
    console.log(values);
    setActiveStep(activeStep + 1);
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFormSubmit = () => {
    console.log('submitted');
    setActiveStep(activeStep + 1);
  };

  const getValidationSchema = () => {
    if (activeStep === 0) {
      return educationFormSchema;
    }
    return undefined;
  };

  useEffect(() => {
    if (activeStep === finalStep) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  }, [activeStep]);

  return (
    <Formik
      validationSchema={getValidationSchema()}
      initialValues={initialCareersFormValues}
      onSubmit={handleFormSubmit}
    >
      {(formik) => (
        <ConfirmationDialog
          open
          title="Careers Test"
          onCancel={clickBack}
          onConfirm={() => clickNext(formik.values)}
          cancelLabel="Back"
          confirmDisabled={!formik.isValid || loading}
          confirmLabel={activeStep === finalStep && !loading ? 'Create Account' : 'Next'}
          extraClasses="careersTest"
        >
          <Stepper activeStep={activeStep} steps={steps} />
          <Form>
            {activeStep === 0 && <EducationForm formik={formik} />}
            {activeStep === 3 && (
              <CareerRefinement
                selectedCardIds={selectedCardIds}
                setSelectedCardIds={setSelectedCardIds}
              />
            )}
            {activeStep === 4 && <TestResult />}
          </Form>
        </ConfirmationDialog>
      )}
    </Formik>
  );
};
