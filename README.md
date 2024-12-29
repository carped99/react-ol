# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Publish

To publish all apps and packages, run the following command:

```
pnpm recursive publish --no-git-checks
```

### Unpublish

```
pnpm unpublish {패키지명} -f
```

### 테스트 구성
Jest 환경을 설정하기 위해 다음 패키지를 설치한다.
```
pnpm add -D jest jest-environment-jsdom ts-jest jest-transform-stub @types/jest
pnpm add -D @testing-library/react @testing-library/jest-dom
```