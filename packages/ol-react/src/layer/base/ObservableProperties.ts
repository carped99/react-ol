export type InstanceProperty = {
  name: string;
  settable?: boolean;
  nullable?: boolean;
  nullValue?: unknown;
};

export const InstanceProperties = {
  className: { name: 'className', settable: false }, // A CSS class name to set to the layer element.
  opacity: { name: 'opacity', settable: true }, // Opacity (0, 1).
  visible: { name: 'visible', settable: true }, // Visibility.
  extent: { name: 'extent', settable: true, nullable: true }, // The bounding extent for layer rendering. The layer will not be rendered outside of this extent.
  zIndex: { name: 'zIndex', settable: true, nullable: true }, // The z-index for layer rendering. At rendering time, the layers will be ordered, first by Z-index and then by position.
  minZoom: { name: 'minZoom', settable: true }, // The minimum view zoom level (exclusive) above which this layer will be visible.
  maxZoom: { name: 'maxZoom', settable: true }, // The maximum view zoom level (inclusive) at which this layer will be visible.
  minResolution: { name: 'minResolution', settable: true }, // The minimum resolution (inclusive) at which this layer will be visible.
  maxResolution: { name: 'maxResolution', settable: true }, // The maximum resolution (exclusive) below which this layer will be visible.
  background: { name: 'background', settable: false, nullable: true }, // Background color for the layer. If not specified, no background will be rendered.
};

const BaseLayerInstanceProperties: ReadonlyArray<InstanceProperty> = [
  { name: 'className' }, // A CSS class name to set to the layer element.
  { name: 'opacity', settable: true }, // Opacity (0, 1).
  { name: 'visible', settable: true }, // Visibility.
  { name: 'extent', settable: true, nullable: true }, // The bounding extent for layer rendering. The layer will not be rendered outside of this extent.
  { name: 'zIndex', settable: true, nullable: true }, // The z-index for layer rendering. At rendering time, the layers will be ordered, first by Z-index and then by position.
  { name: 'minZoom', settable: true }, // The minimum view zoom level (exclusive) above which this layer will be visible.
  { name: 'maxZoom', settable: true }, // The maximum view zoom level (inclusive) at which this layer will be visible.
  { name: 'minResolution', settable: true }, // The minimum resolution (inclusive) at which this layer will be visible.
  { name: 'maxResolution', settable: true }, // The maximum resolution (exclusive) below which this layer will be visible.
  { name: 'background', settable: false, nullable: true }, // Background color for the layer. If not specified, no background will be rendered.
  // { name: 'properties', settable: true, nullable: true },
];

const LayerInstanceProperties: ReadonlyArray<InstanceProperty> = [
  ...BaseLayerInstanceProperties,
  { name: 'source', settable: true, nullable: true }, // Source.
  { name: 'map', settable: true, nullable: true }, // Source.
];

export const BaseTileLayerInstanceProperties: ReadonlyArray<InstanceProperty> = [
  ...LayerInstanceProperties,
  { name: 'cacheSize' },
  { name: 'preload', settable: true },
];

export const BaseVectorInstanceProperties: ReadonlyArray<InstanceProperty> = [
  ...LayerInstanceProperties,
  { name: 'renderOrder' },
  { name: 'renderBuffer' },
  { name: 'updateWhileAnimating' },
  { name: 'updateWhileInteracting' },
  { name: 'declutter', settable: true, nullable: false },
  { name: 'style', settable: true, nullable: true },
];

export const BaseImageLayerInstanceProperties: ReadonlyArray<InstanceProperty> = [...LayerInstanceProperties];

export const BaseLayerCreateKeys = ['className'] as const;

export const BaseLayerUpdateKeys = [
  'minZoom',
  'maxZoom',
  'minResolution',
  'maxResolution',
  'zIndex',
  'opacity',
  'visible',
  'extent',
  'background',
] as const;

export const BaseLayerNullishKeys = [
  'minZoom',
  'maxZoom',
  'minResolution',
  'maxResolution',
  'zIndex',
  'opacity',
  'visible',
  'extent',
  'background',
] as const;

export const LayerCreateKeys = [...BaseLayerCreateKeys] as const;
export const LayerUpdateKeys = [...BaseLayerUpdateKeys, 'source'] as const;

// export const LayerKeys = [...BaseLayerKeys, 'source', 'map'] as const satisfies readonly (
//   | keyof LayerOptions
//   | 'map'
//   | 'background'
// )[];
//
// export const BaseTileLayerKeys = [...LayerKeys, 'preload'] as const satisfies readonly (keyof BaseTileOptions<any>)[];
//
// export const BaseImageLayerKeys = [...LayerKeys] as const satisfies readonly (
//   | keyof BaseImageOptions<any>
//   | 'background'
// )[];

export const BaseVectorLayerCreateKeys = [
  ...BaseLayerCreateKeys,
  'updateWhileAnimating',
  'updateWhileInteracting',
] as const;

export const BaseVectorLayerUpdateKeys = [
  ...BaseLayerUpdateKeys,
  'renderOrder',
  'source',
  'declutter',
  'style',
  'properties',
] as const;
