import { OlInteractionEvents } from './OlInteractionEvents';
import { Translate } from 'ol/interaction';
import { TranslateEvent } from 'ol/interaction/Translate';

/**
 * Translate Interaction 이벤트 타입
 *
 * @category Interaction Event
 */
export interface OlTranslateInteractionEvents<T extends Translate> extends OlInteractionEvents<T> {
  onTranslateStart?: (this: T, e: TranslateEvent) => void;
  onTranslating?: (this: T, e: TranslateEvent) => void;
  onTranslateEnd?: (this: T, e: TranslateEvent) => void;
}
