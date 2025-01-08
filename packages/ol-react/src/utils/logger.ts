// @formatter:off
// prettier-ignore
export const debug =
  (typeof process !== 'undefined' && process?.env?.REACT_OL_DEBUG) ||
  (typeof window !== 'undefined' && !window?.location?.search.includes('react-ol-debug=true'))
  ? (message: () => string, ...args: unknown[]) => console.debug(message(), ...args)
    :(message: () => string, ...args: unknown[]) => console.debug(message(), ...args)
// : () => {};
// @formatter:on
