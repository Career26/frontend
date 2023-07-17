export type Degree = {
  name: string;
  university: string;
  level: string;
  is_predicted_grade: boolean;
  grade: string;
};

export type CareersTestFormValues = {
  firstName: string;
  lastName: string;
  latestDegree: Degree;
  additionalDegrees: Degree[];
};

export type CardInformation = {
  jobTitle: string;
  info: string;
  industry: string;
  reason: string;
  id: string;
  salary: string;
};

export type CareerInfo = {
  companies: string[];
  industry: string;
  reason: string;
  role: string;
  skills: string[];
  title: string;
  starting_salary: string;
};

type WorkExperience = {
  company_name: string;
  rating: number;
  rating_reason: string;
  role: string;
};

export type Profile = {
  additional_degrees: string[];
  areas_of_interest: string[];
  expected_salary: {
    base_currency: string;
    city: string;
    expected_salary: number;
  };
  full_name: string;
  latest_degree: {
    grade: string;
    is_predicted_grade: boolean;
    level: string;
    name: string;
    university: string;
  };
  personality_type: {
    work_life_balance_sacrifice: boolean;
    work_style: string;
  };
  previous_work_experience: WorkExperience[];
};

export type CareersResponse = {
  career_paths: { [key: string]: CareerInfo };
  identifier: string;
  profile: Profile;
};
