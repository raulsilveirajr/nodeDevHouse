module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    semi: "warn",
    eqeqeq: "warn",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "no-template-curly-in-string": "off",
    "import/extensions": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    camelcase: "off",
    "no-underscore-dangle": "off",
  },
};
