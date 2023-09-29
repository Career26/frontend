import { CareerPath } from './career';

export enum DegreeGrade {
  FIRST = 'First Class (1st) - GPA 4.0',
  UPPER_SECOND = 'Second Class Upper (2:1) - GPA 3.3',
  LOWER_SECOND = 'Second Class Lower (2:2) - GPA 2.7',
  THIRD = 'Third Class (3rd) - GPA 2.0',
  PASS = 'Pass - GPA 1.0',
}

export enum DegreeLevel {
  PHD = 'PhD',
  MSC = 'MSc',
  MA = 'MA',
  BSC = 'BSc',
  BA = 'BA',
}

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
  fullName: string;
  latestDegree: Degree;
  additionalDegrees: Degree[];
  previousWorkExperience: WorkExperience[];
}

export interface UserProfile {
  identifier: string;
  profile: Profile;
  careerPaths: { [key: string]: CareerPath };
}
