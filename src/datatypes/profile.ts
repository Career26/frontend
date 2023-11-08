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

export enum YesNoPreferNotToSay {
  'Yes' = 'YES',
  'No' = 'NO',
  // eslint-disable-next-line sonarjs/no-duplicate-string
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export enum SchoolType {
  'State-funded' = 'STATE',
  'State-funded grammar/selective' = 'GRAMMAR',
  'Independent/private school (fee paying)' = 'INDEPENDENT',
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export enum Ethnicity {
  'White' = 'WHITE',
  'Black, Black British, Carribbean or African' = 'BLACK',
  'Asian or Asian British' = 'ASIAN',
  'Mixed or multiple ethnic groups' = 'MIXED',
  'Other ethnic group' = 'OTHER',
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export enum Gender {
  'Male' = 'MALE',
  'Female' = 'FEMALE',
  'Non-binary' = 'NON_BINARY',
  'Other' = 'OTHER',
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export enum Household {
  'Modern professional & traditional professional occupations' = 'PROFESSIONAL',
  'Senior, middle or junior managers or administrators' = 'MANAGEMENT',
  'Clerical and intermediate occupations' = 'CLERICAL',
  'Technical and craft occupations' = 'TECHNICAL',
  'Routine, semi-routine manual and service occupations' = 'ROUTINE',
  'Long-term unemployed' = 'UNEMPLOYED',
  'Small business owners' = 'SMALL_BUSINESS',
  'Other' = 'OTHER',
  'Prefer not to say' = 'PREFER_NOT_TO_SAY',
}

export interface Diversity {
  firstGeneration?: YesNoPreferNotToSay;
  schoolType?: SchoolType;
  ethnicity?: Ethnicity;
  gender?: Gender;
  disability?: YesNoPreferNotToSay;
  age?: string;
  household?: Household;
}
