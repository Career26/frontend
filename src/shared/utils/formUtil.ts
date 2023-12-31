import { smallAnswer } from '@shared/constants/formConstants';

import type { ExperienceType } from '@datatypes/profile';

const getPrefix = (rating: string) => {
  switch (rating) {
    case 'I hated it':
      return 'Why did you hate it?';
    case 'I disliked it':
      return 'Why did you dislike it?';
    case 'I liked it':
      return 'Why did you like it?';
    case 'I loved it':
      return 'Why did you love it?';
    default:
      return 'Provide a reason for this rating';
  }
};

export const getCharacterCount = (prefix: string, answerLength = 0) =>
  `${prefix} (${500 - answerLength} characters remaining)`;

export const getRatingLabel = (rating: string) => {
  const prefix = getPrefix(rating);
  return `${prefix} ${smallAnswer}`;
};

const checkRating = {
  rating: (value: string) => !value && 'Rating is required',
  ratingReason: (value: string) => {
    if (!value) {
      return 'You must provide a reason for the rating';
    }
    if (value.length > 300) {
      return 'Maximum character length is 300';
    }
    return null;
  },
};

export const checkBasicDegree = {
  name: (value: string) => !value && 'Course name is required',
  university: (value: string) => !value && 'University is required',
  level: (value: string) => !value && 'Level is required',
};

export const checkDegree = {
  ...checkBasicDegree,
  ...checkRating,
  grade: (value: string) => !value && 'Grade is required',
};

export const checkBasicExperience = {
  role: (value: string) => !value && 'Role is required',
  experienceName: (value: string) => !value && 'Experience name is required',
};

export const checkExperience = {
  ...checkBasicExperience,
  ...checkRating,
  experienceType: (value: ExperienceType) => !value && 'Experience type is required',
};
