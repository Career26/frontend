import * as Yup from 'yup';

import { CareersTestFormValues, Degree } from '../careersTestTypes';

const getYupNameString = (field: string) =>
  Yup.string()
    .matches(/^[A-Za-z ]*$/, { message: 'Must only containt letters' })
    .required(`${field} is required`);

export const educationFormSchema = Yup.object<CareersTestFormValues>().shape({
  firstName: getYupNameString('First name'),
  lastName: getYupNameString('Last name'),
  university: Yup.object<Degree>().shape({
    name: Yup.string().required(),
    university: Yup.string().required(),
    level: Yup.string().required(),
    grade: Yup.string().required(),
    is_predicted_grade: Yup.bool().required(),
  }),
});
