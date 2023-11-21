module.exports = {
  "root": true,
   "env": {
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project":  "./tsconfig.json" ,
  },
  "plugins": [
    "@typescript-eslint",
    "@typescript-eslint/tslint",
    "import"
  ],
  "ignorePatterns": [
    "node_modules/",
    "dist",
    "*.js",
  ],
  "settings": {
    "import/resolver": {
      "typescript": {},
      "node": {
        extensions: ['*.ts'],
        moduleDirectory: ['node_modules', '.'],
      },
    },
  },
  "rules": {
    "import/no-named-as-default-member": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/unbound-method": "warn",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/no-floating-promises": ["error"],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "eqeqeq": [
      "error",
      "smart"
    ],
    "max-classes-per-file": [
      "error",
      1
    ],
    "max-len": "off",
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-console": "off",
    "no-debugger": "error",
    "no-empty": "error",
    "no-eval": "error",
    "no-fallthrough": "off",
    "no-invalid-this": "off",
    "no-new-wrappers": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-unsafe-finally": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "object-shorthand": "error",
    "one-var": [
      "error",
      "never"
    ],
    "radix": "error",
    "spaced-comment": "error",
    "use-isnan": "error",
    "valid-typeof": "off",
    "@typescript-eslint/tslint/config": [
      "error",
      {
        "rules": {
          "jsdoc-format": true,
          "no-reference-import": true,
        }
      }
    ],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "import/named": 0,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "import/no-cycle": 1,
    "import/no-duplicates": 0,
  },
}
