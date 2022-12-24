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
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [
      1,
      { maximum: 1, when: 'multiline' },
    ],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-closing-bracket-location': [
      2,
      'tag-aligned',
    ],
    'react/jsx-props-no-spreading': 0,
    'react/no-unescaped-entities': 0,
  },
};
