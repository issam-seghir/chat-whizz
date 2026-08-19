import { createRequire } from "module";

const require = createRequire(import.meta.url);
const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");
const nextTypescript = require("eslint-config-next/typescript");

const eslintConfig = [
	...nextCoreWebVitals,
	...nextTypescript,
	{
		ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", ".pnpm-store/**"],
	},
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"react-hooks/set-state-in-effect": "off",
			"react-hooks/preserve-manual-memoization": "off",
		},
	},
];

export default eslintConfig;
