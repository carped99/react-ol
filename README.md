# React Components for OpenLayers

## Using this example

Run the following command:

```sh
pnpm add @carped99/react-ol
```


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

### 문서화 도구
 - [TSDoc](https://tsdoc.org)
 - [TypeDoc](https://typedoc.org)
 - https://www.thecandidstartup.org/2024/08/05/bootstrapping-typedoc.html
```
pnpm add -D jest jest-environment-jsdom ts-jest jest-transform-stub @types/jest
pnpm add -D @testing-library/react @testing-library/jest-dom
```