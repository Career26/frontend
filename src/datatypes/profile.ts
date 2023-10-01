import { CareerPath } from './career';

export enum WorkStyle {
  Team = 'TEAM',
  Independent = 'INDEPENDENT',
}

export interface Degree {
  name: string;
  level: string;
  university: string;
  grade: string;
}

export interface WorkExperience {
  companyName: string;
  role: string;
  rating: number;
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
  previousWorkExperience: WorkExperience[];
}

export interface UserProfile {
  identifier: string;
  profile: Profile;
  careerPaths: { [key: string]: CareerPath };
}
