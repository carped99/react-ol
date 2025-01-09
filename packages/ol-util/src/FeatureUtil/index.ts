import * as common from './FeatureUtil';
import * as find from './findFeature';
import * as guard from './FeatureGuard';

export const FeatureUtil = {
  ...common,
  ...find,
  ...guard,
};
