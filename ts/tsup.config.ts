import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'packages/core/src/index.ts',
  },
  format: 'esm',
  dts: true,
  splitting: false,
  clean: true,
  outDir: 'dist',
  target: 'es2022',
});
