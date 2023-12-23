import { useMemo, useState } from 'react';
import { TagsInput } from '@mantine/core';

import { exampleAreasOfInterest } from '@shared/constants/formConstants';

import type { CareerTestFormProps } from '@datatypes/careerTest';

export const AreasOfInterestForm = ({ form }: CareerTestFormProps) => {
  const [input, setInput] = useState('');
  const addLabel = `Add "${input}"`;
  const options = useMemo(
    () => (input ? [...exampleAreasOfInterest, addLabel] : exampleAreasOfInterest),
    [input],
  );

  const onChange = (selection: string[]) => {
    const newValues = selection.reduce<string[]>(
      (agg, item) => (item === addLabel ? [...agg, input] : [...agg, item]),
      [],
    );
    form.setFieldValue('areasOfInterest', newValues);
    setInput('');
  };

  return (
    <div>
      <TagsInput
        py="xs"
        {...form.getInputProps('areasOfInterest')}
        data={options}
        onChange={onChange}
        clearable
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onInput={({ target: { value } }) => setInput(value)}
        withAsterisk
        placeholder="Enter interest"
        label="Press Enter to add an interest"
        description="Add up to 3 interests"
      />
    </div>
  );
};