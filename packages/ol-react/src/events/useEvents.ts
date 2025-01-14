import { useEffect, useRef } from 'react';
import { EventsKey, ListenerFunction } from 'ol/events';
import Observable, { EventTypes, unByKey } from 'ol/Observable';

type Listeners = Record<string, ListenerFunction>;

/**
 * {@link Observable}에 이벤트 핸들러를 등록한다.
 *
 * @typeParam T - Type of target observable object
 * @param target - 이벤트를 등록할 OpenLayers 객체
 * @param events - 이벤트 핸들러를 포함한 속성
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_Observable-Observable.html | Observable}
 *
 * @category Event
 */
export const useEvents = <T>(target?: Observable, events?: T) => {
  // 이벤트 핸들러를 관리하기 위해 이벤트 키 목록 저장
  const eventsKeysRef = useRef<EventsKey[]>([]);

  // 대상이 변경되면 이벤트 핸들러를 모두 제거
  useEffect(() => {
    if (!target) return;

    return () => {
      unByKey(eventsKeysRef.current);
      eventsKeysRef.current = [];
    };
  }, [target]);

  useEffect(() => {
    if (!target) return;

    // 속성 중 이벤트 핸들러만 추출
    const eventHandlers = resolveEventHandlers(events);

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
  }, [target, events]);
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
