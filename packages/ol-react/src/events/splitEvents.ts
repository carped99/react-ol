export const splitEvents = <T extends object, E extends object>(
  props: T & E,
  eventPrefix: string = 'on',
): { options: Partial<T>; events: Partial<E> } => {
  const events = {} as Partial<E>;
  const options = {} as Partial<T>;

  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith(eventPrefix)) {
      events[key as keyof E] = value;
    } else {
      options[key as keyof T] = value;
    }
  });

  return { options, events };
};
