module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': [0],
    "comma-dangle": ["error", "never"],
    "no-underscore-dangle": [0],
    "prefer-destructuring": [0],
    "newline-per-chained-call": 0
  },
};
