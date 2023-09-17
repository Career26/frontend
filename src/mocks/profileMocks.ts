import { Profile, UserProfile, WorkStyle } from '@datatypes/profile';

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
    workStyle: WorkStyle.Independent,
  },
  latestDegree: {
    grade: 'Second Class Upper (2:1)',
    level: 'MSc',
    name: 'Engineering Science',
    university: 'University of Oxford',
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

export const profileResponseMock: UserProfile = {
  identifier: '02de863e-fac3-4c34-8a40-662ab6a84a93',
  profile: {
    fullName: 'Test Student',
    latestDegree: {
      name: 'Engineering Science',
      level: 'MSc',
      university: 'University of Oxford',
      grade: 'Second Class Upper (2:1)',
    },
    additionalDegrees: [],
    previousWorkExperience: [
      {
        companyName: 'Schroders',
        role: 'Software Engineer',
        rating: 5,
        ratingReason:
          'I enjoy solving complex financial and technical challenges and working closely with the front office to understand the product needs, build it, and demo it back to them',
      },
      {
        companyName: 'BP',
        role: 'Software Engineer',
        rating: 3,
        ratingReason:
          'I learnt a lot of coding practices and DevOps but did not enjoy how separate I was from the business',
      },
    ],
    areasOfInterest: ['Finance', 'Education', 'Consulting'],
    personalityType: {
      workLifeBalanceSacrifice: true,
      workStyle: WorkStyle.Independent,
    },
    expectedSalary: {
      expectedSalary: 75000,
      baseCurrency: 'GBP',
      city: 'London',
    },
  },
  careerPaths: {
    'f03234f0-95bc-47c4-bd60-d6015b57d03a': {
      title: 'Quantitative Analyst',
      industry: 'Finance',
      startingSalary: '£75,000 - £100,000',
      role: 'As a Quantitative Analyst, you will develop mathematical models and use statistical techniques to analyze financial data and make informed investment decisions.',
      selected: false,
    },
    '7221e2ae-42bf-477c-b137-81d1eded613a': {
      title: 'Data Scientist',
      industry: 'Education',
      startingSalary: '£60,000 - £80,000',
      role: 'As a Data Scientist in the education industry, you will analyze large datasets to identify trends, develop predictive models, and provide insights to improve educational outcomes.',
      selected: false,
    },
    '3fb72dce-8eea-448a-9298-20dd4d8ce812': {
      title: 'Technology Consultant',
      industry: 'Consulting',
      startingSalary: '£70,000 - £90,000',
      role: 'As a Technology Consultant, you will work with clients to understand their business needs, design technology solutions, and provide strategic advice on technology implementation.',
      selected: false,
    },
    '05bf9e29-5690-461c-a36b-4d929539cf8e': {
      title: 'Quantitative Developer',
      industry: 'Finance',
      startingSalary: '£70,000 - £90,000',
      role: 'As a Quantitative Developer, you will work on developing and implementing trading algorithms, building risk management systems, and optimizing trading infrastructure.',
      selected: false,
    },
  },
};

export const exampleRejectionResponseMock = {
  'a5e701c9-0754-4738-a394-42e121bf50c3': {
    title: 'Data Engineer',
    industry: 'Technology',
    reason:
      'As a Data Engineer, you will have the opportunity to work independently and solve complex technical challenges. Your background in Engineering Science and experience in software engineering make you a suitable candidate for this role.',
    startingSalary: '\u00a360,000 - \u00a380,000',
    role: 'As a Data Engineer, you will design, build, and maintain the infrastructure required for data storage, processing, and analysis. You will work with large datasets, develop data pipelines, and ensure data quality and reliability.',
    companies: ['Google', 'Amazon', 'Facebook'],
    skills: ['Data processing', 'Database management', 'Programming'],
  },
};
