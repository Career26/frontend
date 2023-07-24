import React, { useMemo, useState } from 'react';
import { ConfirmationDialog } from '@shared/components/dialogs/ConfirmationDialog';
import { Stepper } from '@shared/components/stepper/Stepper';
import { Form, Formik, FormikContextType } from 'formik';

import { CareerRefinement } from './components/forms/careerRefinement/CareerRefinement';
import {
  initialEducationFormValues,
  initialPreviousExperienceFormValues,
  initialPreferencesValues,
  initialRefinementFormValues,
} from './config/careersFormConstants';
import {
  educationFormSchema,
  preferencesFormSchema,
  previousExperienceFormSchema,
  refinementSchema,
} from './config/careersFormSchemas';
import { EducationForm } from './components/forms/education/EducationForm';
import { PreviousExperienceForm } from './components/forms/previousExperience/PreviousExperienceForm';
import './careersTest.scss';
import {
  AreasOfInterestFormValues,
  EducationFormValues,
  PreferencesFormValues,
  PreviousExperienceFormValues,
  RefinementFormValues,
} from './types/careersFormTypes';
import { PreferencesForm } from './components/forms/preferences/PreferencesForm';

const steps = [
  { label: 'Education' },
  { label: 'Past Experience' },
  { label: 'Preferences' },
  { label: 'Refine Choices' },
];

export const CareersTest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState({});

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
    if (activeStep === 2) {
      return { schema: preferencesFormSchema, initialValues: initialPreferencesValues };
    }
    return { schema: refinementSchema, initialValues: initialRefinementFormValues };
  }, [activeStep]);

  const handleFormSubmit = () => {
    console.log('submitted');
    console.log(inputValues);
  };

  const clickNext = (
    formik: FormikContextType<
      | EducationFormValues
      | PreviousExperienceFormValues
      | PreferencesFormValues
      | RefinementFormValues
    >,
  ) => {
    setInputValues({ ...inputValues, ...formik.values });
    formik.setValues(initialValues);
    setActiveStep(activeStep + 1);
    if (activeStep === 4) {
      handleFormSubmit();
    }
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Formik validationSchema={schema} initialValues={initialValues} onSubmit={handleFormSubmit}>
      {(formik) => (
        <ConfirmationDialog
          open
          title={<Stepper activeStep={activeStep} steps={steps} />}
          onCancel={clickBack}
          onConfirm={() => {
            clickNext(formik);
          }}
          ignoreCancelButton={activeStep === 0}
          cancelLabel="Back"
          confirmLabel={activeStep === steps.length ? 'Create Account' : 'Next'}
          extraClasses="careersTest"
        >
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
              <PreferencesForm formik={formik as FormikContextType<PreferencesFormValues>} />
            )}
            {activeStep === 3 && (
              <CareerRefinement formik={formik as FormikContextType<RefinementFormValues>} />
            )}
          </Form>
        </ConfirmationDialog>
      )}
    </Formik>
  );
};
