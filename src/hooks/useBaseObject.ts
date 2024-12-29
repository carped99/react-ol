export type OLEvent = 'change';
export type Handler = (e: unknown) => boolean | void;
export type Handlers = Record<OLEvent, Handler>;

export const useBaseObject = (_options?: { [x: string]: any }) => {
  console.log('useBaseObject', _options);
  // console.log(options);
  // const resolveEvents = useCallback(() => {
  //   Object.keys(options ?? {})
  //     .filter((p) => p.startsWith('on'))
  //     .map((ev) => ({ event: ev.toLowerCase().slice(2), prop: ev }))
  //     .reduce((a, x) => ({ ...a, [x.event]: this.props[x.prop] }), {}) as Handlers;
  // }, [options]);
  //
  // return {
  //   resolveEvents,
  // };
};

// const resolveEvents = (props: {}) => {
//   return Object.keys(props)
//     .filter((p) => p.startsWith('on'))
//     .map((ev) => ({ event: ev.toLowerCase().slice(2), prop: ev }))
//     .reduce((a, x) => ({ ...a, [x.event]: props[x.prop] }), {}) as Handlers;
// };
