import { useEffect, useState } from 'react';

import { useSelectCareerMutation } from '@apis/profileApi';
import { useCareerTestStorage } from './useCareerTestStorage';

import type { UserProfile } from '@datatypes/profile';

const getSelectedCareers = (careerPaths?: UserProfile['careerPaths']) =>
  Object.entries(careerPaths || {}).reduce(
    (agg, [careerId, { selected }]) => (selected ? { ...agg, [careerId]: true } : agg),
    {},
  );

export const useCareerSelection = () => {
  const [selectCareer] = useSelectCareerMutation();
  const [loadingCareers, setLoadingCareers] = useState<{
    [key: string]: boolean;
  }>({});
  const {
    storeTestValues,
    careerTestStorage: { careerPaths },
  } = useCareerTestStorage();
  const [selectedCareers, setSelectedCareers] = useState<{
    [key: string]: boolean;
  }>(getSelectedCareers(careerPaths));

  const handleSelection = async ({
    careerIdentifier,
    profileIdentifier,
    selected,
  }: {
    careerIdentifier: string;
    profileIdentifier: string;
    selected: boolean;
  }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await selectCareer({
      careerIdentifier,
      profileIdentifier,
      selected,
    });
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`select endpoint did not return data, response: ${error}`);
      return;
    }
    setSelectedCareers((prevSelectedCareers) => ({
      ...prevSelectedCareers,
      [careerIdentifier]: selected,
    }));
  };

  const toggleSelectedCareer = async ({
    careerIdentifier,
    profileIdentifier,
    selected,
  }: {
    selected: boolean;
    careerIdentifier: string;
    profileIdentifier?: string;
  }) => {
    if (!careerPaths || !profileIdentifier) {
      return;
    }
    setLoadingCareers((prevLoadingCareers) => ({
      ...prevLoadingCareers,
      [careerIdentifier]: true,
    }));
    await handleSelection({ careerIdentifier, profileIdentifier, selected });
    setLoadingCareers((prevLoadingCareers) => ({
      ...prevLoadingCareers,
      [careerIdentifier]: false,
    }));
  };

  useEffect(() => {
    if (!careerPaths) {
      return;
    }

    const newCareerPaths = Object.entries(careerPaths).reduce(
      (agg, [careerId, careerPath]) => ({
        ...agg,
        [careerId]: { ...careerPath, selected: !!selectedCareers[careerId] },
      }),
      {},
    );
    storeTestValues({ key: 'careerPaths', value: newCareerPaths });
  }, [selectedCareers]);

  return { toggleSelectedCareer, selectedCareers, loadingCareers };
};
