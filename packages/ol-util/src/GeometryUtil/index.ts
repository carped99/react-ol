import * as cellGrid from './cellGrid';
import * as intersect from './intersect';
import * as splitPolygon from './splitPolygon';

export type { CellGridResponse } from './cellGrid';

/**
 * @packageDocumentation GeometryUtil
 */
export const GeometryUtil: typeof cellGrid & typeof splitPolygon & typeof intersect = {
  ...cellGrid,
  ...splitPolygon,
  ...intersect,
};
