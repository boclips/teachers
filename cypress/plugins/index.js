module.exports = (on, config) => {
  config.env.webpackFilename = 'webpack-config/webpack.cypress.js';
  require('cypress-react-unit-test/plugins/load-webpack')(on, config);
  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
};
