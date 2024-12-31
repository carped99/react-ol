import { useEffect, useRef } from 'react';
import { EventsKey, ListenerFunction } from 'ol/events';
import Observable, { EventTypes, unByKey } from 'ol/Observable';
import { ObservableProps } from '@src/hooks/observable/ObservableProps';

type EventHandlers = Record<string, ListenerFunction>;

/**
 * OpenLayers 객체에 이벤트 핸들러를 등록한다.
 * @param target 이벤트를 등록할 OpenLayers 객체
 * @param props 이벤트 핸들러를 포함한 속성
 */
export const useObservable = <T extends Observable, P extends ObservableProps<T>>(target: T, props?: Readonly<P>) => {
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
    const eventHandlers = resolveEventHandlers(props);

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
  }, [target, props]);
};

const resolveEventHandlers = (options?: Readonly<unknown>): EventHandlers => {
  return Object.entries(options ?? {})
    .filter(([key, value]) => isEventHandler(key, value))
    .reduce<EventHandlers>((acc, [key, value]) => {
      const eventName = resolveEventName(key);
      acc[eventName] = value as (event: any) => void;
      return acc;
    }, {});
};

const isEventHandler = (key: string, value: unknown) => {
  return key.startsWith('on') && typeof value === 'function';
};

const resolveEventName = (key: string) => {
  // `on` 접두사 제거
  const type = key.slice(2);

  // `change` 이벤트는 `change:`로 변경
  if (type.length > 6 && type.startsWith('change')) {
    return 'change:' + type.at(6)!.toLowerCase() + type.slice(7);
  }

  // 소문자로 변환
  return type.toLowerCase();
};

/**
 * 현재 이벤트 핸들러 목록에서 사용되지 않는 핸들러를 제거한다.
 * @param eventsKeys
 * @param handlers
 */
const pruneEvents = (eventsKeys: EventsKey[], handlers: EventHandlers) => {
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
