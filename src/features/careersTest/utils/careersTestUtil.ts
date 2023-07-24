import { CareersFormValues } from '@careersTest/types/careersFormTypes';
import { Degree, Profile } from '@shared/types/profileTypes';

const mapUniversity = (input: CareersFormValues['latestDegree']): Degree => ({
  name: input.courseName,
  university: input.universityName,
  level: input.degreeLevel,
  grade: input.degreeGrade,
});

export const getProfileInputValues = (formValues: CareersFormValues): Profile => ({
  additional_degrees: formValues.additionalDegrees?.map(mapUniversity),
  areas_of_interest: formValues.areasOfInterest,
  expected_salary: {
    base_currency: formValues.expectedSalary.baseCurrency,
    city: formValues.expectedSalary.city,
    expected_salary: formValues.expectedSalary.expectedSalary,
  },
  full_name: `${formValues.firstName} ${formValues.lastName}`,
  personality_type: {
    work_life_balance_sacrifice: formValues.sacrificeWorkLifeBalance,
    work_style: formValues.workStyle,
  },
  previous_work_experience: formValues.previousExperiences.map((input) => ({
    company_name: input.companyName,
    rating: input.rating,
    rating_reason: input.ratingReason,
    role: input.role,
  })),
  latest_degree: mapUniversity(formValues.latestDegree),
});
