/* eslint-disable react/react-in-jsx-scope */

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { placeholder } from '@/public/placeholder';

type Props = {
  images: AlbumImages[],
  index: number,
  onClose: () => void,
};

const ImageSlider2 = ({
  images, index, onClose,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(index);

  const totalImages = images.length;
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleArrowKeys);

    return () => {
      window.removeEventListener('keydown', handleArrowKeys);
    };
  }, [currentIndex]);

  return (
    <div className="relative h-screen flex flex-col justify-center items-center">
      <div
        className="relative max-h-[90vh] md:max-h-[80vh]"
        style={{
          aspectRatio: `${images[currentIndex].width} / ${images[currentIndex].height}`,
        }}
      >
        <Image
          key={`${images[currentIndex]._id}slider`}
          width={images[currentIndex].width}
          height={images[currentIndex].height}
          src={images[currentIndex].url}
          className="opacity-0 img-slider__aniamtion"
          alt="albumo ft"
          priority
        />

      </div>

      <div className="z-20 fixed top-[50%] -translate-x-0 translate-y-[-50%] left-5 md:left-[10rem] text-2xl rounded-full p-2 bg-red-400/10 hover:bg-red-400/80 duration-300 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="z-20  fixed top-[50%] -translate-x-0 translate-y-[-50%] right-5 md:right-[10rem] text-2xl rounded-full p-2 bg-red-400/10 hover:bg-red-400/80 duration-300 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>

      <div className="hidden md:flex center max-w-[90%] fixed bottom-12 flex-wrap justify-center align-center">
        {images.map((_, i) => (
          <div
            key={`${i}bubles`}
            onClick={() => goToSlide(i)}
            className={currentIndex === i ? 'indicator' : 'indicator indicator-inactive'}
          />
        ))}
      </div>
      <p className="flex md:hidden text-white text-2xl absolute bottom-8 left-1">
        {currentIndex + 1}
        /
        {totalImages}
      </p>
    </div>
  );
};

export default ImageSlider2;
