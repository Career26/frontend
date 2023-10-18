import React, { useEffect, useMemo, useState } from 'react';
import { Container, Group, Button, Stepper } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import { useCreateProfileMutation } from '@apis/profileApi';
import { setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch } from '@state/store';
import { formStyles } from '@shared/styles/formStyles';
import { LoadingScreen } from '@shared/components/loadingScreen/LoadingScreen';

import { EducationForm } from './components/educationForm/EducationForm';
import { WorkExperienceForm } from './components/workExperienceForm/WorkExperienceForm';
import { PreferencesForm } from './components/preferencesForm/PreferencesForm';
import { useProfileForm } from './hooks/useProfileForm';
import { CareerPathsForm } from './components/careerPathsForm/CareerPathsForm';
import { CareerTestHeader } from './components/CareerTestHeader';
import { CareerStep } from './careerTestTypes';
import { useCareerTestStorage } from './hooks/useCareerTestStorage';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

export const CareerTest = () => {
  const dispatch = useAppDispatch();
  const [createProfile, { data, isLoading }] = useCreateProfileMutation();
  const { classes } = formStyles();
  const {
    storeFormValues,
    storeProfileId,
    storeCareerPaths,
    storeStep,
    getStep,
    getCareerPaths,
    getProfileId,
  } = useCareerTestStorage();
  const [activeStep, setActiveStep] = useState(getStep());
  const { form, checkFormIsValid } = useProfileForm({ activeStep });

  useEffect(() => {
    if (data?.careerPaths) {
      storeProfileId(data.identifier);
      storeCareerPaths(data.careerPaths);
      setActiveStep(activeStep + 1);
    }
  }, [data]);

  useEffect(() => {
    storeStep(activeStep);
  }, [activeStep]);

  const clickNext = async () => {
    const formIsvalid = checkFormIsValid();
    storeFormValues(form.values);
    if (!formIsvalid) {
      return;
    }
    form.clearErrors();
    if (activeStep === CareerStep.PREFERENCES) {
      createProfile(form.values);
    }
    if (activeStep === CareerStep.CAREER_PATHS) {
      dispatch(
        setLoginModal({
          open: true,
          associateProfileId: data?.identifier,
          initialState: 'signUp',
        }),
      );
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const clickBack = () => {
    setActiveStep(activeStep - 1);
  };

  const nextLabel = useMemo(() => {
    if (activeStep === CareerStep.PREFERENCES) {
      return 'See Results';
    }
    if (activeStep === CareerStep.CAREER_PATHS) {
      return 'Save Choices';
    }
    return 'Next';
  }, [activeStep]);

  return (
    <Shell>
      <>
        <CareerTestHeader />
        <Container className={classes.steppers}>
          <Stepper active={activeStep} onStepClick={setActiveStep} breakpoint="sm">
            {stepperLabels.map((label, index) => (
              <Stepper.Step
                label={label}
                key={`stepper-${label}`}
                // disabled={
                //   index > activeStep ||
                //   activeStep === CareerStep.CAREER_PATHS ||
                //   activeStep === CareerStep.COMPLETE
                // }
              />
            ))}
          </Stepper>
        </Container>

        <Container>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              {activeStep === CareerStep.EDUCATION && <EducationForm form={form} />}
              {activeStep === CareerStep.WORK_EXPERIENCE && <WorkExperienceForm form={form} />}
              {activeStep === CareerStep.PREFERENCES && <PreferencesForm form={form} />}
              {(activeStep === CareerStep.CAREER_PATHS || activeStep === CareerStep.COMPLETE) && (
                <CareerPathsForm
                  careerPaths={data?.careerPaths || getCareerPaths()}
                  profileId={data?.identifier || getProfileId()}
                />
              )}
              <Group position="center">
                {activeStep !== CareerStep.CAREER_PATHS && activeStep !== CareerStep.COMPLETE && (
                  <Button
                    onClick={clickBack}
                    disabled={activeStep === CareerStep.EDUCATION || isLoading}
                    variant="light"
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={clickNext}
                  disabled={isLoading}
                  loading={isLoading}
                  variant="outline"
                >
                  {nextLabel}
                </Button>
              </Group>
            </>
          )}
        </Container>
      </>
    </Shell>
  );
};
