import type { Degree, Experience, Gender } from './profile';

export type BasicDegree = Omit<Degree, 'rating' | 'ratingReason' | 'grade'>;
export type BasicExperience = Omit<Experience, 'experienceType' | 'rating' | 'ratingReason'>;

export interface NetworkUser {
  name: string;
  degree: BasicDegree;
  experience: BasicExperience;
  img: string;
  id: string;
  gender: Gender;
  industry: string;
  reason?: string;
  email: string;
  linkedIn?: string;
}

export enum NetworkView {
  STUDENT = 'STUDENT',
  MENTOR = 'MENTOR',
}

export interface MentorRequestValues {
  degree: BasicDegree[];
  experience: BasicExperience[];
  linkedIn?: string;
}
