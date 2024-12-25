module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-unused-vars': [
      'error',
      {varsIgnorePattern: '^_', argsIgnorePattern: '^_'},
    ],
    'react/no-unstable-nested-components': [
      'error',
      {
        allowAsProps: true,
      },
    ],
  },
};
