import { defineConfig } from 'vite';
import { mergeConfig } from 'vitest/config';

import { resolveViteConfig } from '../../vite.config';

// 패키지별 추가 설정만 작성
export default mergeConfig(
  resolveViteConfig(__dirname),
  defineConfig({
    build: {
      sourcemap: true,
      rollupOptions: {
        external: ['@carped99/ol-react'],
      },
    },
  }),
);
