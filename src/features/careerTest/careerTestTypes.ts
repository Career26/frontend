import { Profile } from '@datatypes/profile';
import { UseFormReturnType } from '@mantine/form';

export type CareerFormValues = Profile & { dislikedResults: string[]; dreamJob?: string };
export type CareerFormProps = UseFormReturnType<CareerFormValues>;
