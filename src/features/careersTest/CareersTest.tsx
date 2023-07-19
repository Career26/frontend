import React, { useMemo, useState } from 'react';
import { ConfirmationDialog } from '@shared/components/dialogs/ConfirmationDialog';
import { Stepper } from '@shared/components/stepper/Stepper';
import { Form, Formik, FormikContextType } from 'formik';

import { CareerRefinement } from './components/careerRefinement/CareerRefinement';
import { TestResult } from './components/testResult/TestResult';
import {
  initialAreasOfInterestValues,
  initialEducationFormValues,
  initialPreviousExperienceFormValues,
} from './config/careersFormConstants';
import {
  areasOfInterestSchema,
  educationFormSchema,
  previousExperienceFormSchema,
} from './config/careersFormSchemas';
import { EducationForm } from './components/forms/EducationForm';
import { PreviousExperienceForm } from './components/forms/PreviousExperienceForm';
import './careersTest.scss';
import {
  AreasOfInterestValues,
  EducationFormValues,
  PreviousExperienceFormValues,
} from './types/careersFormTypes';
import { AreasOfInterestForm } from './components/forms/AreasOfInterestForm';

const steps = [
  { label: 'Education' },
  { label: 'Past Experience' },
  { label: 'Interests' },
  { label: 'Work Preferences' },
  { label: 'Refine Choices' },
];

export const CareersTest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState({});

  const clickNext = (
    formValues: EducationFormValues | PreviousExperienceFormValues | AreasOfInterestValues,
  ) => {
    setActiveStep(activeStep + 1);
    setInputValues({ ...inputValues, ...formValues });
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFormSubmit = () => {
    console.log('submitted');
  };

  const { schema, initialValues } = useMemo(() => {
    if (activeStep === 0) {
      return { schema: educationFormSchema, initialValues: initialEducationFormValues };
    }
    if (activeStep === 1) {
      return {
        schema: previousExperienceFormSchema,
        initialValues: initialPreviousExperienceFormValues,
      };
    }
    return { schema: areasOfInterestSchema, initialValues: initialAreasOfInterestValues };
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
          confirmLabel={activeStep === steps.length ? 'Create Account' : 'Next'}
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
            {activeStep === 2 && (
              <AreasOfInterestForm formik={formik as FormikContextType<AreasOfInterestValues>} />
            )}
            {activeStep === 4 && (
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
