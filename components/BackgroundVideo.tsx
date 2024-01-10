/* eslint-disable react/react-in-jsx-scope */

'use client';

import { useEffect, useState } from 'react';
import BackgroundImage from './BackgroundImage';

const BackgroundVideo = () => {
  const [isClient, setIsClient] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsClient(true);
    if (navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match(/Chrome/)) {
      setIsSafari(true);
    }
  }, []);
  return (
    <>
      {isSafari ? <BackgroundImage /> : (
        <div className="z-[-9999] w-screen h-screen fixed">
          {
      isClient
      && (
      <>
        <div className="fixed w-screen h-screen bg-black bg-opacity-40" />

        <video
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
          }}
          autoPlay
          loop
          muted
          poster="/videoBgPoster.jpg"
          preload="metadata"
          playsInline
        >

          <source
            src="/videoBg.mp4"
            type="video/mp4"
          />
        </video>

      </>
      )
      }
        </div>
      )}
    </>
  );
};

export default BackgroundVideo;
