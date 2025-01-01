module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-unused-vars': [
      'error',
      {varsIgnorePattern: '^_', argsIgnorePattern: '*'},
    ],
    'react/no-unstable-nested-components': [
      'error',
      {
        allowAsProps: true,
      },
    ],
  },
};
