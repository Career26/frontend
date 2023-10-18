import { CareerFormValues, CareerStep } from '@careerTest/careerTestTypes';
import { initialProfileValues } from '@careerTest/config/formConstants';
import { UserProfile } from '@datatypes/profile';

const baseKey = 'careerTest';

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
    return storedValues
      ? JSON.parse(storedValues)
      : { step: CareerStep.EDUCATION, formValues: initialProfileValues };
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

  return {
    storeTestValues,
    careerTestStorage: getValues(),
  };
};
