import { useEffect, useState } from 'react';

const useScrollPercentage = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const positionTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const { scrollHeight } = document.documentElement;

    setScrollPercentage(Math.ceil((positionTop / (scrollHeight - windowHeight)) * 100));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPercentage;
}

export default useScrollPercentage;
