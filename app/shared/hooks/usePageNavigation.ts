import { useLocation, useNavigate } from '@remix-run/react';
import { useMemo } from 'react';

import {
  selectSelectedCareerPathId,
  setSelectedCareerPathId,
  setSelectedQuestionId,
} from '@slices/sessionSlice';
import { useAppDispatch, useAppSelector } from '@state/store';

import { urls } from '@shared/constants/urlConstants';

export const usePageNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname: currentPathname } = useLocation();
  const careerId = useAppSelector(selectSelectedCareerPathId);

  const featureUrl = useMemo(() => {
    if (new RegExp(urls.questions).test(currentPathname)) {
      return urls.questions;
    }
    if (new RegExp(urls.overview).test(currentPathname)) {
      return urls.overview;
    }
    return undefined;
  }, [currentPathname, navigate]);

  const toggleCareerId = (newCareerId: string) => {
    const newPathname = currentPathname.replace(
      new RegExp(`${featureUrl}/(.*)`),
      `${featureUrl}/${newCareerId}`,
    );
    navigate(newPathname);
    dispatch(setSelectedCareerPathId(newCareerId));
  };
  const toggleQuestionId = (newQuestionId: number) => {
    const newPathname = currentPathname.replace(
      new RegExp(`${featureUrl}/${careerId}/(.*)`),
      `${featureUrl}/${careerId}/${newQuestionId}`,
    );
    navigate(newPathname);
    dispatch(setSelectedQuestionId(newQuestionId));
  };

  const goToHomepage = () => {
    navigate(urls.landingPage);
  };
  const clickCareersTest = () => {
    navigate(urls.careersTest);
  };
  const goToSettings = () => {
    navigate(urls.settings);
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
