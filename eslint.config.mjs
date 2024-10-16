import globals from "globals";
import parser from "astro-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:@typescript-eslint/recommended",
), {
    languageOptions: {
        globals: {
            "AudioWorkletGlobalScope": 'readonly',
            ...globals.browser,
        },

        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {},
}, {
    files: ["**/*.astro"],

    languageOptions: {
        parser: parser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            parser: "@typescript-eslint/parser",
            extraFileExtensions: [".astro"],
            allowIndentationTabs: true,
        },
    },

    rules: {
        "no-tabs": ["off", {
            allowIndentationTabs: true,
        }],
        "no-mixed-spaces-and-tabs": "off",
        "if-newline": "off",
    },
}];