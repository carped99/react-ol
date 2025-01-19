import { useEffect, useRef } from 'react';
import { EventsKey, ListenerFunction } from 'ol/events';
import Observable, { EventTypes, unByKey } from 'ol/Observable';
import { ObservableEvents } from './ObservableEvents';

type Listeners = Record<string, ListenerFunction>;

/**
 * Observable 객체의 이벤트를 관리하는 훅
 *
 * @typeParam T - Observable 객체 타입
 * @param target - 이벤트를 등록할 Observable 객체
 * @param handlers - 이벤트 핸들러 객체
 *
 * @example
 * ```tsx
 * // Map 이벤트
 * useEvents(map, {
 *   click: (e) => console.log('Map clicked:', e),
 *   movestart: (e) => console.log('Map move started:', e)
 * });
 *
 * // Layer 이벤트
 * useEvents(layer, {
 *   change: (e) => console.log('Layer changed:', e),
 *   propertychange: (e) => console.log('Layer property changed:', e)
 * });
 * ```
 */
export const useEvents = <T extends Observable>(target: T | undefined, handlers?: ObservableEvents<T>) => {
  // 이벤트 핸들러를 관리하기 위해 이벤트 키 목록 저장
  const eventsKeysRef = useRef<EventsKey[]>([]);

  // target이 변경되면 모든 이벤트 정리
  useEffect(() => {
    return () => {
      if (eventsKeysRef.current.length > 0) {
        unByKey(eventsKeysRef.current);
        eventsKeysRef.current = [];
      }
    };
  }, [target]);

  // handlers가 변경되면 이벤트 갱신
  useEffect(() => {
    if (!target) return;

    // 속성 중 이벤트 핸들러만 추출
    const eventHandlers = resolveEventHandlers(handlers);

    // 사용되지 않는 이벤트 핸들러 제거
    const newEventsKeys = pruneEvents(eventsKeysRef.current, eventHandlers);

    // 새로운 이벤트 핸들러 등록
    Object.entries(eventHandlers)
      .filter(([type]) => !newEventsKeys.some((key) => key.type === type))
      .forEach(([type, handler]) => {
        const key = target.on(type as EventTypes, handler);
        newEventsKeys.push(key);
      });

    eventsKeysRef.current = newEventsKeys;
  }, [target, handlers]);
};

const resolveEventHandlers = (options?: unknown): Listeners => {
  if (!options || typeof options !== 'object') {
    return {};
  }

  const handlers: Listeners = {};

  for (const [type, value] of Object.entries(options)) {
    if (!isEventListener(type, value)) continue;
    handlers[normalizeEventType(type)] = value as (event: any) => void;
  }

  return handlers;
};

/**
 * 이벤트 핸들러인지 확인한다.
 * 입력한 모든 이벤트 타입이 등록 가능하므로, type 값은 확인하지 않는다.
 * @param _type - 이벤트 타입
 * @param value - 함수
 */
const isEventListener = (_type: string, value: unknown) => {
  return typeof value === 'function';
};

/**
 * 이벤트 핸들러 이름을 OpenLayers 이벤트 타입으로 정규화
 *
 * @example
 * ```ts
 * normalizeEventType('onClick') // -> 'click'
 * normalizeEventType('onChangeResolution') // -> 'change:resolution'
 * normalizeEventType('customEvent') // -> 'customEvent'
 * ```
 */
const normalizeEventType = (handlerName: string) => {
  // 'on' 접두사가 없거나 길이가 3 미만이면 원본 반환
  if (handlerName.length < 3 || !handlerName.startsWith('on')) {
    return handlerName;
  }

  // 세 번째 문자가 대문자가 아니면 원본 반환
  const thirdChar = handlerName[2];
  if (thirdChar !== thirdChar.toUpperCase()) {
    return handlerName;
  }

  // 'on' 접두사 제거
  const eventType = handlerName.slice(2);

  // 'Change' 접두사 처리
  if (eventType.length > 6 && eventType.startsWith('Change')) {
    return `change:${eventType[6].toLowerCase()}${eventType.slice(7)}`;
  }

  // 일반 이벤트 타입으로 변환
  return eventType.toLowerCase();
};

/**
 * 이벤트 핸들러 목록에서 사용되지 않는 핸들러를 제거한다.
 * @param eventsKeys - 현재 이벤트 핸들러 목록
 * @param handlers - 새로운 이벤트 핸들러 목록
 */
const pruneEvents = (eventsKeys: EventsKey[], handlers: Listeners) => {
  const { validKeys, invalidKeys } = eventsKeys.reduce(
    (acc, eventKey) => {
      const { type, listener } = eventKey;

      if (handlers[type] === listener) {
        acc.validKeys.push(eventKey);
      } else {
        acc.invalidKeys.push(eventKey);
      }
      return acc;
    },
    { validKeys: [] as EventsKey[], invalidKeys: [] as EventsKey[] },
  );

  if (invalidKeys.length) {
    unByKey(invalidKeys);
  }

  return validKeys;
};
