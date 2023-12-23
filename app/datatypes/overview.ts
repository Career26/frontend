export interface RoleSummary {
  responsibilities: string;
  dayToDay: string;
  skills: string;
  personalityType: string;
}

export interface SalaryProgression {
  age: string;
  high: number;
  low: number;
}

export interface CareerOverlap {
  career: string;
  industry: string;
  reason: string;
}

export interface PromotionTimeline {
  title: string;
  age: string;
}

export interface AssessmentStage {
  stage: string;
  description: string;
}

export interface SupplementalExperience {
  year: string;
  activity: string;
}

export interface Overview {
  roleSummary: RoleSummary;
  salaryProgression: SalaryProgression[];
  exampleEmployers: string[];
  careerOverlaps: CareerOverlap[];
  promotionTimeline: PromotionTimeline[];
  assessmentStages: AssessmentStage[];
  supplementalExperiences: SupplementalExperience[];
  openMonths: string;
  profileIdentifier: string;
  careerIdentifier: string;
}

export interface CareerOverviewInput {
  profileId: string;
  careerId: string;
}
