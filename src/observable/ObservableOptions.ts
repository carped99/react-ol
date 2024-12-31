import { Map, View } from 'ol';
import Observable from 'ol/Observable';
import { MapObservable } from './options/MapObservable';
import { ViewObservable } from './options/ViewObservable';
import { LayerObservable } from './options/LayerObservable';
import { InteractionObservable } from './options/InteractionObservable';

// @formatter:off
// prettier-ignore
export type ObservableOptions<T extends Observable> =
  T extends Map ? MapObservable<T> :
  T extends View ? ViewObservable<T> :
  LayerObservable<T> | InteractionObservable<T> extends never ? DefaultObservable<T>
  : LayerObservable<T> | InteractionObservable<T>;
// @formatter:on

// 기본 이벤트 핸들러 타입
type DefaultObservable<T> = { [key: string]: (this: T, e: Event) => void };
