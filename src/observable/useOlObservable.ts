import { useEffect, useRef } from 'react';
import { EventsKey, ListenerFunction } from 'ol/events';
import Observable, { EventTypes, unByKey } from 'ol/Observable';
import { OlObservableOptions } from './OlObservableOptions';

type Listeners = Record<string, ListenerFunction>;

/**
 * OpenLayers 객체에 이벤트 핸들러를 등록한다.
 * @param target - 이벤트를 등록할 OpenLayers 객체
 * @param options - 이벤트 핸들러를 포함한 속성
 *
 * @category Observable
 */
export const useOlObservable = <T extends Observable>(target: T, options?: Readonly<OlObservableOptions<T>>) => {
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
    const eventHandlers = resolveEventHandlers(options);

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
  }, [target, options]);
};

const resolveEventHandlers = (options?: Readonly<unknown>): Listeners => {
  return Object.entries(options ?? {})
    .filter(([type, value]) => isEventListener(type, value))
    .reduce<Listeners>((acc, [type, value]) => {
      const eventType = normalizeEventType(type);
      acc[eventType] = value as (event: any) => void;
      return acc;
    }, {});
};

/**
 * 이벤트 핸들러인지 확인한다.
 * 입력한 모든 이벤트 타입이 등록 가능하므로, type 값은 확인하지 않는다.
 * @param _type 이벤트 타입
 * @param value 함수
 */
const isEventListener = (_type: string, value: unknown) => {
  return typeof value === 'function';
};

const isUpperCase = (char: string) => char === char.toUpperCase();

const normalizeEventType = (handlerName: string) => {
  // 이벤트 핸들러인 경우(`on`으로 시작하고, 세 번째 글자가 대문자인 경우)
  if (handlerName.length > 2 && handlerName.startsWith('on') && isUpperCase(handlerName[2])) {
    // `on` 접두사 제거
    const eventType = handlerName.slice(2);

    // `Change...` 이벤트는 `change:`로 변경
    if (eventType.length > 6 && eventType.startsWith('Change')) {
      // camelCase (앞글자만 소문자로 변경하고, 나머지는 그대로 유지)
      return 'change:' + eventType[6].toLowerCase() + eventType.slice(7);
    }
    // 소문자로 변환
    return eventType.toLowerCase();
  }

  // 이벤트 핸들러가 아닌 경우 원본 반환
  return handlerName;
};

/**
 * 현재 이벤트 핸들러 목록에서 사용되지 않는 핸들러를 제거한다.
 * @param eventsKeys
 * @param handlers
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

  if (invalidKeys.length > 0) {
    unByKey(invalidKeys);
  }

  return validKeys;
};
