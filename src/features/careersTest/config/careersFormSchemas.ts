import * as Yup from 'yup';

const getYupNameString = (field: string) =>
  Yup.string()
    .matches(/^[A-Za-z ]*$/, { message: 'Must only containt letters' })
    .required(`${field} is required`);

export const universitySchema = Yup.object().shape({
  universityName: Yup.string().required(),
  courseName: Yup.string().required(),
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

export const companyFormSchema = Yup.object({
  companyName: Yup.string(),
  rating: Yup.number(),
  ratingReason: Yup.string(),
  role: Yup.string(),
});

export const previousExperienceFormSchema = Yup.object().shape({
  previousWorkExperience: Yup.array(companyFormSchema),
});

export const areasOfInterestSchema = Yup.object().shape({
  areasOfInterest: Yup.array(Yup.string()),
});

export const workPreferencesSchema = Yup.object().shape({
  workStyle: Yup.string(),
  enjoyTalkingToPeople: Yup.bool(),
  sacrificeWorkLifeBalance: Yup.bool(),
  expectedSalary: Yup.object().shape({
    expectedSalary: Yup.string(),
    city: Yup.string(),
    baseCurrency: Yup.string(),
    symbol: Yup.string(),
  }),
});
