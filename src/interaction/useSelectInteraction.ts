import { useEffect, useMemo } from 'react';
import { Select } from 'ol/interaction';
import { Options as SelectOptions, SelectEvent } from 'ol/interaction/Select';
import { unByKey } from 'ol/Observable';
import { useInteraction } from './useInteraction';

export const useSelectInteraction = ({
  active = true,
  onSelect,
  selectOptions,
}: {
  active?: boolean;
  onSelect?: (event: SelectEvent) => void;
  selectOptions?: SelectOptions;
}) => {
  const select = useMemo(() => new Select(selectOptions), [selectOptions]);

  useInteraction(select, active);

  useEffect(() => {
    if (!onSelect) return;

    const selectKey = select.on('select', onSelect);

    return () => {
      unByKey(selectKey);
    };
  }, [select, onSelect]);

  return select;
};
