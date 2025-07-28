import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
// No more Prettier imports

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // No more prettier plugin
    plugins: {
        // other plugins can stay
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-extraneous-dependencies": "error",
      // No more prettier rule
    },
  },
]

export default eslintConfig