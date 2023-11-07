import { CareerPath } from './career';

export enum WorkStyle {
  'I prefer working in a team' = 'TEAM',
  'I prefer working independently' = 'INDEPENDENT',
  'I have no preference' = 'BOTH',
}

export enum WorkValue {
  'Higher salary' = 'SALARY',
  'Work-life balance' = 'BALANCE',
  'I have no preference' = 'ANY',
}

export enum ExperienceType {
  'Company' = 'COMPANY',
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
  rating: string;
  ratingReason: string;
}

export interface Experience {
  experienceName: string;
  experienceType: ExperienceType;
  role: string;
  rating: string;
  ratingReason: string;
}

interface PersonalityType {
  workValue: WorkValue;
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
  diversity?: Diversity;
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

export enum FirstGeneration {
  'Yes' = 'YES',
  'No' = 'NO',
  // eslint-disable-next-line sonarjs/no-duplicate-string
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export enum SchoolType {
  'State-funded' = 'STATE',
  'State-funded grammar/selective' = 'GRAMMAR',
  'Independent/private school' = 'INDEPENDENT',
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export enum Ethnicity {
  'White' = 'WHITE',
  'Black or Black British' = 'BLACK',
  'Asian or Asian British' = 'ASIAN',
  'Mixed or multiple ethnic groups' = 'MIXED',
  'Other ethnic group' = 'OTHER',
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export enum Gender {
  'Male' = 'MALE',
  'Female' = 'FEMALE',
  'Non-binary' = 'NON_BINARY',
  'Transgender' = 'TRANSGENDER',
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export enum Disability {
  'I do not consider myself to have a disability' = 'NONE',
  'I have a disability' = 'YES',
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export enum Age {
  'Under 18' = 'UNDER_18',
  '18-24' = '18_TO_24',
  '25-34' = '25_TO_34',
  '35-44' = '35_TO_44',
  '45-54' = '45_TO_54',
  '55 and over' = '55_AND_OVER',
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export interface Diversity {
  firstGeneration?: FirstGeneration;
  schoolType?: SchoolType;
  ethnicity?: Ethnicity;
  gender?: Gender;
  disability?: Disability;
  age?: Age;
}
