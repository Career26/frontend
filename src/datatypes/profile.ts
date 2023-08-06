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

enum WorkStyle {
  INDEPENDENT = 'INDEPENDENT',
  TEAM = 'TEAM',
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

export interface Profile {
  fullName: string;
  latestDegree: Degree;
  additionalDegrees: Degree[];
  previousWorkExperience: WorkExperience[];
  areasOfInterest: string[];
  personalityType: PersonalityType;
  expectedSalary: ExpectedSalary;
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
