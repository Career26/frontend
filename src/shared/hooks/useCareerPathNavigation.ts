import { urls } from '@shared/config/urlConstants';
import { setSelectedCareerPathId } from '@slices/careerPathsSlice';
import { useAppDispatch } from '@state/store';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const useCareerPathNavigation = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const basePath = history.location.pathname.replace(/([^/]+$)/gm, '');
  const careerPathId = /([^/]+$)/gm.exec(history.location.pathname)?.[0];

  const toggleCareerPath = (id: string) => {
    history.push(`${basePath}${id}`);
  };

  const goToCareerPath = (id: string) => {
    history.push(`${urls.overview}/${id}`);
  };

  useEffect(() => {
    dispatch(setSelectedCareerPathId(careerPathId));
  }, [careerPathId, dispatch]);

  return { toggleCareerPath, goToCareerPath };
};
