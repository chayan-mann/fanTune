import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }], // Warns instead of errors, allows unused variables prefixed with _
      "no-console": "warn", // Warns about console.log but doesn't prevent it
      "react-hooks/rules-of-hooks": "error", // Ensures correct use of React hooks
      "react-hooks/exhaustive-deps": "warn", // Warns about missing dependencies in hooks
      "import/no-extraneous-dependencies": "error", // Prevents importing packages not in package.json
      "prettier/prettier": [
        "warn",
        {
          singleQuote: true,
          trailingComma: "all",
          semi: false,
          printWidth: 100,
        },
      ], // Formats code consistently
    },
  },
];

export default eslintConfig;
