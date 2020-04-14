module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
  },
  plugins: [],
  overrides: [
    {
      "files": ['*.ts'],
      extends: [
        'airbnb-base',
        "plugin:@typescript-eslint/recommended",
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
      },
      plugins: [
        '@typescript-eslint',
      ],
      settings: {
        "import/resolver": {
          "node": {
            "extensions": [
              ".js",
              ".ts",
            ]
          }
        }
      },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/typedef': [
          "error",
          {
            "arrayDestructuring": true,
            "variableDeclaration": true,
            "arrowParameter": true,
            "memberVariableDeclaration": true,
            "objectDestructuring": true,
            "parameter": true,
            "propertyDeclaration": true,
          },
        ],
        "import/extensions": ["error", "ignorePackages", {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never",
          "mjs": "never"
        }]
      },
    }
  ]
};
