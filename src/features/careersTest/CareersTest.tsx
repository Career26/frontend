import React, { useState } from 'react';
import { ConfirmationDialog } from '@shared/components/dialogs/ConfirmationDialog';
import { Stepper } from '@shared/components/stepper/Stepper';
import { Form, Formik } from 'formik';

import { initialCareersTestFormValues } from './config/careersFormConstants';
import {
  educationFormSchema,
  preferencesFormSchema,
  previousExperienceFormSchema,
  refinementSchema,
} from './config/careersFormSchemas';
import { EducationForm } from './components/forms/education/EducationForm';
import { PreviousExperienceForm } from './components/forms/previousExperience/PreviousExperienceForm';
import { PreferencesForm } from './components/forms/preferences/PreferencesForm';

import { CareersFormValues } from './types/careersFormTypes';

import './careersTest.scss';

const steps = [
  { label: 'Education' },
  { label: 'Past Experience' },
  { label: 'Preferences' },
  { label: 'Refine Choices' },
];

const getSchema = (activeStep: number) => {
  if (activeStep === 0) {
    return educationFormSchema;
  }
  if (activeStep === 1) {
    return previousExperienceFormSchema;
  }
  if (activeStep === 2) {
    return preferencesFormSchema;
  }
  return refinementSchema;
};

export const CareersTest = () => {
  const [activeStep, setActiveStep] = useState(0);

  const schema = getSchema(activeStep);

  const handleFormSubmit = (values: CareersFormValues) => {
    console.log('submitted with', values);
  };

  const clickNext = (values: CareersFormValues) => {
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      handleFormSubmit(values);
    }
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialCareersTestFormValues}
      onSubmit={handleFormSubmit}
    >
      {(formik) => (
        <ConfirmationDialog
          open
          title={<Stepper activeStep={activeStep} steps={steps} />}
          onCancel={clickBack}
          onConfirm={() => {
            clickNext(formik.values);
          }}
          confirmDisabled={!Object.values(formik.touched).some((item) => item) || !formik.isValid}
          ignoreCancelButton={activeStep === 0}
          cancelLabel="Back"
          confirmLabel={activeStep === steps.length ? 'Create Account' : 'Next'}
          extraClasses="careersTest"
        >
          <Form>
            {activeStep === 0 && <EducationForm formik={formik} />}
            {activeStep === 1 && <PreviousExperienceForm formik={formik} />}
            {activeStep === 2 && <PreferencesForm formik={formik} />}
            {/* {activeStep === 3 && <CareerRefinement formik={formik} />} */}
          </Form>
        </ConfirmationDialog>
      )}
    </Formik>
  );
};
