import { urls } from '@shared/config/urlConstants';
import { setSelectedInterviewId } from '@slices/interviewSlice';
import { selectSelectedCareerPathId, setSelectedCareerPathId } from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const usePageNavigation = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathname: currentPathname } = useLocation();
  const careerId = useAppSelector(selectSelectedCareerPathId);

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
  const toggleInterviewId = (newInterviewId: string) => {
    const newPathname = currentPathname.replace(
      new RegExp(`${featureUrl}/${careerId}/(.*)`),
      `${featureUrl}/${careerId}/${newInterviewId}`,
    );
    history.push(newPathname);
    dispatch(setSelectedInterviewId(newInterviewId));
  };

  const goToHomepage = () => {
    history.push(urls.landingPage);
  };
  const clickCareersTest = () => {
    history.push(urls.careersTest);
  };
  const goToSettings = () => {
    history.push(urls.settings);
  };

  return {
    goToHomepage,
    goToSettings,
    clickCareersTest,
    toggleCareerId,
    toggleInterviewId,
    showNavigation: !!featureUrl,
    featureUrl,
    currentPathname,
  };
};
