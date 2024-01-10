'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import BtnSocial from '../buttons/BtnSocial';
import SocialsContainer from './SocialsContainer';

type Props = {
  name: string,
  imgSrc: string,
  blurImg: string | '',
  imgAlt: string,
  socials?: Socials[]
  index?: number,
};

const DjCard = ({
  name, imgSrc, imgAlt, socials, index = 0, blurImg,
}: Props) => {
  const [overlayHovered, setOverlayHovered] = useState(false);
  const [obsRef, inView] = useInView({
    threshold: 0.3,
  });

  const position = index % 2 === 0 ? 'self-end ' : 'self-start';
  const hiddenAnim = index % 2 === 0 ? 'translate-x-[20vw] opacity-0' : 'translate-x-[-20vw] opacity-0';

  return (
    <div
      ref={obsRef}
      onMouseEnter={() => setOverlayHovered(() => true)}
      onMouseLeave={() => setOverlayHovered(() => false)}
      className={` ${inView ? 'translate-x-0 opacity-100' : hiddenAnim}  ${position}
      ease-in-out-bounce duration-700 flex flex-col justify-center items-center mt-32 mx-5 sm:mx-20`}
    >
      <div className="relative shadow-xxl ">
        <Image
          className={`rounded ${overlayHovered && index % 2 !== 0 ? 'rounded-none rounded-s' : 'rounded-none rounded-e'}
                    `}
          src={imgSrc}
          height={720}
          width={720}
          sizes="(min-width: 940px) 720px, (min-width: 640px) calc(85.71vw - 69px), 439px"
          alt={imgAlt}
          placeholder="blur"
          blurDataURL={blurImg}
        />
        <div className="absolute pointer-events-none top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] box-border w-[95%] h-[90%] border-solid border-4 border-red-400" />
        {socials && socials.length > 0

          && (
          <SocialsContainer
            isHovered={overlayHovered}
            index={index}
          >

            {socials.map((social) => (
              <BtnSocial key={social._id} platform={social.platform} url={social.url} />
            ))}
          </SocialsContainer>
          )}
      </div>
      <h3 className="text-4xl w-full text-white text-center font-grafiti mt-24 lg:mt-10  min-[400px]:text-5xl min-[500px]:text-6xl ">
        {name}
      </h3>
    </div>

  );
};

export default DjCard;
