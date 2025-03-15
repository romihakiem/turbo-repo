import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
    entryPoints: ["backend/core/app.ts"],
    clean: false,
    format: ["cjs"],
    outDir: "backend",
    ...options,
}));