import { Profile } from '@datatypes/profile';
import { UseFormReturnType } from '@mantine/form';

export type CareerFormValues = Profile & { dreamJob?: string };
export type CareerFormProps = UseFormReturnType<CareerFormValues>;
