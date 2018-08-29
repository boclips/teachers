module.exports = {

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A set of global variables that need to be available in all test environments
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/*.test.(ts|tsx|js)"
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },

};
