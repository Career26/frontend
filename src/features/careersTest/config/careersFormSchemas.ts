import * as Yup from 'yup';

const getRequiredYupString = (field: string) => Yup.string().required(`${field} is required`);

export const universitySchema = Yup.object().shape({
  universityName: getRequiredYupString('University'),
  courseName: getRequiredYupString('Course name'),
  degreeLevel: Yup.string().required('You must select a degree level'),
  degreeGrade: Yup.string().required('You must select a degree grade'),
});

export const educationFormSchema = Yup.object().shape({
  firstName: getRequiredYupString('First name'),
  lastName: getRequiredYupString('Last name'),
  latestDegree: universitySchema,
  additionalDegrees: Yup.array(universitySchema).optional(),
});

export const companyFormSchema = Yup.object({
  companyName: getRequiredYupString('Company name'),
  rating: Yup.number()
    .required('Rating is required')
    .max(5, 'The maximum score is 5')
    .min(0, 'The minimum score is 0'),
  ratingReason: getRequiredYupString('Reason').max(100, 'The maximum character count is 100'),
  role: getRequiredYupString('Role'),
});

export const previousExperienceFormSchema = Yup.object().shape({
  previousExperiences: Yup.array(companyFormSchema).required(),
});

export const preferencesFormSchema = Yup.object().shape({
  areasOfInterest: Yup.array(Yup.string().required())
    .required()
    .length(3, 'Must select only 3 areas of interest'),
  workStyle: Yup.string().required(),
  enjoyTalkingToPeople: Yup.bool().required(),
  sacrificeWorkLifeBalance: Yup.bool().required(),
  expectedSalary: Yup.object()
    .shape({
      expectedSalary: Yup.number().required('Expected salary is required'),
      city: Yup.string().required(),
      baseCurrency: Yup.string().required(),
      symbol: Yup.string(),
    })
    .required(),
});

export const refinementSchema = Yup.object().shape({
  dislikedJobs: Yup.array(Yup.string().required()),
});
