export const urls = {
  landingPage: '/',
  careersTest: '/career-test',
  overview: '/overview',
  questions: '/questions',
  mentors: '/mentors',
  settings: '/settings',
};

const devUrl = 'https://g2kb5rq2lc.execute-api.eu-west-1.amazonaws.com/Prod';
const prodUrl = 'https://qulncut3s8.execute-api.eu-west-1.amazonaws.com/Prod';

const getBaseUrl = () => (process.env.NODE_ENV === 'production' ? prodUrl : devUrl);

export const baseUrl = getBaseUrl();
