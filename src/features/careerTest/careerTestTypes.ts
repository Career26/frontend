import { Profile } from '@datatypes/profile';
import { UseFormReturnType } from '@mantine/form';

export type CareerFormValues = Profile & { dreamJob?: string };
export type CareerFormProps = UseFormReturnType<CareerFormValues>;

export enum CareerStep {
  EDUCATION = 0,
  WORK_EXPERIENCE = 1,
  PREFERENCES = 2,
  CAREER_PATHS = 3,
  COMPLETE = 4,
}
