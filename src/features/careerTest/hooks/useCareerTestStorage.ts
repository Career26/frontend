import { CareerFormValues, CareerStep } from '@careerTest/careerTestTypes';
import { initialProfileValues } from '@careerTest/config/formConstants';
import { UserProfile } from '@datatypes/profile';

const baseKey = 'careerTest#';

export const useCareerTestStorage = () => {
  const storeItem = ({ key, value }: { key: string; value: string }) => {
    localStorage.setItem(`${baseKey}${key}`, value);
  };

  const getItem = (key: string) => localStorage.getItem(`${baseKey}${key}`);

  const storeFormValues = (formValues: CareerFormValues) => {
    const value = JSON.stringify(formValues);
    storeItem({ key: 'inputValues', value });
  };

  const getFormValues = () => {
    const storedValues = getItem('inputValues');
    if (!storedValues) {
      return initialProfileValues;
    }
    return JSON.parse(storedValues);
  };

  const storeStep = (step: CareerStep) => {
    storeItem({ key: 'step', value: String(step) });
  };

  const getStep = (): CareerStep => {
    const step = getItem('step');
    if (!step) {
      return CareerStep.EDUCATION;
    }
    return Number(step);
  };

  const storeCareerPaths = (careerPaths: UserProfile['careerPaths']) => {
    const value = JSON.stringify(careerPaths);
    storeItem({ key: 'careerPaths', value });
  };

  const getCareerPaths = () => {
    const careerPaths = getItem('careerPaths');
    return careerPaths ? JSON.parse(careerPaths) : undefined;
  };

  return {
    storeFormValues,
    getFormValues,
    storeCareerPaths,
    storeStep,
    getCareerPaths,
    getStep,
  };
};
