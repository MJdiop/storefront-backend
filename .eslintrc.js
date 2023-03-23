module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-console': 1,
    'no-unused-vars': 'error',
    'prefer-const': 'error'
  }
}
