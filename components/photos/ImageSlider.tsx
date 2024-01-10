/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */

'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

type Props = {
  images: AlbumImages[]
  photoIndex: string
};

export const ImageSlider = ({ images, photoIndex }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(parseInt(photoIndex, 10));
  const [ratio, setRatio] = useState('');
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;

    params.set('photoIndex', newIndex.toString());
    replace(`${pathname}?${params.toString()}`);
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    params.set('photoIndex', newIndex.toString());
    replace(`${pathname}?${params.toString()}`);
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    params.set('photoIndex', slideIndex.toString());
    replace(`${pathname}?${params.toString()}`);
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    setRatio(`${images[currentIndex].width} / ${images[currentIndex].height}`);
    window.addEventListener('keydown', handleArrowKeys);

    return () => {
      window.removeEventListener('keydown', handleArrowKeys);
    };
  }, [currentIndex]);
  return (

    <>
      {images && (
        <div
          className="flex justify-center items-center relative group max-h-[90vh]"
          style={{
            aspectRatio: ratio,
          }}
        >
          <div className="w-full h-full overflow-hidden flex">
            {images.map((index: any, transitionIndex: number) => (
              <Image
                key={transitionIndex}
                width={1920}
                height={1080}
                src={images[currentIndex].url}
                className="transition-all w-full h-full img-slider-img"
                style={{ translate: `${-100 * currentIndex}%` }}
                alt="Evento foto"
                priority
              />

            ))}

            <div className="z-20 fixed top-[50%] -translate-x-0 translate-y-[-50%] left-5 md:left-[10rem] text-2xl rounded-full p-2 bg-red-400/10 hover:bg-red-400/80 duration-300 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className="z-20  fixed top-[50%] -translate-x-0 translate-y-[-50%] right-5 md:right-[10rem] text-2xl rounded-full p-2 bg-red-400/10 hover:bg-red-400/80 duration-300 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
          </div>
          <div className="indicators fixed  bottom-16 margin-0 flex flex-wrap justify-center align-center">
            {images.map((slide: any, slideIndex: React.Key | null | undefined) => (
              <div
                key={`${slideIndex}bubles`}
                onClick={() => goToSlide(slideIndex as number)}
                className={currentIndex === slideIndex ? 'indicator' : 'indicator indicator-inactive'}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
