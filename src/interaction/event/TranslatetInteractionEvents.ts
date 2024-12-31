import { InteractionEvents } from './InteractionEvents';
import { Translate } from 'ol/interaction';
import { TranslateEvent } from 'ol/interaction/Translate';

export interface TranslateInteractionEvents<T extends Translate> extends InteractionEvents<T> {
  onTranslateStart?: (this: T, e: TranslateEvent) => void;
  onTranslating?: (this: T, e: TranslateEvent) => void;
  onTranslateEnd?: (this: T, e: TranslateEvent) => void;
}
