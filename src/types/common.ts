export type Class<T, Arguments extends unknown[] = any[]> = {
  prototype: Pick<T, keyof T>;
  new (...arguments_: Arguments): T;
};

// @formatter:off
// prettier-ignore
export type ExtractMethods<T> = Pick<T, {
  [M in keyof T]: T[M] extends (...args: unknown[]) => unknown ? M : never
}[keyof T]>;
// @formatter:on

// @formatter:off
// prettier-ignore
export type SetterNames<T> = {
  [M in keyof ExtractMethods<T>]: M extends `set${infer N}` ? Uncapitalize<N & string> : never;
}[keyof ExtractMethods<T>];
// @formatter:on
