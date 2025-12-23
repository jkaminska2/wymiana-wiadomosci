import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    files: ["*.js", "*.jsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: { jsx: true },
    },
    plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/alt-text": "warn",
    },
    settings: { react: { version: "detect" } },
  },
];