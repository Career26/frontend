import type { Degree, Experience, Gender } from './profile';

type MentorDegree = Omit<Degree, 'rating' | 'ratingReason' | 'grade'>;
type MentorExperience = Omit<Experience, 'experienceType' | 'rating' | 'ratingReason'>;

export interface Mentor {
  name: string;
  degree: MentorDegree;
  experience: MentorExperience;
  img: string;
  id: string;
  gender: Gender;
  industry: string;
  reason: string;
  email: string;
}

export enum NetworkView {
  STUDENT = 'STUDENT',
  MENTOR = 'MENTOR',
}

export interface MentorRequestValues {
  degree: MentorDegree[];
  experience: MentorExperience[];
  linkedIn?: string;
}
