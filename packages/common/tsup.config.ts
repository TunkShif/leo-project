import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "./dist/",
  splitting: true,
  sourcemap: true,
  clean: true,
  format: "esm",
  dts: true,
  outExtension: () => ({ js: ".jsx" })
})
