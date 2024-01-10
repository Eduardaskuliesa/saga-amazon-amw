'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { logOut } from '@/services/client/auth';

const BtnLogOut = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    setLoading(true);
    const res = await logOut();
    if (res.message) {
      setLoading(false);
      router.refresh();
    } else if (res.error) {
      setLoading(false);
      alert(res.message);
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => handleLogOut()}
      className="z-[50] text-red-600 hover:text-red-900 mx-5 disabled:text-gray-600 disabled:cursor-not-allowed mr-5"
    >
      <AiOutlineLogout size={50} />
    </button>
  );
};

export default BtnLogOut;
