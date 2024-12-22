module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-unused-vars': [
      'error',
      {varsIgnorePattern: '^_', argsIgnorePattern: '^_'},
    ],
  },
};
