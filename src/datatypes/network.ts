import type { Degree, Experience, Gender } from './profile';

export interface Mentor {
  name: string;
  degree: Omit<Degree, 'rating' | 'ratingReason' | 'grade'>;
  experience: Omit<Experience, 'rating' | 'ratingReason'>;
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
