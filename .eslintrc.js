module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            modules: true
        }
    },
    extends: [
      'eslint:recommended',
      'plugin:css-modules/recommended',
    ],
    globals: {
      __DEV__: true,
    },
    plugins: [
      'css-modules',
      'import'
    ],
    rules: {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-console': 0,
        'comma-spacing': 'warn',
        'comma-style': 'warn',
        'space-infix-ops': [
            'error',
            {int32Hint: true}
        ],
        'import/extensions': [
          'error',
          'never',
          {
            json: 'always',
            css: 'always'
          },
        ],
        'brace-style': 'warn',
        'no-multiple-empty-lines': 'warn',
        'func-call-spacing': [
            'warn',
            'never'
        ],
        'key-spacing': 'warn',
        'no-array-constructor': 'error',
        'no-new-object': 'error',
        'no-duplicate-imports': 'error',
        'no-multi-spaces': 'warn',
        'no-path-concat': 'error',
        'no-template-curly-in-string': 'warn',
        'template-curly-spacing': 'warn',
        'no-trailing-spaces': 'warn',
        'object-property-newline': 'error',
        'padded-blocks': [
            'warn',
            'never'
        ],
        'rest-spread-spacing': 'warn',
        'semi-spacing': 'error',
        'space-in-parens': 'error',
        'spaced-comment': 'error',
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-filename-extension': 'off',
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1
    }
}
