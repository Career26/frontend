import { selectProfileId, useSelectCareerMutation } from '@apis/profileApi';
import { useAppSelector } from '@state/store';
import { useState } from 'react';

export const useCareerSelection = () => {
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const profileIdentifier = useAppSelector(selectProfileId);
  const [selectCareer] = useSelectCareerMutation();
  const [loadingCareers, setLoadingCareers] = useState<string[]>([]);

  const handleSelection = async (careerIdentifier: string) => {
    if (!profileIdentifier) {
      return;
    }
    const selected = selectedCareers.includes(careerIdentifier);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await selectCareer({ careerIdentifier, profileIdentifier, selected });
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`select endpoint did not return data, response: ${error}`);
      return;
    }
    if (selected) {
      setSelectedCareers(selectedCareers.filter((id) => id !== careerIdentifier));
    } else {
      setSelectedCareers([...selectedCareers, careerIdentifier]);
    }
  };

  const toggleSelectedCareer = async (careerId: string) => {
    setLoadingCareers([...loadingCareers, careerId]);
    await handleSelection(careerId);
    setLoadingCareers(loadingCareers.filter((id) => id !== careerId));
  };

  return { toggleSelectedCareer, selectedCareers, loadingCareers };
};
