import { Select, TextInput, Textarea } from '@mantine/core';

import { FormContent } from '@shared/components/forms/FormContent';

import { getRatingLabel } from '@shared/utils/formUtil';
import { experienceOptions, ratingOptions } from '@shared/constants/formConstants';

import { ExperienceType } from '@datatypes/profile';

import type { UseFormReturnType } from '@mantine/form';

import commonStyles from '@shared/styles/commonStyles.module.css';

const getNameLabel = (experienceType: ExperienceType) => {
  const label = experienceOptions.find((item) => item.value === experienceType)?.label;
  switch (experienceType) {
    case ExperienceType.Volunteering:
      return 'Organisation';
    case ExperienceType.Other:
    case undefined:
      return '';
    default:
      return label;
  }
};

interface ExperienceFormProps<T> {
  form: UseFormReturnType<T>;
  withRating?: boolean;
  baseKey: string;
  title?: string;
}

export const ExperienceForm = <T,>({
  form,
  baseKey,
  title,
  withRating,
}: ExperienceFormProps<T>) => {
  const rating = form.getInputProps(`${baseKey}.rating`).value;
  const experienceType = form.getInputProps(`${baseKey}.experienceType`).value;
  const experienceLabel = getNameLabel(experienceType);
  return (
    <FormContent title={title}>
      <div className={commonStyles.row}>
        {withRating && (
          <Select
            {...form.getInputProps(`${baseKey}.experienceType`)}
            withAsterisk
            label="Type"
            placeholder="Select experience type"
            data={experienceOptions}
            w="50%"
            searchable
          />
        )}
        <TextInput
          {...form.getInputProps(`${baseKey}.experienceName`)}
          label={`${experienceLabel} Name`}
          withAsterisk
          py="xs"
          w="50%"
        />
      </div>
      <TextInput {...form.getInputProps(`${baseKey}.role`)} label="Role" withAsterisk />
      {withRating && (
        <>
          <Select
            {...form.getInputProps(`${baseKey}.rating`)}
            withAsterisk
            label="What did you think of this role?"
            data={ratingOptions}
            placeholder="Select a rating"
            py="xs"
            searchable
          />
          <Textarea
            {...form.getInputProps(`${baseKey}.ratingReason`)}
            label={getRatingLabel(rating)}
            minRows={3}
            autosize
            withAsterisk
            py="xs"
          />
        </>
      )}
    </FormContent>
  );
};
