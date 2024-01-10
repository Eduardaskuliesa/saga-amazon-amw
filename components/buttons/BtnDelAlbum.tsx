/* eslint-disable no-underscore-dangle */

'use client';

import { useRouter } from 'next/navigation';
import { HiOutlineTrash } from 'react-icons/hi';
import { deleteAlbum } from '@/services/client/albums';

type Props = {
  album: Album
};

const BtnDelAlbum = ({ album }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confText = `Ar tikrai nori istrinti "${album.name}", albuma?`;
    if (confirm(confText) === true) {
      const res = await deleteAlbum(album._id);
      alert(res.message);
      router.refresh();
    }
  };

  return (
    <button
      onClick={() => handleDelete()}
      type="button"
      className="text-red-600 hover:text-red-400 transition-colors
     duration-300 ease-in-out absolute bottom-1 right-0"
    >
      <HiOutlineTrash size={44} />
    </button>
  );
};

export default BtnDelAlbum;
