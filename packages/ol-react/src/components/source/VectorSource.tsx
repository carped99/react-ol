import { MutableRefObject, PropsWithChildren, useEffect } from 'react';
import { Vector } from 'ol/source';
import { useVectorSource, VectorSourceOptions } from '../../source/useVectorSource';

export const VectorSource = ({
  ref,
  children,
  ...props
}: PropsWithChildren<
  VectorSourceOptions & {
    ref?: MutableRefObject<Vector | undefined>;
  }
>) => {
  const source = useVectorSource(props);
  useEffect(() => {
    if (ref) {
      ref.current = source;
    }
  }, [ref, source]);
  return children;
};
