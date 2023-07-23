import * as Yup from 'yup';
import {
  areasOfInterestSchema,
  companyFormSchema,
  educationFormSchema,
  preferencesFormSchema,
  previousExperienceFormSchema,
  universitySchema,
  workPreferencesSchema,
} from '@careersTest/config/careersFormSchemas';

export type EducationFormValues = Yup.InferType<typeof educationFormSchema>;
export type UniversityFormValues = Yup.InferType<typeof universitySchema>;
export type CompanyFormValues = Yup.InferType<typeof companyFormSchema>;
export type PreviousExperienceFormValues = Yup.InferType<typeof previousExperienceFormSchema>;
export type AreasOfInterestFormValues = Yup.InferType<typeof areasOfInterestSchema>;
export type WorkPreferencesFormValues = Yup.InferType<typeof workPreferencesSchema>;
export type PreferencesFormValues = Yup.InferType<typeof preferencesFormSchema>;
