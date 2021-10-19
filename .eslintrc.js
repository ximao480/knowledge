module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    '$': true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
    '@typescript-eslint/camelcase': 'off',
  },
};
