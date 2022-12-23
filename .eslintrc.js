module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    'import/no-named-as-default': 0,
    'no-restricted-exports': 0,
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    'object-curly-spacing': ['error', 'always'],
    'react/jsx-filename-extension': 0,
    'consistent-return': 0,
    'react-hooks/exhaustive-deps': 0,
    'quotes': ['error', 'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'import/no-unresolved': 0,
  },
};
