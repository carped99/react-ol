import { Feature as OlFeature } from 'ol';

/**
 * Feature의 속성을 업데이트합니다.
 *
 * @param feature - 속성을 업데이트할 Feature
 * @param properties - 설정할 속성 객체
 */
export const mergeProperties = (feature: OlFeature, properties: Record<string, any>) => {
  feature.setProperties({ ...feature.getProperties(), ...properties });
};
