/** @type {import("prettier").Config} */
module.exports = {
  // Standard prettier options
  singleQuote: false,
  semi: true,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: false,
  // Since prettier 3.0, manually specifying plugins is required
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  // This plugin's options
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/types/(.*)$",
    "",
    "^@/lib/(.*)$",
    "",
    "^@/hooks/(.*)$",
    "",
    "^@/components/ui/(.*)$",
    "",
    "^@/components/(.*)$",
    "",
    "^@/features/(.*)/server/(.*)$",
    "",
    "^@/features/(.*)$",
    "",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: false,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  // File-specific overrides
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 100,
      },
    },
    {
      files: "*.md",
      options: {
        printWidth: 100,
        proseWrap: "always",
      },
    },
    {
      files: "*.mdx",
      options: {
        printWidth: 100,
        proseWrap: "always",
      },
    },
  ],
};
