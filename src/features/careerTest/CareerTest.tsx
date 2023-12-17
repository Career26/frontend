import React, { useEffect, useMemo, useState } from 'react';
import { Container, Group, Button, Stepper } from '@mantine/core';
import { Shell } from '@shared/components/shell/Shell';
import { useCreateProfileMutation, useLazyAssociateProfileQuery } from '@apis/profileApi';
import { setLoginModal } from '@slices/sessionSlice';
import { useAppDispatch } from '@state/store';
import { LoaderWithText } from '@shared/components/loadingScreen/LoaderWithText';
import { useCareerTestStorage } from '@shared/hooks/useCareerTestStorage';
import { notifications } from '@mantine/notifications';
import { useAuthUser } from '@shared/hooks/useAuthUser';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';

import { EducationForm } from './components/educationForm/EducationForm';
import { WorkExperienceForm } from './components/workExperienceForm/WorkExperienceForm';
import { PreferencesForm } from './components/preferencesForm/PreferencesForm';
import { useProfileForm } from './hooks/useProfileForm';
import { CareerPathsForm } from './components/careerPathsForm/CareerPathsForm';
import { CareerStep } from './careerTestTypes';
import { careerLoadingText } from './config/formConstants';
import { DiversityForm } from './components/diversityForm/DiversityForm';

const stepperLabels = ['Education', 'Experience', 'Preferences', 'Diversity', 'Career Paths'];

export const CareerTest = () => {
  const dispatch = useAppDispatch();
  const { authenticated } = useAuthUser();
  const [createProfile, { data, isLoading, error }] = useCreateProfileMutation();
  const { storeTestValues, careerTestStorage } = useCareerTestStorage();
  const [activeStep, setActiveStep] = useState(careerTestStorage.step);
  const { form, checkFormIsValid } = useProfileForm({ activeStep });
  const { isMobile } = useMobileStyles();
  const [associateProfile, { isFetching }] = useLazyAssociateProfileQuery();

  useEffect(() => {
    const newStep = activeStep >= CareerStep.COMPLETE ? CareerStep.COMPLETE : activeStep;
    storeTestValues({ key: 'step', value: newStep });
  }, [activeStep]);

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`create profile error - ${JSON.stringify(error)}`);
      notifications.show({
        title: 'Profile Generation Error',
        message: 'Could not create profile, please try again later',
        color: 'red',
      });
      setActiveStep(CareerStep.DIVERSITY);
      return;
    }
    if (data?.careerPaths) {
      storeTestValues({ key: 'profileId', value: data.identifier });
      storeTestValues({ key: 'careerPaths', value: data.careerPaths });
      setActiveStep(activeStep + 1);
    }
  }, [data, error]);

  const nextLabel = useMemo(
    () => (!authenticated || activeStep !== CareerStep.COMPLETE ? 'Next' : 'Save'),
    [authenticated, activeStep],
  );

  const backLabel = useMemo(
    () => (activeStep === CareerStep.COMPLETE ? 'Retake Test' : 'Back'),
    [activeStep],
  );

  const clickNext = async () => {
    if (nextLabel === 'Save') {
      await associateProfile(data!.identifier);
      notifications.show({
        title: 'Saved Results',
        message: 'Successfully saved new career paths',
        color: 'green',
      });
      return;
    }
    const formIsvalid = checkFormIsValid();
    storeTestValues({ key: 'formValues', value: form.values });
    if (!formIsvalid) {
      return;
    }
    form.clearErrors();
    if (activeStep === CareerStep.DIVERSITY) {
      storeTestValues({ key: 'careerPaths', value: undefined });
      createProfile(form.values);
    }
    if (activeStep === CareerStep.COMPLETE) {
      dispatch(
        setLoginModal({
          open: !authenticated,
          associateProfileId: careerTestStorage?.profileId,
          initialState: 'signUp',
        }),
      );
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const clickBack = () => {
    if (activeStep === CareerStep.COMPLETE) {
      setActiveStep(activeStep - 2);
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Shell>
      <>
        <Container>
          <Stepper active={activeStep} onStepClick={setActiveStep} py="md">
            {stepperLabels.map((label, index) => (
              <Stepper.Step
                label={!isMobile && label}
                key={`stepper-${label}`}
                loading={index === CareerStep.CAREER_PATHS && isLoading}
                disabled={index > activeStep}
              />
            ))}
          </Stepper>
        </Container>

        <Container py="md">
          {isLoading ? (
            <LoaderWithText text={careerLoadingText} />
          ) : (
            <>
              {activeStep === CareerStep.EDUCATION && <EducationForm form={form} />}
              {activeStep === CareerStep.WORK_EXPERIENCE && <WorkExperienceForm form={form} />}
              {activeStep === CareerStep.PREFERENCES && <PreferencesForm form={form} />}
              {activeStep === CareerStep.DIVERSITY && <DiversityForm form={form} />}
              {(activeStep === CareerStep.CAREER_PATHS || activeStep === CareerStep.COMPLETE) && (
                <CareerPathsForm
                  careerPaths={careerTestStorage.careerPaths}
                  profileId={careerTestStorage.profileId}
                />
              )}
              <Group justify="center">
                <Button
                  onClick={clickBack}
                  disabled={activeStep === CareerStep.EDUCATION || isLoading}
                  variant="light"
                >
                  {backLabel}
                </Button>
                <Button
                  onClick={clickNext}
                  disabled={isLoading}
                  loading={isLoading || isFetching}
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
