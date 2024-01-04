import { useState } from 'react';
import { Button, Container, Group, Stepper } from '@mantine/core';
import { FORM_INDEX, useForm } from '@mantine/form';

import { selectMentorProfile } from '@apis/profileApi';
import { useMobileStyles } from '@shared/hooks/useMobileStyles';
import { useAppSelector } from '@state/store';

import { UniversityForm } from '@shared/components/forms/EducationForm/UniversityForm';
import WorkExperienceForm from '@shared/components/forms/WorkExperienceForm';

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

const useSubmitMentorRequest = () => {
  const [data, setData] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const submitMentorRequest = (values: MentorRequestValues) => {
    console.log(values);
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setData(true);
    }, 2000);
  };

  return { submitMentorRequest, data, isFetching };
};

export const MentorRequestForm = () => {
  const mentorProfile = useAppSelector(selectMentorProfile);
  const [activeStep, setActiveStep] = useState(
    mentorProfile?.status === MentorStatus.PENDING ? MentorStep.COMPLETE : MentorStep.EDUCATION,
  );
  const { isMobile } = useMobileStyles();

  const { submitMentorRequest, data, isFetching } = useSubmitMentorRequest();

  const form = useForm<MentorRequestValues>({
    initialValues: initialMentorRequestFormValues,
    validateInputOnChange: true,
    validate: {
      latestDegree: checkBasicDegree,
      experience: checkBasicExperience,
    },
  });

  const clickNext = () => {
    form.validate();
    const fieldToCheck =
      activeStep === MentorStep.WORK_EXPERIENCE ? `experience.${FORM_INDEX}` : 'latestDegree';
    if (!form.isValid(fieldToCheck)) {
      return;
    }
    if (activeStep === MentorStep.WORK_EXPERIENCE) {
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
          <>
            {activeStep === MentorStep.EDUCATION && (
              <UniversityForm<MentorRequestValues>
                baseKey="latestDegree"
                form={form}
                basic
                title="Latest Degree"
              />
            )}
            {activeStep === MentorStep.WORK_EXPERIENCE && (
              <WorkExperienceForm<MentorRequestValues> form={form} basic field="experience" />
            )}
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
          </>
        )}
      </Container>
    </>
  );
};
