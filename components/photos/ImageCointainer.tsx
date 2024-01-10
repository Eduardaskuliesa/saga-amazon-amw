'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { deletePhoto } from '@/services/client/photos';
import ImageSlider2 from './ImageSlider2';
import { placeholder } from '@/public/placeholder';

type Props = {
  images: AlbumImages[],
  alt: string,
  index: number,
  albumId: string,
  publicId: string,
  isLoggedIn: boolean,
  height: number,
  width: number
};

const ImageCointainer = ({
  images, alt, index, albumId, publicId, isLoggedIn,
  height, width,
}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);

  const widhtHeightRatio = height / width;
  const galleryHeight = Math.ceil(250 * widhtHeightRatio);
  const photoSpan = Math.ceil(galleryHeight / 10) + 1;

  const handleDelete = async () => {
    setLoading(true);
    await deletePhoto(albumId, publicId);
    setLoading(false);
    router.refresh();
  };
  return (
    <div
      className="relative"
      style={{ gridRow: `span ${photoSpan}` }}
    >
      <div className="relative overflow-hidden flex justify-center items-center group">
        <Image
          onClick={() => setPopUpOpen(true)}
          src={images[index].url}
          alt={alt}
          width={350}
          height={galleryHeight}
          sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
          className="group-hover:opacity-75 photo-in cursor-pointer rounded-xl"
        />
        {isLoggedIn && (
        <button
          className={`text-2xl absolute top-1 right-2 text-red-700 ${loading ? 'loading-button' : ''}`}
          type="button"
          onClick={() => handleDelete()}
        >
          &#9932;
        </button>
        )}
      </div>

      {popUpOpen
        && (
        <div className="fixed z-40 right-0 top-0 w-screen h-screen flex justify-center items-center">
          <div onClick={() => setPopUpOpen(false)} className="absolute w-screen h-screen inset-0 backdrop-blur-sm bg-black/50" />

          <div className="relative">
            <button
              className="text-4xl z-50 md:hidden hover:text-red-400 duration-300 absolute bottom-6 right-[50%] translate-x-[50%]  text-red-700 "
              type="button"
              onClick={() => setPopUpOpen(false)}
            >
              &#9932;
            </button>
            <ImageSlider2
              onClose={() => setPopUpOpen(false)}
              index={index}
              images={images}
            />

          </div>

        </div>
        )}
    </div>
  );
};

export default ImageCointainer;
