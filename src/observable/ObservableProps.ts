import { Map, View } from 'ol';
import Observable from 'ol/Observable';
import BaseEvent from 'ol/events/Event';
import { MapEvents } from '@src/event/MapEvents';
import { ViewEvents } from '@src/event/ViewEvents';
import { LayerObservable } from '@src/observable/LayerObservable';
import { InteractionObservable } from '@src/observable/InteractionObservable';

// prettier-ignore
export type ObservableProps<T extends Observable> =
  T extends Map ? MapEvents :
  T extends View ? ViewEvents :
  LayerObservable<T> | InteractionObservable<T> extends never ? DefaultEventHandler : LayerObservable<T> | InteractionObservable<T>;

// 기본 이벤트 핸들러 타입
type DefaultEventHandler = <Type extends string, EventClass extends Event | BaseEvent>(
  type: Type,
  e: EventClass,
) => void;
