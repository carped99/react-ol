import BaseObject from 'ol/Object';
import { useEffect, useRef } from 'react';
import { EventsKey, ListenerFunction } from 'ol/events';
import { EventTypes, unByKey } from 'ol/Observable';

type EventHandlers = Record<string, ListenerFunction>;

export const useEventHandler = <T extends BaseObject>(target?: T, props?: Readonly<unknown>) => {
  const eventKeysRef = useRef<EventsKey[]>([]);

  // Cleanup on component unmount or when target changes
  useEffect(() => {
    if (!target) return;

    return () => {
      unByKey(eventKeysRef.current);
      eventKeysRef.current = [];
    };
  }, [target]);

  useEffect(() => {
    if (!target || !props) return;

    // 속성 중 이벤트 핸들러만 추출
    const eventHandlers = resolveEventHandlers(props);

    // 사용되지 않는 이벤트 핸들러 제거
    eventKeysRef.current = pruneEvents(eventKeysRef.current, eventHandlers);

    // 새로운 이벤트 핸들러 등록
    Object.entries(eventHandlers)
      .filter(([type]) => !eventKeysRef.current.some((eventKey) => eventKey.type === type))
      .map(([type, handler]) => target.on(type as EventTypes, handler))
      .forEach((eventKey) => eventKeysRef.current.push(eventKey));
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

const resolveEventName = (key: string) => key.slice(2).toLowerCase();

/**
 * 현재 이벤트 핸들러 목록에서 사용되지 않는 핸들러를 제거한다.
 * @param events
 * @param handlers
 */
const pruneEvents = (events: EventsKey[], handlers: EventHandlers) => {
  const [validKeys, invalidKeys] = events.reduce<[EventsKey[], EventsKey[]]>(
    (acc, eventKey) => {
      const { type, listener } = eventKey;

      if (handlers[type] === listener) {
        acc[0].push(eventKey);
      } else {
        acc[1].push(eventKey);
      }
      return acc;
    },
    [[], []],
  );

  unByKey(invalidKeys);

  return validKeys;
};
