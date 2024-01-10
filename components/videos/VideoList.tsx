'use client';

import { useRef } from 'react';
import YoutubeEmbed from './YoutubeEmbed';
import { placeholder } from '@/public/placeholder';

type Props = {
  ytVideos: YtVideo[],
  isLoggedIn: boolean,
  img: string[],
};

const VideoList = ({
  ytVideos, isLoggedIn, img,
}: Props) => {
  const widthTest = 854;
  const heightTest = 480;
  const containerRef = useRef(null);

  const handleXScroll = (e: any) => {
    const container = containerRef.current as HTMLDivElement | null;

    if (container && window.innerWidth > 1024) {
      container.scrollBy({
        left: e.deltaY < 0 ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };
  return (

    <div
      className=" lg:overflow-x-hidden snap-y lg:snap-x overscroll-x-contain lg:scrollbar-hide"
      onWheel={handleXScroll}
      ref={containerRef}
    >
      <div className="flex flex-col lg:flex-row justify-start items-center lg:w-2/3 lg:mx-5 center my-5">
      <div className="my-5 hidden lg:inline-block" style={{ minWidth: widthTest / 2, height: heightTest }} />
        {ytVideos.map((video: YtVideo, i) => (
          <YoutubeEmbed
            key={video._id}
            isLoggedIn={isLoggedIn}
            {...video}
            vidWidth={widthTest}
            vidHeight={heightTest}
            thumbImg={img[i]}
            thumbBlur={placeholder}
          />
        ))}
        <div className="my-5 hidden lg:inline-block" style={{ minWidth: widthTest/2, height: heightTest }} />
      </div>
    </div>
  );
};

export default VideoList;
