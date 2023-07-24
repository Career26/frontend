import * as Yup from 'yup';
import {
  areasOfInterestSchema,
  companyFormSchema,
  educationFormSchema,
  preferencesFormSchema,
  previousExperienceFormSchema,
  refinementSchema,
  universitySchema,
} from '@careersTest/config/careersFormSchemas';

export type EducationFormValues = Yup.InferType<typeof educationFormSchema>;
export type UniversityFormValues = Yup.InferType<typeof universitySchema>;
export type CompanyFormValues = Yup.InferType<typeof companyFormSchema>;
export type PreviousExperienceFormValues = Yup.InferType<typeof previousExperienceFormSchema>;
export type AreasOfInterestFormValues = Yup.InferType<typeof areasOfInterestSchema>;
export type PreferencesFormValues = Yup.InferType<typeof preferencesFormSchema>;
export type RefinementFormValues = Yup.InferType<typeof refinementSchema>;

export type CareersFormValues = EducationFormValues &
  PreviousExperienceFormValues &
  PreferencesFormValues;
