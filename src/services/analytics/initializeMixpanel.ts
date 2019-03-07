import mixpanel from 'mixpanel-browser';

const selectToken = (environment: string): string => {
  const testingToken = '70f2ae29eaa67a0e93513c2f0d86c94b';
  const stagingToken = '4290d60e0956507222103ffd8cdfad35';
  const productionToken = '5695e44d19f62e9c99c37d6ea0e11d85';

  switch (environment) {
    case 'STAGING':
      return stagingToken;
    case 'PRODUCTION':
      return productionToken;
    case 'TESTING':
      return testingToken;
    default:
      throw Error(`No MixPanel token found for environment ${environment}`);
  }
};

export const initializeMixpanel = (environment: string): Mixpanel => {
  const token = selectToken(environment);
  const gatewayMixpanelProxy = '/v1/mp';
  const config = { api_host: gatewayMixpanelProxy };
  const mixpanelInstance = mixpanel.init(token, config, {});
  return mixpanelInstance;
};
