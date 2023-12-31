import { useMemo } from 'react';
import { FORM_INDEX, useForm } from '@mantine/form';

import { useCareerTestStorage } from '@shared/hooks/useCareerTestStorage';

import { checkDegree, checkExperience } from '@shared/utils/formUtil';

import { CareerFormValues, CareerStep } from '@datatypes/careerTest';

interface UseCareerTestFormProps {
  activeStep: number;
}

export const useCareerTestForm = ({ activeStep }: UseCareerTestFormProps) => {
  const {
    careerTestStorage: { formValues },
  } = useCareerTestStorage();

  const fieldsToCheck = useMemo(() => {
    if (activeStep === CareerStep.EDUCATION) {
      return ['latestDegree', 'additionalDegrees', `additionalDegrees.${FORM_INDEX}`];
    }
    if (activeStep === CareerStep.WORK_EXPERIENCE) {
      return ['previousWorkExperience', `previousWorkExperience.${FORM_INDEX}`];
    }
    if (activeStep === CareerStep.PREFERENCES) {
      return ['areasOfInterest', 'expectedSalary'];
    }
    return undefined;
  }, [activeStep]);

  const form = useForm<CareerFormValues>({
    initialValues: formValues,
    validateInputOnChange: true,
    validate: {
      latestDegree: checkDegree,
      additionalDegrees: checkDegree,
      previousWorkExperience: {
        ...checkExperience,
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
            return 'Expected starting salary is required';
          }
          if (Number.isNaN(value)) {
            return 'Expected starting salary must be a number';
          }
          if (value < 0) {
            return 'Expected starting salary cannot be negative';
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
