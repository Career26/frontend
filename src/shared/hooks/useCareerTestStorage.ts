import { CareerFormValues, CareerStep } from '@careerTest/careerTestTypes';
import { initialProfileValues } from '@careerTest/config/formConstants';
import { UserProfile } from '@datatypes/profile';

const baseKey = 'careerTest';

const initialStoredValues = { step: CareerStep.EDUCATION, formValues: initialProfileValues };

type CareerTestStorage = {
  step: CareerStep;
  formValues: CareerFormValues;
  profileId?: string;
  careerPaths?: UserProfile['careerPaths'];
};

type ValueForKey<T, K extends keyof T> = K extends keyof T ? T[K] : never;

export const useCareerTestStorage = () => {
  const getValues = (): CareerTestStorage => {
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
    const newValues = { ...getValues(), [key]: value };
    localStorage.setItem(baseKey, JSON.stringify(newValues));
  };

  const resetValues = () => {
    localStorage.setItem(baseKey, JSON.stringify(initialStoredValues));
  };

  return {
    resetValues,
    storeTestValues,
    careerTestStorage: getValues(),
  };
};
