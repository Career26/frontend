import { Profile } from '@shared/types/profileTypes';

export type CareerInfo = {
  companies: string[];
  industry: string;
  reason: string;
  role: string;
  skills: string[];
  title: string;
  starting_salary: string;
};

export type CareersResponse = {
  career_paths: { [key: string]: CareerInfo };
  identifier: string;
  profile: Profile;
};
