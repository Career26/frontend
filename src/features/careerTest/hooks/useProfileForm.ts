import { useMemo } from 'react';
import { FORM_INDEX, useForm } from '@mantine/form';
import { useCareerTestStorage } from '@shared/hooks/useCareerTestStorage';

import { CareerFormValues } from '../careerTestTypes';

export const useProfileForm = ({ activeStep }: { activeStep: number }) => {
  const {
    careerTestStorage: { formValues },
  } = useCareerTestStorage();

  const fieldsToCheck = useMemo(() => {
    if (activeStep === 0) {
      return ['latestDegree', 'additionalDegrees', `additionalDegrees.${FORM_INDEX}`];
    }
    if (activeStep === 1) {
      return ['previousWorkExperience', `previousWorkExperience.${FORM_INDEX}`];
    }
    if (activeStep === 2) {
      return ['areasOfInterest', 'expectedSalary'];
    }
    return undefined;
  }, [activeStep]);

  const form = useForm<CareerFormValues>({
    initialValues: formValues,
    validateInputOnChange: true,
    validate: {
      latestDegree: {
        name: (value) => !value && 'Course name is required',
        university: (value) => !value && 'University is required',
        grade: (value) => !value && 'Grade is required',
        level: (value) => !value && 'Level is required',
        rating: (value) => !value && 'Rating is required',
        ratingReason: (value) => {
          if (!value) {
            return 'You must provide a reason for the rating';
          }
          if (value.length > 500) {
            return 'Maximum character length is 300';
          }
          return null;
        },
      },
      additionalDegrees: {
        name: (value) => !value && 'Course name is required',
        university: (value) => !value && 'University is required',
      },
      previousWorkExperience: {
        role: (value) => !value && 'Role is required',
        experienceName: (value) => !value && 'Experience name is required',
        experienceType: (value) => !value && 'Experience type is required',
        ratingReason: (value) => {
          if (!value) {
            return 'You must provide a reason for the rating';
          }
          if (value.length > 500) {
            return 'Maximum character length is 300';
          }
          return null;
        },
        rating: (value) => !value && 'Rating is required',
      },
      areasOfInterest: (value) => {
        if (!value.length) {
          return 'You must select at least one area of interest';
        }
        if (value.length > 3) {
          return 'You can only choose up to three areas of interest';
        }
        return null;
      },
      personalityType: {
        workValue: (value) => !value && 'You must provide a preferred career value',
        workStyle: (value) => !value && 'You must provide a preferred work style',
      },
      expectedSalary: {
        expectedSalary: (value) => {
          if (!value) {
            return 'Expected salary is required';
          }
          if (Number.isNaN(value)) {
            return 'Expected salary must be a number';
          }
          if (value < 0) {
            return 'Expected salary cannot be negative';
          }
          return null;
        },
      },
    },
  });

  const checkFormIsValid = () => {
    form.validate();
    return !fieldsToCheck?.some((field) => !form.isValid(field));
  };

  return { form, checkFormIsValid };
};
