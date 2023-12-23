const getAwsConfig = () =>
  process.env.NODE_ENV === 'production'
    ? { userPool: process.env.PROD_USER_POOL, clientId: process.env.PROD_CLIENT_ID }
    : { userPool: process.env.DEV_USER_POOL, clientId: process.env.DEV_CLIENT_ID };

const { userPool, clientId } = getAwsConfig();

export default {
  REGION: 'eu-west-1',
  USER_POOL_ID: userPool,
  USER_POOL_APP_CLIENT_ID: clientId,
};
