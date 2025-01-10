import { byProperty } from './byProperty';

export const byName = (name: string) => {
  return byProperty('name', name);
};
