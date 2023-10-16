import { urls } from '@shared/config/urlConstants';
import {
  selectSelectedCareerPathId,
  setSelectedCareerPathId,
  setSelectedQuestionId,
} from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';
import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const usePageNavigation = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathname: currentPathname } = useLocation();
  const careerId = useAppSelector(selectSelectedCareerPathId);

  const featureUrl = useMemo(() => {
    if (new RegExp(urls.questionss).test(currentPathname)) {
      return urls.questionss;
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
  const toggleQuestionId = (newQuestionId: number) => {
    const newPathname = currentPathname.replace(
      new RegExp(`${featureUrl}/${careerId}/(.*)`),
      `${featureUrl}/${careerId}/${newQuestionId}`,
    );
    history.push(newPathname);
    dispatch(setSelectedQuestionId(newQuestionId));
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
    toggleQuestionId,
    showNavigation: !!featureUrl,
    featureUrl,
    currentPathname,
  };
};
