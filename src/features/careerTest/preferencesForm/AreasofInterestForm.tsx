import { CreateableSelect } from '@shared/components/forms/CreateableSelect';

import { exampleAreasOfInterest } from '@shared/constants/formConstants';

import type { CareerTestFormProps } from '@datatypes/careerTest';

import styles from '@careerTest/careerTest.module.css';

export const AreasOfInterestForm = ({ form }: CareerTestFormProps) => (
  <div>
    <CreateableSelect
      className={styles.areasOfInterest}
      form={form}
      field="areasOfInterest"
      options={exampleAreasOfInterest}
      placeholder="Enter interest"
      label="Press Enter to add an interest"
      description="Add up to 3 interests"
    />
  </div>
);
