export const urls = {
  landingPage: '/',
  careersTest: '/career-test',
  overview: '/overview',
  questions: '/questions',
  mentors: '/mentors',
  settings: '/settings',
};

const devUrl = 'https://ghs0y47spi.execute-api.eu-west-1.amazonaws.com/Prod';
const prodUrl = 'https://z3mda8e0qg.execute-api.eu-west-1.amazonaws.com/Prod';

const getBaseUrl = () => (process.env.NODE_ENV === 'production' ? prodUrl : devUrl);

export const baseUrl = getBaseUrl();
