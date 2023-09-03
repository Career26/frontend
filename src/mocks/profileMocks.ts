import { Profile, WorkStyle } from '@datatypes/profile';

export const generateProfileInputMock: Profile = {
  additionalDegrees: [],
  areasOfInterest: ['Finance', 'Education', 'Consulting'],
  expectedSalary: {
    baseCurrency: 'GBP',
    city: 'London',
    expectedSalary: 75000,
  },
  personalityType: {
    workLifeBalanceSacrifice: true,
    workStyle: WorkStyle.INDEPENDENT,
  },
  latestDegree: {
    grade: 'Second Class Upper (2:1)',
    level: 'MSc',
    name: 'Engineering Science',
    university: 'University of Oxford',
    isPredictedGrade: false,
  },
  previousWorkExperience: [
    {
      companyName: 'Schroders',
      rating: 5,
      ratingReason:
        'I enjoy solving complex financial and technical challenges and working closely with the front office to understand the product needs, build it, and demo it back to them',
      role: 'Software Engineer',
    },
    {
      companyName: 'BP',
      rating: 3,
      ratingReason:
        'I learnt a lot of coding practices and DevOps but did not enjoy how separate I was from the business',
      role: 'Software Engineer',
    },
  ],
  fullName: 'Test Student',
};
