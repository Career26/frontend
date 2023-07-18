import * as Yup from 'yup';

const getYupNameString = (field: string) =>
  Yup.string()
    .matches(/^[A-Za-z ]*$/, { message: 'Must only containt letters' })
    .required(`${field} is required`);

export const universitySchema = Yup.object().shape({
  universityName: Yup.string().required(),
  degreeName: Yup.string().required(),
  degreeLevel: Yup.string().required(),
  degreeGrade: Yup.string().required(),
  isPredicted: Yup.bool(),
});

export const educationFormSchema = Yup.object().shape({
  firstName: getYupNameString('First name'),
  lastName: getYupNameString('Last name'),
  latestDegree: universitySchema,
  additionalDegrees: Yup.array(universitySchema).optional(),
});
