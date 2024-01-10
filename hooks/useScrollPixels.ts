import { useEffect, useState } from 'react';

const useScrollPixels = () => {
  const [scrollPixel, setScrollPixel] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPixel(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPixel;
}

export default useScrollPixels;
