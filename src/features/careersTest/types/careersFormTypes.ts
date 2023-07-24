import * as Yup from 'yup';
import {
  educationFormSchema,
  preferencesFormSchema,
  previousExperienceFormSchema,
  universitySchema,
} from '@careersTest/config/careersFormSchemas';

export type EducationFormValues = Yup.InferType<typeof educationFormSchema>;
export type UniversityFormValues = Yup.InferType<typeof universitySchema>;
export type PreviousExperienceFormValues = Yup.InferType<typeof previousExperienceFormSchema>;
export type PreferencesFormValues = Yup.InferType<typeof preferencesFormSchema>;

export type CareersFormValues = EducationFormValues &
  PreviousExperienceFormValues &
  PreferencesFormValues;
