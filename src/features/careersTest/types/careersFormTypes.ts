import * as Yup from 'yup';
import {
  areasOfInterestSchema,
  companyFormSchema,
  educationFormSchema,
  previousExperienceFormSchema,
  universitySchema,
} from '@careersTest/config/careersFormSchemas';

export type EducationFormValues = Yup.InferType<typeof educationFormSchema>;
export type UniversityFormValues = Yup.InferType<typeof universitySchema>;
export type CompanyFormValues = Yup.InferType<typeof companyFormSchema>;
export type PreviousExperienceFormValues = Yup.InferType<typeof previousExperienceFormSchema>;
export type AreasOfInterestValues = Yup.InferType<typeof areasOfInterestSchema>;
