const config = {
  reject: [],
};

/**
 * This block should be removed once it's possible to upgrade jest.
 * @see https://github.com/jest-community/jest-extended/pull/235
 */
config.reject.push(
  '@testing-library/jest-dom',
  '@types/enzyme',
  '@types/jest',
  'jest',
  'jest-enzyme',
  'jsdom',
  'ts-jest',
);

module.exports = config;
