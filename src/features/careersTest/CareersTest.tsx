import React, { useMemo, useState } from 'react';
import { ConfirmationDialog } from '@shared/components/dialogs/ConfirmationDialog';
import { Stepper } from '@shared/components/stepper/Stepper';
import { Form, Formik, FormikContextType } from 'formik';

import { CareerRefinement } from './components/careerRefinement/CareerRefinement';
import { TestResult } from './components/testResult/TestResult';
import {
  initialEducationFormValues,
  initialPreviousExperienceFormValues,
} from './config/careersFormConstants';
import { companyFormSchema, educationFormSchema } from './config/careersFormSchemas';
import { EducationForm } from './components/forms/EducationForm';
import { PreviousExperienceForm } from './components/forms/PreviousExperienceForm';
import './careersTest.scss';
import { EducationFormValues, PreviousExperienceFormValues } from './careersTestTypes';

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
  const [inputValues, setInputValues] = useState({});

  const clickNext = (formValues: EducationFormValues | PreviousExperienceFormValues) => {
    console.log(formValues);
    setActiveStep(activeStep + 1);
    setInputValues({ ...inputValues, ...formValues });
    console.log(activeStep);
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFormSubmit = () => {
    console.log('submitted');
    setActiveStep(activeStep + 1);
  };

  const { schema, initialValues } = useMemo(() => {
    if (activeStep === 0) {
      return { schema: educationFormSchema, initialValues: initialEducationFormValues };
    }
    // if (activeStep === 1) {
    return { schema: companyFormSchema, initialValues: initialPreviousExperienceFormValues };
  }, [activeStep]);

  return (
    <Formik validationSchema={schema} initialValues={initialValues} onSubmit={handleFormSubmit}>
      {(formik) => (
        <ConfirmationDialog
          open
          title="Careers Test"
          onCancel={clickBack}
          onConfirm={() => clickNext(formik.values)}
          cancelLabel="Back"
          confirmDisabled={loading}
          confirmLabel={activeStep === finalStep && !loading ? 'Create Account' : 'Next'}
          extraClasses="careersTest"
        >
          <Stepper activeStep={activeStep} steps={steps} />
          <Form>
            {activeStep === 0 && (
              <EducationForm formik={formik as FormikContextType<EducationFormValues>} />
            )}
            {activeStep === 1 && (
              <PreviousExperienceForm
                formik={formik as FormikContextType<PreviousExperienceFormValues>}
              />
            )}
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
