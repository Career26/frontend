import { UseFormReturnType } from '@mantine/form';

import type { Profile } from './profile';

export interface CareerFormValues extends Profile {
  dreamJob?: string;
}
export type CareerFormProps = UseFormReturnType<CareerFormValues>;

export enum CareerStep {
  EDUCATION = 0,
  WORK_EXPERIENCE = 1,
  PREFERENCES = 2,
  DIVERSITY = 3,
  CAREER_PATHS = 4,
  COMPLETE = 5,
}

export interface CareerTestFormProps {
  form: CareerFormProps;
}

export interface SubFormProps {
  title?: string;
  form: CareerFormProps;
  baseKey: string;
}
