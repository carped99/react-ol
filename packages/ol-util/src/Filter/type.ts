import { byName, byProperties, byProperty, byType, byUid } from './api';

export const AlwaysTrue = () => true;

export const commonFilters = {
  byType,
  byName,
  byProperty,
  byProperties,
  byUid,
};
