export const urls = {
  landingPage: '/',
  careersTest: '/career-test',
  overview: '/overview',
  questions: '/questions',
  mentors: '/mentors',
  settings: '/settings',
};

const devUrl = 'https://qjop4yl84g.execute-api.eu-west-1.amazonaws.com/Prod';
const prodUrl = 'https://4gsxsq4qkb.execute-api.eu-west-1.amazonaws.com/Prod';

const getBaseUrl = () => (process.env.NODE_ENV === 'production' ? prodUrl : devUrl);

export const baseUrl = getBaseUrl();
