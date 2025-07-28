import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import tsPlugin from "@typescript-eslint/eslint-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
        "@typescript-eslint": tsPlugin,
        // other plugins can stay
    },
    rules: {
      // Disable the base rule to avoid conflicts with the TypeScript version
      "no-unused-vars": "off",

      // Set the TypeScript-specific rule to "warn"
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],

      "no-console": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // "import/no-extraneous-dependencies": "error", // You might want to keep this off or as a warn
    },
  },
]

export default eslintConfig