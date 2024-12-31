// prettier-ignore
import Observable from 'ol/Observable';
import { Select } from 'ol/interaction';
import { SelectInteractionEvents } from '@src/interaction/event/SelectInteractionEvents';

export type InteractionObservable<T extends Observable> = T extends Select ? SelectInteractionEvents<Select> : never;
