// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "eslint:recommended",
    "expo",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic",
    "plugin:testing-library/react",
  ],
  ignorePatterns: [
    "/dist/*",
    "festivo-backend/",
    "app-example/",
    "theme-output.ts",
  ],
  rules: {
    "no-template-curly-in-string": "error",
    "no-promise-executor-return": "error",
    "no-return-await": "error",
    radix: "error",
    "spaced-comment": ["error", "always", { markers: ["/"] }],
    yoda: "error",
    "no-extra-boolean-cast": "off",
    "import/named": "off",
    "import/no-default-export": "error",
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        groups: ["type", "builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: { order: "asc" },
        pathGroups: [
          {
            pattern: "@/test-utils",
            group: "builtin",
            position: "before",
          },
        ],
      },
    ],
    "no-console": "error",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react",
            importNames: ["React"],
            message:
              "Instead of importing React, import individual pieces from react. Example: `import { useState } from 'react';`",
          },
        ],
      },
    ],
    "react-hooks/exhaustive-deps": ["error"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
    ],
  },
  overrides: [
    {
      // Allow Expo routes to use default exports
      files: ["app/**/*.{js,jsx,ts,tsx}", "**/__mocks__/**/*"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
