'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { BiLoaderCircle } from 'react-icons/bi';
import BtnRemoveVideo from '../buttons/BtnRemoveVideo';
import { dateToDisplay } from '@/lib/stringFormaters';
import { placeholder } from '@/public/placeholder';

type Props = {
  _id: string,
  name: string,
  date: string,
  youtubeId: string,
  thumbImg: string,
  thumbBlur: string,
  event?: string
  vidWidth: number,
  vidHeight: number,
  isLoggedIn: boolean
};

const YoutubeEmbed = ({
  _id, name, date, youtubeId, event, vidWidth, vidHeight, isLoggedIn, thumbImg, thumbBlur,
}: Props) => {
  const [showVideo, setShowVideo] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative lg:mx-20 my-5 mx-5 px-5 w-full snap-center">
      {showVideo
        ? (
          <>
            <div
              className={`absolute z-[100] select-none pointer-events-none overflow-hidden duration-200 
                    ${loaded ? 'opacity-0' : 'opacity-100'}
                    `}
            >
              <div className="relative lg:w-[854px] lg:h-[480px]">
                <Image
                  width={vidWidth}
                  height={vidHeight}
                  sizes="854px"
                  alt="Youtube video thumbnail"
                  placeholder="blur"
                  blurDataURL={placeholder}
                  src={thumbImg}
                />
                {!loaded
                         && (
                         <div className="absolute  inset-0 loaderSpin  flex justify-center text-[4rem] md:text-[6rem] lg:text-[12rem] items-center text-red-400">
                           <BiLoaderCircle />
                         </div>
                         )}
              </div>
            </div>

            <div className="relative overflow-hidden lg:w-[854px] m-0 lg:h-[480px] w-full pt-[56.25%] ">
              <iframe
                className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?&autoplay=1`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setLoaded(true)}
              />
            </div>
          </>
        )
        : (
          <div className="relative lg:w-[854px] lg:h-[480px]">
            <Image
              width={vidWidth}
              height={vidHeight}
              sizes="854px"
              alt="Youtube video thumbnail"
              placeholder="blur"
              blurDataURL={placeholder}
              src={thumbImg}
            />
            <button
              className="absolute inset-0 flex justify-center text-[45px] md:text-[65px] lg:text-[85px] items-center  text-red-400 hover:text-red-600 hover:scale-90 transition-all duration-300 ease-in"
              type="button"
              onClick={() => setShowVideo(true)}
            >
              <FaCirclePlay />

            </button>
          </div>
        )}
      <div className="flex flex-col items-center sm:flex-row justify-center mt-3">
        <h4 className="text-1xl sm:text-xl md:text-3xl mr-5 text-red-400 font-popins font-bold uppercase">{name}</h4>
        {isLoggedIn
        && <BtnRemoveVideo addClass="ml-auto" id={_id} name={name} />}
      </div>
      <p className="text-white text-base sm:text-lg md:text-xl">{dateToDisplay(date)}</p>
    </div>
  );
};

export default YoutubeEmbed;
