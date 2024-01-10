'use client';

import { useRouter } from 'next/navigation';
import { HiOutlineTrash } from 'react-icons/hi';
import { deleteEvent } from '@/services/client/events';

type Props = {
  id: string,
  name: string
};

const BtnDelEvent = ({ id, name }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confText = `Ar tikrai nori istrinti "${name}", eventa?`;
    if (confirm(confText) === true) {
      const res = await deleteEvent(id);
      alert(res.message);
      router.refresh();
    }
  };

  return (
    <button
      onClick={() => handleDelete()}
      type="button"
      className="text-red-600 hover:text-red-400 transition-colors duration-300 ease-in-out"
    >
      <HiOutlineTrash size={40} />
    </button>
  );
};

export default BtnDelEvent;
