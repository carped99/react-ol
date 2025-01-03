import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
    analyze({
      showExports: true,
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  // resolve: {
  //   alias: [{ find: '@src', replacement: resolve(__dirname, './src') }],
  // },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactOL',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', /^ol.*/, 'ol-ext'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          ol: 'ol',
        },
      },
    },
  },
  esbuild: {
    legalComments: 'eof',
  },
});
