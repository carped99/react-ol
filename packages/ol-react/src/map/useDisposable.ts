import Disposable from 'ol/Disposable.js';
import { useEffect } from 'react';

export const useDisposable = (instance?: Disposable) => {
  useEffect(() => {
    return () => {
      instance?.dispose();
    };
  }, [instance]);
};
