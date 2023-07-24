export type Degree = {
  name: string;
  university: string;
  level: string;
  grade: string;
};

export type WorkExperience = {
  company_name: string;
  rating: number;
  rating_reason: string;
  role: string;
};

export type Profile = {
  additional_degrees?: Degree[];
  areas_of_interest: string[];
  expected_salary: {
    base_currency: string;
    city: string;
    expected_salary: number;
  };
  full_name: string;
  latest_degree: Degree;
  personality_type: {
    work_life_balance_sacrifice: boolean;
    work_style: string;
  };
  previous_work_experience: WorkExperience[];
};
