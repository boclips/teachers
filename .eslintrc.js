module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    createDefaultProgram: true,
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
    'airbnb/hooks',
  ],
  rules: {
    'react/no-did-update-set-state': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '_', ignoreRestSiblings: true },
    ],
    'prefer-destructuring': 'off',
    'no-irregular-whitespace': ['error', { skipRegExps: true }],
    'react/static-property-placement': 'off',
    'no-nested-ternary': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    'no-plusplus': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/destructuring-assignment': [
      'off',
      'always',
      { ignoreClassFields: true },
    ],
    'no-restricted-syntax': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/prop-types': 0,
    'implicit-arrow-linebreak': 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'function-paren-newline': 'off',
    'no-param-reassign': ['error', { props: false }],
    'operator-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': [
      'error',
      'never',
      {
        svg: 'always',
        png: 'always',
        less: 'always',
        stories: 'off',
        json: 'off',
      },
    ],
  },
};
