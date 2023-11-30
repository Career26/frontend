export const urls = {
  landingPage: '/',
  careersTest: '/career-test',
  overview: '/overview',
  questions: '/questions',
  mentors: '/mentors',
  settings: '/settings',
  linkedIn: 'https://linkedin.com/company/100135742/admin/feed/posts/',
};

export const contactEmail = 'career26.info@gmail.com';

const devUrl = 'https://ghs0y47spi.execute-api.eu-west-1.amazonaws.com/Prod';
const prodUrl = 'https://n47upog2gi.execute-api.eu-west-1.amazonaws.com/Prod';

const getBaseUrl = () => (process.env.NODE_ENV === 'production' ? prodUrl : devUrl);

export const baseUrl = getBaseUrl();
