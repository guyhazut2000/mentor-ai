import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get current directory for ESLint configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compatibility layer for legacy ESLint config format
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js recommended ESLint rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom boundaries configuration for layered architecture
  {
    // Apply these rules to all JS/TS files in src directory
    files: ["src/**/*.{js,jsx,ts,tsx}"],

    // Use the boundaries plugin to enforce import rules
    plugins: {
      boundaries: (await import("eslint-plugin-boundaries")).default,
    },

    settings: {
      // Include all files in src directory for boundary checking
      "boundaries/include": ["src/**/*"],

      // Define the different layers/architectural boundaries
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared", // 🟢 SHARED LAYER - Reusable utilities and components
          pattern: [
            "src/components/**/*", // UI components
            "src/hooks/**/*", // Custom React hooks
            "src/lib/**/*", // Utility functions and libraries
            "src/types/**/*", // TypeScript type definitions
          ],
        },
        {
          mode: "full",
          type: "feature", // 🔵 FEATURE LAYER - Feature-specific code
          capture: ["featureName"], // Capture the feature name for rules
          pattern: [
            "src/features/*/**/*", // e.g., src/features/auth/, src/features/dashboard/
            // Includes: components/, hooks/, actions/, api/, lib/, types/, stores/, __tests__/
          ],
        },
        {
          mode: "full",
          type: "app", // 🟡 APP LAYER - Next.js app router pages
          capture: ["_", "fileName"], // Capture file name for specific rules
          pattern: ["src/app/**/*"], // Next.js app directory
        },
        {
          mode: "full",
          type: "neverImport", // 🔴 NEVER IMPORT - Files that shouldn't be imported
          pattern: [
            "src/*", // Root src files
            "src/middleware.ts", // Next.js middleware
          ],
        },
      ],
    },

    rules: {
      // Error if trying to import from unknown/unmapped files
      "boundaries/no-unknown": ["error"],

      // Error if importing files that don't match any boundary pattern
      "boundaries/no-unknown-files": ["error"],

      // Define import rules between different layers
      "boundaries/element-types": [
        "error",
        {
          default: "disallow", // By default, block all imports unless explicitly allowed
          rules: [
            {
              // 🟢 SHARED LAYER RULES
              from: ["shared"],
              allow: ["shared", "feature"], // Shared can import from shared and features
              // ❌ Shared CANNOT import from app or neverImport
            },
            {
              // 🔵 FEATURE LAYER RULES
              from: ["feature"],
              allow: [
                "shared", // ✅ Features can import from shared utilities
                ["feature", { featureName: "${from.featureName}" }], // ✅ Same feature only (components, hooks, actions, api, lib, types, stores)
                // ❌ Features CANNOT import from other features (prevents circular dependencies)
                // ❌ Features CANNOT import from app or neverImport
              ],
            },
            {
              // 🟡 APP LAYER RULES
              from: ["app", "neverImport"],
              allow: ["shared", "feature"], // App can import from shared and features
              // ❌ App CANNOT import from app or neverImport (except CSS)
            },
            {
              // 🟡 APP LAYER CSS RULES
              from: ["app"],
              allow: [["app", { fileName: "*.css" }]], // ✅ App can import CSS from other app files
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
