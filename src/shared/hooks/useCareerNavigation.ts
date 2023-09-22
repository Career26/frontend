import { urls } from '@shared/config/urlConstants';
import { setSelectedCareerPathId } from '@slices/userSlice';
import { useAppDispatch } from '@state/store';
import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const useCareerNavigation = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathname: currentPathname } = useLocation();

  const featureUrl = useMemo(() => {
    if (new RegExp(urls.interviews).test(currentPathname)) {
      return urls.interviews;
    }
    if (new RegExp(urls.overview).test(currentPathname)) {
      return urls.overview;
    }
    return undefined;
  }, [currentPathname, history]);

  const toggleCareerId = (newCareerId: string) => {
    const newPathname = currentPathname.replace(
      new RegExp(`${featureUrl}/(.*)`),
      `${featureUrl}/${newCareerId}`,
    );
    history.push(newPathname);
    dispatch(setSelectedCareerPathId(newCareerId));
  };

  const clickLogo = () => {
    history.push(urls.home);
  };
  const clickCareersTest = () => {
    history.push(urls.careersTest);
  };

  return {
    clickLogo,
    clickCareersTest,
    toggleCareerId,
    showNavigation: !!featureUrl,
    featureUrl,
    currentPathname,
  };
};

export default useCareerNavigation;
