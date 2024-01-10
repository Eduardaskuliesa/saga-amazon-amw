import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import NavLink from '../navbar/NavLink';
import { placeholder } from '@/public/placeholder';
import BtnDelAlbum from '../buttons/BtnDelAlbum';
import BtnEdit from '../buttons/BtnEdit';
import { dateToDisplayAlbum } from '@/utils/stringFormaters';

type Props = {
  album: Album
  isLoggedIn: boolean
  index: number
};

const AlbumCard = ({ album, isLoggedIn, index }: Props) => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <div className="relative">
      <NavLink
        href={`/photos/${album._id}`}
        className="pb-[100px] md:pt-[144px] flex gap-4 flex-col text-left"
      >
        <div className="flex aspect-square">
          <Image
            style={{
              width: 400,
              objectFit: 'cover',
            }}
            className={`${inView ? 'photo-in' : ''} shadow-2xl aspect-square opacity-0`}
            placeholder="blur"
            blurDataURL={placeholder}
            height={500}
            width={500}
            src={album.images[0].url}
            alt={album.name}
            ref={ref}
          />
        </div>
        <div ref={ref} className={`${inView ? 'text-up-animation' : ''} opacity-0`}>
          <h3 className="flex flex-wrap max-w-[400px] text-5xl font-black font-popins text-shadow-sm mb-1 text-red-400 uppercase hover:text-stroke">
            {album.name}
          </h3>
          <p className="text-3xl text-white">{dateToDisplayAlbum(album.date)}</p>
        </div>

      </NavLink>

      {isLoggedIn && (
      <div>
        <BtnDelAlbum album={album} />
        <BtnEdit hrefOpen={`photos/?albumFormUpdate=${index}`} />
      </div>
      )}
    </div>
  );
};

export default AlbumCard;
