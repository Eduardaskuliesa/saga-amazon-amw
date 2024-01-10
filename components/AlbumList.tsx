'use client';

/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { dateToDisplayAlbum } from '@/utils/stringFormaters';
import BtnDelAlbum from './buttons/BtnDelAlbum';
import NavLink from './navbar/NavLink';
import { placeholder } from '@/public/placeholder';
import BtnEdit from './buttons/BtnEdit';
import PopUp from './PopUp';
import AlbumFormUpdate from './photos/AlbumFormUpdate';
import Album from '@/models/Album';
import AlbumCard from './photos/AlbumCard';

type Props = {
  albums: Album[]
  isLoggedIn: boolean
};

const AlbumList = ({ albums, isLoggedIn }: Props) => {
  const searchParams = useSearchParams();
  const showUpdateAlbum = searchParams.get('albumFormUpdate');

  return (
    <div className="mt-8 grid grid-cols-1 w-[80%] lg:grid-cols-2 m-auto justify-items-center relative mb-16">
      {albums.map((album, i) => (
        <AlbumCard album={album} index={i} isLoggedIn={isLoggedIn} />
      ))}
      {showUpdateAlbum
          && (
            <PopUp closeLink="/photos">
              <AlbumFormUpdate album={albums[Number(showUpdateAlbum)]} />
            </PopUp>
          )}
    </div>
  );
};
export default AlbumList;
