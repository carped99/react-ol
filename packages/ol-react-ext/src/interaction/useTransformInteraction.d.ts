import Transform, { Options } from 'ol-ext/interaction/Transform';
export interface TransformInteractionOptions extends Options {
}
export declare const useTransformInteraction: (options?: TransformInteractionOptions, active?: boolean) => Transform;
