import { useEffect, useRef } from 'react';

const useClickOutside = <T extends HTMLElement>(
  ref: any,
  onClose: () => void,
  onOpen: () => void,
): React.RefObject<T> => {
  // const ref = useRef<T>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      console.log(ref.current, event.target)
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      } 
      else {
        onOpen();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, onClose, onOpen]);

  return ref;
};

export default useClickOutside;
