import { useEffect, useState } from 'react';

function useOuterClick(
  wrapperRef: React.RefObject<any>,
  innerRef: React.RefObject<any>
) {
  const [isOuter, setIsOuter] = useState(false);

  useEffect(() => {
    // handle click if clicked outside
    const handleClickOutside = (event: React.MouseEvent<any>) => {
      if (innerRef.current && !innerRef.current.contains(event.target)) {
        setIsOuter(true);
      }
    };
    // Bind the event listener
    const wrapper = wrapperRef.current;
    wrapper.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      wrapper.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, innerRef]);

  return { isOuter };
}

export default useOuterClick;
