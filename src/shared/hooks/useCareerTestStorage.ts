import { initialProfileValues } from '@shared/constants/formConstants';

import { CareerFormValues, CareerStep } from '@datatypes/careerTest';
import type { UserProfile } from '@datatypes/profile';

const baseKey = 'careerTest';

const initialStoredValues = {
  step: CareerStep.EDUCATION,
  formValues: initialProfileValues,
};

interface CareerTestStorage {
  step: CareerStep;
  formValues: CareerFormValues;
  profileId?: string;
  careerPaths?: UserProfile['careerPaths'];
}

type ValueForKey<T, K extends keyof T> = K extends keyof T ? T[K] : never;

export const useCareerTestStorage = () => {
  const getValues = (): CareerTestStorage => {
    if (typeof localStorage === 'undefined') {
      return initialStoredValues;
    }
    const storedValues = localStorage.getItem(baseKey);
    return storedValues ? JSON.parse(storedValues) : initialStoredValues;
  };

  const storeTestValues = <K extends keyof CareerTestStorage>({
    key,
    value,
  }: {
    key: K;
    value: ValueForKey<CareerTestStorage, K>;
  }) => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const newValues = { ...getValues(), [key]: value };
    localStorage.setItem(baseKey, JSON.stringify(newValues));
  };

  const resetValues = () => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(baseKey, JSON.stringify(initialStoredValues));
  };

  const setupFormValues = ({ profile, careerPaths }: UserProfile) => {
    storeTestValues({ key: 'formValues', value: profile });
    storeTestValues({ key: 'careerPaths', value: careerPaths });
    storeTestValues({ key: 'step', value: CareerStep.COMPLETE });
  };

  return {
    resetValues,
    storeTestValues,
    setupFormValues,
    careerTestStorage: getValues(),
  };
};
