import { useSelectCareerMutation } from '@apis/profileApi';
import { useState } from 'react';

export const useCareerSelection = () => {
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [selectCareer] = useSelectCareerMutation();
  const [loadingCareers, setLoadingCareers] = useState<{ [key: string]: boolean }>({});

  const handleSelection = async (careerIdentifier: string, profileIdentifier?: string) => {
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

  const toggleSelectedCareer = async (careerId: string, profileIdentifier?: string) => {
    setLoadingCareers((prevLoadingCareers) => ({
      ...prevLoadingCareers,
      [careerId]: true,
    }));
    await handleSelection(careerId, profileIdentifier);
    setLoadingCareers((prevLoadingCareers) => ({
      ...prevLoadingCareers,
      [careerId]: false,
    }));
  };

  return { toggleSelectedCareer, selectedCareers, loadingCareers };
};
