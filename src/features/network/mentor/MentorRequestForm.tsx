import { useState } from 'react';
import { Button, Container, Group, Stepper } from '@mantine/core';
import { useForm } from '@mantine/form';

import { selectMentorProfile } from '@apis/profileApi';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import { useAppSelector } from '@state/store';

import { checkBasicDegree, checkBasicExperience } from '@shared/utils/formUtil';
import { initialMentorRequestFormValues } from '@shared/constants/networkConstants';

import { MentorStatus } from '@datatypes/profile';
import type { MentorRequestValues } from '@datatypes/network';

const stepperLabels = ['Education', 'Experience'];

enum MentorStep {
  EDUCATION = 0,
  WORK_EXPERIENCE = 1,
  COMPLETE = 2,
}

export const MentorRequestForm = () => {
  const mentorProfile = useAppSelector(selectMentorProfile);
  const [activeStep, setActiveStep] = useState(
    mentorProfile?.status === MentorStatus.PENDING ? MentorStep.COMPLETE : MentorStep.EDUCATION,
  );
  const { isMobile } = useMobileStyles();

  const [submitMentorRequest, { data, isFetching }] = useSubmitMentorRequest();

  const form = useForm<MentorRequestValues>({
    initialValues: initialMentorRequestFormValues,
    validate: {
      degree: checkBasicDegree,
      experience: checkBasicExperience,
    },
  });

  const clickNext = () => {
    if (activeStep === MentorStep.EDUCATION) {
      submitMentorRequest(form.values);
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <Container>
        <Stepper active={activeStep} onStepClick={setActiveStep} py="md">
          {stepperLabels.map((label) => (
            <Stepper.Step label={!isMobile && label} key={`stepper-${label}`} disabled />
          ))}
        </Stepper>
      </Container>
      <Container py="md">
        {mentorProfile?.status === MentorStatus.PENDING || !!data ? (
          <div>Thank you for submitting...</div>
        ) : (
          <Group justify="center">
            <Button
              onClick={() => setActiveStep(activeStep - 1)}
              disabled={activeStep === MentorStep.EDUCATION}
              variant="light"
            >
              Back
            </Button>
            <Button onClick={clickNext} variant="outline" loading={isFetching}>
              {activeStep === MentorStep.WORK_EXPERIENCE ? 'Submit' : 'Next'}
            </Button>
          </Group>
        )}
      </Container>
    </>
  );
};
