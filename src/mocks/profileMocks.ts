export const generateProfileInputMock = {
  additionalDegrees: [],
  areasOfInterest: ['Finance', 'Technology', 'Education'],
  expectedSalary: {
    baseCurrency: 'GBP',
    city: 'London',
    expectedSalary: '70000',
  },
  personalityType: {
    workLifeBalanceSacrifice: true,
    workStyle: 'Independant',
  },
  latestDegree: {
    grade: 'Second Class Upper (2:1)',
    level: 'MSc',
    name: 'Engineering Science',
    university: 'Oxford University',
    isPredictedGrade: false,
  },
  previousWorkExperience: [
    {
      companyName: 'Schroders',
      rating: '5',
      ratingReason:
        'I enjoy solving complex financial and technical challenges and working closely with the front office to understand the product needs, build it, and demo it back to them',
      role: 'Software Engineer',
    },
  ],
  fullName: 'Test Student',
};
