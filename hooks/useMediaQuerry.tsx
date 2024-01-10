import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);
    updateMatches();

    mediaQuery.addListener(updateMatches);

    return () => {
      mediaQuery.removeListener(updateMatches);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
