import { useEffect } from 'react';

const useOnClickOutside = (refPopup, refBtn, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !refPopup.current ||
        refPopup.current.contains(event.target) ||
        event.target === refBtn.current
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refPopup, refBtn, handler]);
};

export { useOnClickOutside };
