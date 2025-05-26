import { useEffect, RefObject } from 'react';

const useClickOutside = (refs: RefObject<HTMLElement | null>[], handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const isClickInside = refs.some(
        (ref) => ref.current && ref.current.contains(event.target as Node),
      );

      if (isClickInside) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
};

export default useClickOutside;
