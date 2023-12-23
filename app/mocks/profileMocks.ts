import { ratingOptions } from '@shared/constants/formConstants';

import { ExperienceType, UserProfile, WorkStyle, WorkValue } from '@datatypes/profile';

export const mockUserProfile: UserProfile = {
  identifier: '11458feb-6aca-47b6-b392-b5223ad569f4',
  profile: {
    latestDegree: {
      name: 'Engineering Science',
      level: 'MEng',
      university: 'University of Oxford',
      grade: 'First Class (1st)',
      rating: ratingOptions[4],
      ratingReason:
        'I loved the theoretical side of engineering and applying maths and science to solve challenges',
    },
    additionalDegrees: [],
    previousWorkExperience: [
      {
        experienceName: 'Schroders',
        experienceType: ExperienceType.Company,
        role: 'Software Engineeer',
        rating: ratingOptions[4],
        ratingReason:
          'I enjoy solving complex financial and technical challenges and working closely with the front office to understand the product needs, build it, and demo it back to them',
      },
      {
        experienceName: 'BP',
        experienceType: ExperienceType.Company,
        role: 'Software Engineer',
        rating: ratingOptions[2],
        ratingReason:
          'I learnt a lot of coding practices and DevOps but did not enjoy how separate I was from the business',
      },
    ],
    areasOfInterest: ['Finance', 'Technology', 'Art and Creative Work'],
    personalityType: {
      workValue: WorkValue['Higher salary'],
      workStyle: WorkStyle['I prefer working in a team'],
    },
    expectedSalary: {
      expectedSalary: 70000.0,
      baseCurrency: 'GBP',
      city: 'London',
    },
  },
  careerPaths: {
    '2e479f83-ebfe-4c04-bfc2-13b3330a50cb': {
      title: 'Quantitative Analyst',
      industry: 'Finance',
      startingSalary: '\u00a370,000 - \u00a3150,000',
      role: 'You will use mathematical and statistical models to analyze financial data, develop trading strategies, and provide risk management solutions for investment banks and hedge funds.',
      selected: false,
    },
    'be4b6cd9-6445-470d-9af6-911f0b977ba1': {
      title: 'Software Developer',
      industry: 'Technology',
      startingSalary: '\u00a350,000 - \u00a380,000',
      role: 'You will design, develop, and maintain software applications, ensuring high-quality code and meeting client requirements in the Technology industry.',
      selected: false,
    },
    'e4348a9e-c917-4b48-998a-88103d00c50f': {
      title: 'Data Scientist',
      industry: 'Technology',
      startingSalary: '\u00a360,000 - \u00a390,000',
      role: 'You will analyze complex data sets, develop algorithms and models, and provide insights to drive business decisions and improve technological solutions.',
      selected: false,
    },
    '9c387f39-2fe4-441b-a6af-36c724800816': {
      title: 'Financial Engineer',
      industry: 'Finance',
      startingSalary: '\u00a370,000 - \u00a3120,000',
      role: 'You will develop and implement mathematical models and algorithms to analyze and solve complex financial problems, such as pricing derivatives and managing risk.',
      selected: false,
    },
    '3990e00a-7a90-44e5-ad61-3f76bc387f2a': {
      title: 'Investment Analyst',
      industry: 'Finance',
      startingSalary: '\u00a360,000 - \u00a3100,000',
      role: 'You will analyze financial data, create investment strategies, and provide recommendations to clients on investment opportunities in the finance industry.',
      selected: false,
    },
    '74b8647c-6979-4955-a3e8-cfb17371ee1b': {
      title: 'Product Manager',
      industry: 'Technology',
      startingSalary: '\u00a360,000 - \u00a390,000',
      role: 'You will oversee the development and execution of product strategies, manage the product life cycle, and collaborate with cross-functional teams to drive innovation and deliver successful technology products.',
      selected: false,
    },
    '31caff73-d2b1-4409-b0a5-cf348810ee71': {
      title: 'Software Engineer',
      industry: 'Technology',
      startingSalary: '\u00a350,000 - \u00a380,000',
      role: 'You will design, develop and maintain software applications, ensuring they meet client requirements and industry standards.',
      selected: false,
    },
    'e5be1417-c8db-4407-9458-46773ff93143': {
      title: 'Financial Analyst',
      industry: 'Finance',
      startingSalary: '\u00a350,000 - \u00a380,000',
      role: 'You will analyze financial data, create financial models, and provide recommendations to help businesses make informed decisions and improve financial performance.',
      selected: false,
    },
    '62c86913-7a43-4a87-984a-dd97e3f9ba46': {
      title: 'UI/UX Designer',
      industry: 'Art and Creative Work',
      startingSalary: '\u00a340,000 - \u00a370,000',
      role: 'You will create visually appealing and user-friendly interfaces for digital products, focusing on enhancing user experience and ensuring seamless navigation.',
      selected: false,
    },
    'a4bf0d9a-212c-41c4-8b04-212a2d13797b': {
      title: 'Digital Marketing Specialist',
      industry: 'Art and Creative Work',
      startingSalary: '\u00a330,000 - \u00a360,000',
      role: 'You will be responsible for developing and implementing digital marketing strategies to promote art and creative work, increasing brand awareness and driving online engagement.',
      selected: false,
    },
  },
};
