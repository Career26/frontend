export type SalaryProgression = { age: string; high: number; low: number };

export type CareerOverlap = { career: string; industry: string; reason: string };

export type PromotionTimeline = { time: string; age: number };

export type AssessmentStage = { stage: string; description: string };

export type SupplementalExperience = { year: string; activity: string };

export type Overview = {
  roleSummary: string;
  salaryProgression: SalaryProgression[];
  exampleEmployers: string[];
  careerOverlaps: CareerOverlap[];
  promotionTimeline: PromotionTimeline[];
  assessmentStages: AssessmentStage[];
  supplementalExperiences: SupplementalExperience[];
  openMonths: string;
};
