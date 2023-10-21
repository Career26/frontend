import React, { useEffect, useMemo, useState } from 'react';
import { Container, Group, Button, Stepper } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import { useCreateProfileMutation } from '@apis/profileApi';
import { setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch } from '@state/store';
import formStyles from '@shared/styles/formStyles.module.scss';
import { LoadingScreenWithText } from '@shared/components/loadingScreen/LoadingScreen';

import { EducationForm } from './components/educationForm/EducationForm';
import { WorkExperienceForm } from './components/workExperienceForm/WorkExperienceForm';
import { PreferencesForm } from './components/preferencesForm/PreferencesForm';
import { useProfileForm } from './hooks/useProfileForm';
import { CareerPathsForm } from './components/careerPathsForm/CareerPathsForm';
import { CareerTestHeader } from './components/careerTestHeader/CareerTestHeader';
import { CareerStep } from './careerTestTypes';
import { useCareerTestStorage } from './hooks/useCareerTestStorage';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Career Paths'];

export const CareerTest = () => {
  const dispatch = useAppDispatch();
  const [createProfile, { data, isLoading }] = useCreateProfileMutation();
  const { storeTestValues, careerTestStorage } = useCareerTestStorage();
  const [activeStep, setActiveStep] = useState(careerTestStorage.step);
  const { form, checkFormIsValid } = useProfileForm({ activeStep });

  useEffect(() => {
    if (data?.careerPaths) {
      storeTestValues({ key: 'profileId', value: data.identifier });
      storeTestValues({ key: 'careerPaths', value: data.careerPaths });
      setActiveStep(activeStep + 1);
    }
  }, [data]);

  useEffect(() => {
    if (activeStep !== CareerStep.COMPLETE) {
      storeTestValues({ key: 'step', value: activeStep });
    }
  }, [activeStep]);

  const clickNext = async () => {
    const formIsvalid = checkFormIsValid();
    storeTestValues({ key: 'formValues', value: form.values });
    if (!formIsvalid) {
      return;
    }
    form.clearErrors();
    if (activeStep === CareerStep.PREFERENCES) {
      createProfile(form.values);
    }
    if (activeStep === CareerStep.COMPLETE) {
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
    if (activeStep === CareerStep.COMPLETE) {
      return 'Save Choices';
    }
    return 'Next';
  }, [activeStep]);

  return (
    <Shell>
      <>
        <CareerTestHeader />
        <Container className={formStyles.steppers}>
          <Stepper active={activeStep} onStepClick={setActiveStep} py="md">
            {stepperLabels.map((label, index) => (
              <Stepper.Step
                label={label}
                key={`stepper-${label}`}
                disabled={
                  index > activeStep ||
                  activeStep === CareerStep.CAREER_PATHS ||
                  activeStep === CareerStep.COMPLETE
                }
              />
            ))}
          </Stepper>
        </Container>

        <Container py="md">
          {isLoading ? (
            <LoadingScreenWithText
              repeatSequence
              text={[
                {
                  text: 'Generating your personalised career suggestions...',
                  textDelay: 40,
                  repeatDelay: 1000,
                  deleteDelay: 2000,
                },
                {
                  text: 'This may take up to 30 seconds...',
                  textDelay: 40,
                  repeatDelay: 1000,
                  deleteDelay: 2000,
                },
                {
                  text: "You're almost there...",
                  textDelay: 40,
                  repeatDelay: 1000,
                  deleteDelay: 2000,
                },
              ]}
            />
          ) : (
            <>
              {activeStep === CareerStep.EDUCATION && <EducationForm form={form} />}
              {activeStep === CareerStep.WORK_EXPERIENCE && <WorkExperienceForm form={form} />}
              {activeStep === CareerStep.PREFERENCES && <PreferencesForm form={form} />}
              {(activeStep === CareerStep.CAREER_PATHS || activeStep === CareerStep.COMPLETE) && (
                <CareerPathsForm
                  careerPaths={careerTestStorage.careerPaths}
                  profileId={careerTestStorage.profileId}
                />
              )}
              <Group justify="center">
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
