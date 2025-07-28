import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import prettierPlugin from "eslint-plugin-prettier"
import typescriptParser from "@typescript-eslint/parser"
import typescriptPlugin from "@typescript-eslint/eslint-plugin"
import importPlugin from "eslint-plugin-import"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // Extends legacy configs
  ...compat.extends("next/core-web-vitals", "prettier"),

  // Main configuration for your project files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": typescriptPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      // Your existing rules are great
      "no-unused-vars": "warn",
      "no-console": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Add other rules you want here
      "import/no-extraneous-dependencies": "off", // Often too noisy, can be set to "warn" or "error"

      // Prettier rule
      "prettier/prettier": [
        "warn",
        {
          singleQuote: true,
          trailingComma: "all",
          semi: false,
          printWidth: 100,
        },
      ],
    },
  },
]

export default eslintConfig