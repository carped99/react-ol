import { Disposable } from 'ol';
import { useEffect } from 'react';

export const useDisposable = (instance?: Disposable) => {
  useEffect(() => {
    return () => {
      instance?.dispose();
    };
  }, [instance]);
};
