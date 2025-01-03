import { InteractionEvents } from './InteractionEvents';
import { Translate } from 'ol/interaction';
import { TranslateEvent } from 'ol/interaction/Translate';

/**
 * Translate Interaction 이벤트 타입
 *
 * @category Interaction Event
 */
export interface TranslateInteractionEvents<T extends Translate> extends InteractionEvents<T> {
  onTranslateStart?: (this: T, e: TranslateEvent) => void;
  onTranslating?: (this: T, e: TranslateEvent) => void;
  onTranslateEnd?: (this: T, e: TranslateEvent) => void;
}
