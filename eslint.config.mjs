import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Disable Tailwind classname suggestions
      'tailwindcss/classnames': 'off',
      'tailwindcss/enforces-shorthand': 'off',
      // Warn on unused variables instead of blocking commits
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Allow unescaped quotes in JSX
      'react/no-unescaped-entities': 'off',
      // Allow explicit any for window scripts/external libraries
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow setState in useEffect
      'react-hooks/set-state-in-effect': 'off'
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore generated PWA files
    "public/sw.js",
    "public/workbox-*.js",
    "public/precache.*.js",
    // Ignore root scripting files
    "docs-server.js",
    "generate-captions.mjs",
    "generate-icons.mjs",
  ]),
]);

export default eslintConfig;