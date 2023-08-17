interface Degree {
  name: string;
  level: string;
  university: string;
  grade: string;
  isPredictedGrade: boolean;
}

interface WorkExperience {
  companyName: string;
  role: string;
  rating: number;
  ratingReason: string;
}

export enum DegreeGrade {
  FIRST = 'First Class (1st)',
  UPPER_SECOND = 'Second Class Upper (2:1)',
  LOWER_SECOND = 'Second Class Lower (2:2)',
  THIRD = 'Third Class (3rd)',
  PASS = 'Pass',
}

export enum DegreeLevel {
  PHD = 'PhD',
  MSC = 'MSc',
  MA = 'MA',
  BSC = 'BSc',
  BA = 'BA',
}

export enum WorkStyle {
  GROUP = 'Group',
  INDEPENDANT = 'Independant',
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

interface WorkPreference {
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

interface CareerPath {
  title: string;
  industry: string;
  reason: string;
  startingSalary: string;
  role: string;
  companies: string[];
  skills: string[];
}

interface RejectedCareer {
  title: string;
  industry: string;
}

export interface UserProfile {
  identifier: string;
  profile: Profile;
  careerPaths: { [key: string]: CareerPath };
  rejectedCareers: { [key: string]: RejectedCareer };
}
