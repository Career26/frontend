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

export enum WorkType {
  GROUP = 'Group',
  INDEPENDANT = 'Independant',
}

export type University = {
  grade: string;
  level: string;
  name: string;
  university: string;
};

export type WorkExperience = {
  company_name: string;
  rating: number;
  rating_reason: string;
  role: string;
};

export type WorkExperienceInput = {
  companyName: string;
  rating: string;
  ratingReason: string;
  role: string;
};

export type WorkPreference = {
  areas_of_interest: string[];
  expected_salary: { base_currency: string; city: string; expected_salary: number };
  personality_type: { work_life_balance_sacrifice: boolean; work_style: string };
};

export type WorkPreferenceInput = {
  areasOfInterest: string[];
  expectedSalary: { baseCurrency: string; city: string; expectedSalary: number };
  personalityType: { workLifeBalanceSacrifice: boolean; workStyle: string };
};

export type CompanyResult = {
  companies: string[];
  industry: string;
  reason: string;
  role: string;
  skills: string[];
  starting_salary: string;
  title: string;
};

export type Profile = WorkPreference & {
  additional_degrees: University[];
  latest_degree: University;
  previous_work_experience: WorkExperience[];
  full_name: string;
};

export type ProfileInput = WorkPreferenceInput & {
  additionalDegrees: University[];
  latestDegree: University;
  previousWorkExperience: WorkExperienceInput[];
  fullName: string;
};

export type CareerTestResult = {
  career_paths: { [key: string]: CompanyResult };
  identifier: string;
  profile: Profile;
};
