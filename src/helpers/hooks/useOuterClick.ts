import { useEffect, useState } from 'react';

function useOuterClick(innerRef: React.RefObject<any>) {
  const [isOuter, setIsOuter] = useState(false);

  useEffect(() => {
    // handle click if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (innerRef.current && !innerRef.current.contains(event.target)) {
        setIsOuter(true);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [innerRef, isOuter]);

  return { isOuter, setIsOuter };
}

export default useOuterClick;
