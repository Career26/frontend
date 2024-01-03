import type { MentorRequestValues } from '@datatypes/network';
import { initiaBasiclUniversityValues, initialBasicWorkExperienceValues } from './formConstants';

export const initialMentorRequestFormValues: MentorRequestValues = {
  linkedIn: '',
  degree: [initiaBasiclUniversityValues],
  experience: [initialBasicWorkExperienceValues],
};
