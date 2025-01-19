import Observable from 'ol/Observable';
import { CustomObservableEvents } from './CustomObservableEvents';
import { DefaultObservableEvents } from './DefaultObservableEvents';

// 기본 이벤트 핸들러 타입
type DefaultObservable = { [key: string]: (e: Event) => void };

/**
 * Observable 이벤트 타입
 * 1. `DefaultObservableEvents`에 정의된 타입이 있으면 해당 타입 사용
 * 2. `CustomObservableEvents`에 정의된 타입이 있으면 해당 타입 사용
 * 3. 둘 다 없으면 DefaultObservable 사용
 */
export type ObservableEvents<T extends Observable> =
  DefaultObservableEvents<T> extends never
    ? CustomObservableEvents extends never
      ? DefaultObservable
      : CustomObservableEvents
    : DefaultObservableEvents<T>;
