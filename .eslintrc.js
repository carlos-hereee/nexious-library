module.exports = {
  root: true,
  plugins: ["@typescript-eslint", "prettier", "import"],
  extends: [
    "airbnb-typescript/base",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // project: "./tsconfig.eslint.json",
    ecmaFeatures: {
      jsx: true,
    },
    emcaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
};
