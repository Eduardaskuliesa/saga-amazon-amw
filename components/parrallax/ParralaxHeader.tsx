'use client';

import React from 'react';
import useScrollPixels from '@/hooks/useScrollPixels';

const ParralaxHeader = () => {
  const scrollPix = useScrollPixels();

  return (
    <div className="main-header">
      <div className="layers">
        <div
          className="layer__header  will_transform z-10 text-up-animation"
          style={{
            transform: `translate3d(0, ${scrollPix / 1.8}px, 0)`,
          }}
        >
          <div className="layers__title font-popins font-black"><h1>Saga Plans</h1></div>
          <div className="layers__caption"><h2 className="font-popins font-semibold">Geriausi eventai pajūryjė</h2></div>
        </div>
        {/* <div className="layer">
          <Image
            alt="ParralaxTop"
            src="/ParallaxTop.png"
            fill
            style={{
              transform: `translate3d(0, ${scrollPix / 1.6}px, 0)`,
            }}
            priority
          />
        </div> */}
        <div
          className="layer"
          style={{
            backgroundImage: 'url(/ParallaxTop.png)',
            transform: `translate3d(0, ${scrollPix / 1.6}px, 0)`,
          }}
        />
        {/* <div className="layer">
          <Image
            alt="ParralaxBottom"
            src="/ParallaxBottom.png"
            fill
            style={{
              transform: `translate3d(0, ${scrollPix / 4}px, 0)`,
            }}
          />
        </div> */}
        <div
          className="layer"
          style={{
            backgroundImage: 'url(/ParallaxBottom.png)',
            transform: `translate3d(0, ${scrollPix / 4}px, 0`,
          }}
        />
      </div>
    </div>
  );
};

export default ParralaxHeader;
