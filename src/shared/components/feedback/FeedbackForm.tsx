import { UseFormReturnType } from '@mantine/form';
import React from 'react';
import { Checkbox, Grid, Radio, Text, Textarea } from '@mantine/core';
import { getCharacterCount } from '@shared/utils/formUtil';
import { Feedback } from '@datatypes/feedback';

import { experienceRatingOptions, heardFromOptions, mostHelpfulOptions } from './feedbackConstants';
import styles from './feedback.module.scss';

export const FeedbackForm = ({ form }: { form: UseFormReturnType<Feedback> }) => (
  <>
    <div>
      <Text py="md">
        Career26 is always looking to improve. If you have feedback or thoughts on how we can help
        you better, then we&apos;d love to hear from you.
      </Text>
    </div>
    <div>
      <Checkbox.Group
        {...form.getInputProps('heardFrom')}
        label="How did you heard about us?"
        withAsterisk
        py="md"
      >
        <Grid py="xs">
          {heardFromOptions.map((label) => (
            <Grid.Col span={6} key={`heard-from-${label}`}>
              <Checkbox label={label} value={label} />
            </Grid.Col>
          ))}
        </Grid>
      </Checkbox.Group>
      <Checkbox.Group
        {...form.getInputProps('mostHelpful')}
        label="What feature did you find the most helpful?"
        withAsterisk
        py="md"
      >
        <Grid py="xs">
          {mostHelpfulOptions.map((label) => (
            <Grid.Col span={6} key={`most-helpful-${label}`}>
              <Checkbox label={label} value={label} />
            </Grid.Col>
          ))}
        </Grid>
      </Checkbox.Group>
      <Radio.Group
        {...form.getInputProps('experienceRating')}
        name="experienceRating"
        label="How would you rate you Career26 experience?"
        withAsterisk
        py="md"
      >
        <div className={styles.radioGroup}>
          {experienceRatingOptions.map((label) => (
            <Radio key={`experience-${label}`} value={label} label={label} py="xs" />
          ))}
        </div>
      </Radio.Group>
      <Textarea
        {...form.getInputProps('otherFunctions')}
        label={getCharacterCount(
          'Are there any other functions that you would like Career26 to have in the future?',
          form.values.otherFunctions?.length,
        )}
        minRows={3}
        autosize
        placeholder="Enter your message here"
      />
    </div>
  </>
);
