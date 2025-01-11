import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export const resolveViteConfig = (dirname: string) =>
  defineConfig({
    plugins: [
      // TypeScript 선언 파일 생성 플러그인
      dts({
        include: ['src'],
        insertTypesEntry: true, // package.json의 types 필드에 자동으로 추가
        rollupTypes: true, // 모든 .d.ts 파일을 하나로 번들링
        copyDtsFiles: true, // .d.ts 파일을 dist 폴더로 복사
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@/*': ['src/*'],
          },
        },
      }),
      // 번들 크기 분석 플러그인
      analyze({
        summaryOnly: true, // 요약 정보만 출력
        limit: 10, // 상위 10개 모듈만 표시
      }),
      // 번들 시각화 플러그인
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    // CSS 전처리기 설정
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
    // 빌드 설정
    build: {
      lib: {
        entry: resolve(dirname, './src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format, name) => `${name}.${format}.js`,
      },
      outDir: './dist',
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', /^ol.*/, 'ol-ext', /^@turf/],
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
