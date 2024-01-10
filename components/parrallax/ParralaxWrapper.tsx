'use client';

import React from 'react';
import useMediaQuery from '@/hooks/useMediaQuerry';
import ParralaxHeaderMobile from './ParralaxHeaderMobile';
import ParralaxHeader from './ParralaxHeader';

const ParralaxWrapper = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div>
      {isMobile ? (
        <ParralaxHeaderMobile />
      ) : (
        <ParralaxHeader />
      )}
    </div>
  );
};

export default ParralaxWrapper;
