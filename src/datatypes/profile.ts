import { CareerPath } from './career';

export enum WorkStyle {
  'I prefer working in a team' = 'TEAM',
  'I prefer working independently' = 'INDEPENDENT',
  'I have no preference' = 'BOTH',
}

export enum ExperienceType {
  'Work' = 'WORK',
  'Project' = 'PROJECT',
  'Society' = 'SOCIETY',
  'Volunteering' = 'VOLUNTEERING',
  'Other' = 'OTHER',
}

export interface Degree {
  name: string;
  level: string;
  university: string;
  grade: string;
}

export interface Experience {
  experienceName: string;
  experienceType: ExperienceType;
  role: string;
  rating: string;
  ratingReason: string;
}

interface PersonalityType {
  workLifeBalanceSacrifice: boolean;
  workStyle: WorkStyle;
}

interface ExpectedSalary {
  expectedSalary: number;
  baseCurrency: string;
  city: string;
}

export interface WorkPreference {
  areasOfInterest: string[];
  expectedSalary: ExpectedSalary;
  personalityType: PersonalityType;
}

export interface Profile extends WorkPreference {
  latestDegree: Degree;
  additionalDegrees: Degree[];
  previousWorkExperience: Experience[];
}

export interface UserProfile {
  identifier: string;
  profile: Profile;
  careerPaths: { [key: string]: CareerPath };
}

export interface UserDetails {
  name: string;
  gender: string;
  email: string;
}
