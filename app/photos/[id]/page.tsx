/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React from 'react';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import { getAlbum } from '@/services/server/album';
import ImageList from '@/components/photos/ImageList';

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const album: Album = await getAlbum(params.id);

  return {
    title: `${album.name} | Albumas`,
    description: 'Geriausi eventai pajūryje!',
  };
}

type Props = {
  params: {
    id: string
  },
};

const Gallery = async ({ params }: Props) => {
  const album: Album = await getAlbum(params.id);
  const isLoggedIn = cookies().get('saga-sessionToken');

  return (
    <main className="min-h-[100vh] p-4">
      <div className="simple-background" />
      {album
        && (
        <ImageList album={album} isLoggedIn={!!isLoggedIn} />
        )}
    </main>

  );
};

export default Gallery;
