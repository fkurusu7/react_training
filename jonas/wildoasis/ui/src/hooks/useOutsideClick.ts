import { useEffect, useRef } from 'react';

function useOutsideClick(onClose: () => void, listenCapturing: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(ev: MouseEvent) {
      if (ref.current && !ref.current.contains(ev.target as Node)) onClose();
    }

    // events bubble up, so clicking on the button the modal window will be attached to the DOM, so the click is detectedoutside the modal window which will immediately close the window again. To fix this, it's not listening for this event on the bubbling phase but the capturing phase as the event moves down the DOM tree and not up the DOM tree
    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [onClose, listenCapturing]);

  return ref;
}

export default useOutsideClick;
