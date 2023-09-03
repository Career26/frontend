import { urls } from '@shared/config/urlConstants';
import { selectIsLoggedIn, setSelectedCareerPathId } from '@slices/userSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const usePageNavigation = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const basePath = history.location.pathname.replace(/([^/]+$)/gm, '');
  const careerPathId = /([^/]+$)/gm.exec(history.location.pathname)?.[0];
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const toggleCareerPath = (id: string) => {
    history.push(`${basePath}${id}`);
  };

  const goToCareerPath = (id: string) => {
    history.push(`${urls.overview}/${id}`);
  };

  const goToCareerTest = () => {
    history.push(urls.careersTest);
  };

  const clickLogo = () => {
    if (isLoggedIn) {
      history.push(urls.home);
    } else {
      history.push(urls.landingPage);
    }
  };

  useEffect(() => {
    dispatch(setSelectedCareerPathId(careerPathId));
  }, [careerPathId, dispatch]);

  return { toggleCareerPath, goToCareerPath, goToCareerTest, clickLogo };
};
