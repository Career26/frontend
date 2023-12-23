import { useMemo, useState } from 'react';

import { TagsInput } from '@mantine/core';
import type { CareerTestFormProps } from '@datatypes/careerTest';

interface CreateableSelectProps extends CareerTestFormProps {
  options: string[];
  placeholder: string;
  label: string;
  description?: string;
  className?: string;
  field: string;
}

export const CreateableSelect = ({
  form,
  options,
  placeholder,
  label,
  description,
  className,
  field,
}: CreateableSelectProps) => {
  const [input, setInput] = useState('');
  const addLabel = `Add "${input}"`;
  const data = useMemo(() => (input ? [...options, addLabel] : options), [input]);

  const onChange = (selection: string[]) => {
    const newValues = selection.reduce<string[]>(
      (agg, item) => (item === addLabel ? [...agg, input] : [...agg, item]),
      [],
    );
    form.setFieldValue(field, newValues);
    setInput('');
  };
  return (
    <div>
      <TagsInput
        {...form.getInputProps(field)}
        className={className}
        data={data}
        onChange={onChange}
        clearable
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onInput={({ target: { value } }) => setInput(value)}
        withAsterisk
        placeholder={placeholder}
        label={label}
        description={description}
      />
    </div>
  );
};
