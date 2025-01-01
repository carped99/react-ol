import { SelectEvent } from 'ol/interaction/Select';
import { OlInteractionEvents } from './OlInteractionEvents';

/**
 * Pointer Interaction 이벤트 타입
 *
 * @category Interaction Event
 */
export interface OlPointerInteractionEvents<T> extends OlInteractionEvents<T> {
  handleDownEvent?: (this: T, e: SelectEvent) => void;
}
