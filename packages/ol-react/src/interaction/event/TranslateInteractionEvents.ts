import { TranslateEvent } from 'ol/interaction/Translate.js';
import { InteractionEvents } from './InteractionEvents';

/**
 * Translate Interaction 이벤트 타입
 *
 * @category Interaction/Event
 */
export interface TranslateInteractionEvents extends InteractionEvents {
  onTranslateStart?: (e: TranslateEvent) => void;
  onTranslating?: (e: TranslateEvent) => void;
  onTranslateEnd?: (e: TranslateEvent) => void;
}
