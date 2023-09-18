import { UserProfile, WorkStyle } from '@datatypes/profile';

export const profileResponseMock: UserProfile = {
  identifier: '609e26b8-9e6e-4600-96fb-d9ba5da0abf8',
  profile: {
    fullName: 'Test Student',
    latestDegree: {
      name: 'Engineering Science',
      level: 'MA',
      university: 'University of Oxford',
      grade: 'Second Class Upper (2:1)',
    },
    additionalDegrees: [],
    previousWorkExperience: [
      {
        companyName: 'Schroders',
        role: 'Software Engineering',
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
    areasOfInterest: ['Finance', 'Technology', 'Education'],
    personalityType: {
      workLifeBalanceSacrifice: true,
      workStyle: WorkStyle.Independent,
    },
    expectedSalary: {
      expectedSalary: 70000.0,
      baseCurrency: 'GBP',
      city: 'London',
    },
  },
  careerPaths: {
    'cff12277-abe4-4f0a-a1ab-0223050c6dc0': {
      title: 'Quantitative Analyst',
      industry: 'Finance',
      startingSalary: '\u00a370,000 - \u00a3150,000',
      role: 'You will use mathematical and statistical models to analyze financial data and develop trading strategies for investment banks and hedge funds.',
      selected: false,
    },
    '2122f252-8072-40fb-8efe-b7c27a9ef6b3': {
      title: 'Data Scientist',
      industry: 'Technology',
      startingSalary: '\u00a360,000 - \u00a3100,000',
      role: 'You will analyze complex data sets, develop algorithms, and create predictive models to extract valuable insights and drive data-driven decision making in the technology industry.',
      selected: false,
    },
    '04eeda1c-508d-4961-8539-82cfed86db07': {
      title: 'Software Engineer',
      industry: 'Technology',
      startingSalary: '\u00a350,000 - \u00a380,000',
      role: 'You will design, develop, and maintain software applications, systems, and products for the technology industry, ensuring they meet business requirements and industry standards.',
      selected: false,
    },
    'ee3fbe65-7088-4fda-ab29-381525238cf9': {
      title: 'Financial Analyst',
      industry: 'Finance',
      startingSalary: '\u00a340,000 - \u00a370,000',
      role: 'You will analyze financial data, create financial models, and provide recommendations to help companies make informed business decisions and improve financial performance.',
      selected: false,
    },
    '7b7b3524-3e9a-49cd-a621-14fc1ccc0a69': {
      title: 'Investment Banking Analyst',
      industry: 'Finance',
      startingSalary: '\u00a350,000 - \u00a380,000',
      role: 'You will assist senior bankers in executing financial transactions such as mergers and acquisitions, initial public offerings, and debt financings.',
      selected: false,
    },
    '994fd4eb-1dd1-4ca0-915a-af451c1dc9bb': {
      title: 'Management Consultant',
      industry: 'Education',
      startingSalary: '\u00a350,000 - \u00a380,000',
      role: 'You will provide strategic advice and solutions to educational institutions, helping them improve operations, enhance student outcomes, and achieve organizational goals.',
      selected: false,
    },
    '8e7e587a-439c-465e-983d-2e3a5073ab17': {
      title: 'Data Analyst',
      industry: 'Technology',
      startingSalary: '\u00a340,000 - \u00a360,000',
      role: 'You will analyze and interpret complex data sets to identify trends and patterns, providing insights and recommendations to drive business decisions and improve operational efficiency in the Technology industry.',
      selected: false,
    },
    '8c484f31-8ae8-4181-b200-8e81285509cc': {
      title: 'Financial Planner',
      industry: 'Finance',
      startingSalary: '\u00a330,000 - \u00a350,000',
      role: 'You will provide financial advice and develop personalized strategies to help individuals and businesses achieve their financial goals and manage their investments effectively.',
      selected: false,
    },
    '3147a4b5-aee6-47c5-959a-adb72948e7a4': {
      title: 'Software Quality Assurance Engineer',
      industry: 'Technology',
      startingSalary: '\u00a330,000 - \u00a350,000',
      role: 'You will ensure the quality of software products by designing and executing test plans, identifying defects, and collaborating with development teams to resolve issues.',
      selected: false,
    },
    '1b279820-bc5b-4a77-8ad2-180ffc4d558e': {
      title: 'Educational Technology Specialist',
      industry: 'Education',
      startingSalary: '\u00a330,000 - \u00a350,000',
      role: 'You will design, implement, and support the use of technology in educational settings, ensuring effective integration of technology to enhance teaching and learning experiences.',
      selected: false,
    },
  },
};
