import { useMemo } from 'react';
import { FORM_INDEX, useForm } from '@mantine/form';

import { initialProfileValues } from '../config/formConstants';
import { CareerFormValues } from '../careerTestTypes';

export const useProfileForm = ({ activeStep }: { activeStep: number }) => {
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
    initialValues: initialProfileValues,
    validateInputOnChange: true,
    validate: {
      latestDegree: {
        name: (value) => !value && 'Course name is required',
        university: (value) => !value && 'University is required',
      },
      additionalDegrees: {
        name: (value) => !value && 'Course name is required',
        university: (value) => !value && 'University is required',
      },
      previousWorkExperience: {
        role: (value) => !value && 'Role is required',
        companyName: (value) => !value && 'Company name is required',
        ratingReason: (value) => {
          if (!value) {
            return 'You must provide a reason for the rating';
          }
          if (value.length > 300) {
            return 'Maximum character length is 300';
          }
          return null;
        },
        rating: (value) => {
          if (!value) {
            return 'Rating is required';
          }
          if (Number.isNaN(value)) {
            return 'Expected salary must be a number';
          }
          return null;
        },
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
