import { SelectEvent } from 'ol/interaction/Select';
import { OlInteractionEvents } from './OlInteractionEvents';
import { Select } from 'ol/interaction';

/**
 * Select Interaction 이벤트
 *
 * @category Interaction Event
 */
export interface OlSelectInteractionEvents<T extends Select> extends OlInteractionEvents<T> {
  onSelect?: (this: T, e: SelectEvent) => void;
}
