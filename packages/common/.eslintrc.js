module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["../../.eslintrc.js", "plugin:solid/typescript"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["solid"],
  rules: {}
}
