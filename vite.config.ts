import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/math-is-cool",
	plugins: [react({ include: "**/*.tsx" })],
});
