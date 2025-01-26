import importPlugin from 'eslint-plugin-import';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import tsdoc from 'eslint-plugin-tsdoc';

export default tseslint.config(
  {
    files: ['**/*.{ts,tsx}'],
    extends: [eslint.configs.recommended, tseslint.configs.recommended, importPlugin.flatConfigs.recommended],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      prettier,
      tsdoc,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'tsdoc/syntax': 'warn',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'off',

      // 외부 라이브러리 import 규칙
      // 'import/extensions': ['error', 'ignorePackages'],

      // import 순서 및 그룹화
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // node 내장 모듈
            'external', // npm 패키지
            'internal', // 프로젝트 내부 모듈
            'parent', // 상위 디렉토리
            'sibling', // 같은 디렉토리
            'index', // 현재 디렉토리
          ],
          // 'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
);
