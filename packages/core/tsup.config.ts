import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	tsconfig: './tsconfig.json',
	clean: true,
	minify: true,
	sourcemap: true,
	treeshake: true,
	dts: true,
})
