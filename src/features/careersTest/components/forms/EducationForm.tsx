import { FieldArray, Formik } from 'formik';
import React from 'react';
import { FormText } from '@shared/forms/FormText';
import { Button } from '@mui/material';

import { educationFormSchema } from '../../config/careersFormSchemas';
import { initialCareersFormValues } from '../../config/careersFormConstants';
import { UniversityForm } from './UniversityForm';

export const EducationForm = () => (
  <div>
    Education
    <Formik
      initialValues={initialCareersFormValues}
      validateOnMount
      validationSchema={educationFormSchema}
      onSubmit={(values) => console.log(values)}
    >
      {(formik) => (
        <form>
          <FormText field="firstName" label="First Name" formik={formik} />
          <FormText field="lastName" label="Last Name" formik={formik} />
          Latest Degree
          <UniversityForm formik={formik} baseField="latestDegree" />
          Additional Degrees
          <FieldArray name="additionalDegrees">
            {({ push, remove }) => (
              <div>
                {formik.values.additionalDegrees?.map((degree, index) => (
                  <>
                    <h3>University {index + 1}</h3>
                    <UniversityForm
                      key={`additional-degree-${degree.degreeName}`}
                      baseField={`additionalDegrees[${index}]`}
                      formik={formik}
                    />
                    <Button onClick={() => remove(index)}>Remove University</Button>
                  </>
                ))}
                <Button onClick={() => push({})}>Add Another University</Button>
              </div>
            )}
          </FieldArray>
        </form>
      )}
    </Formik>
  </div>
);
