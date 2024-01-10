'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deletelDj } from '@/services/client/djs';

type Props = {
  djs: Dj[]
};

const DjDel = ({ djs }: Props) => {
  const [allDjs, setAllDjs] = useState<Dj[]>([]);
  const router = useRouter();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAllDjs(djs);
  }, []);

  const handeSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const selectedDj = e.target.djs.options[e.target.djs.selectedIndex];
    const _id = selectedDj.value;
    const name = selectedDj.getAttribute('data-name');
    let res;
    const confText = `Ar tikrai nori istrinti "${name}", dj?`;

    if (confirm(confText) === true) {
      res = await deletelDj(_id);
    }

    setError('');
    setMessage('');
    if (res?.message) {
      setMessage(res.message);
      setAllDjs((prevState) => prevState.filter((dj) => dj._id != e.target.djs.value));
    } else if (res?.error) {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handeSubmit}
      className="bg-white max-w-[350px] p-10 flex flex-col justify-center items-center rounded-xl shadow-lg text-gray-600"
    >
      <label htmlFor="djs" className="text-sm">
        Djs
        <select
          className="ring-1 mt-2 ring-gray-300 w-full
                        rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
          id="djs"
          name="djs"
        >
          {allDjs.length > 0
                            && allDjs.map((dj) => (
                              <option key={dj._id} value={dj._id} data-name={dj.name}>
                                {dj.name}
                              </option>
                            ))}
        </select>
      </label>

      <p className="text-base mt-2 text-red-900">{error}</p>
      <p className="text-base mt-2 text-green-900">{message}</p>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 bg-red-900 text-white disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed font-bold rounded-lg px-6 py-2 hover:bg-transparent hover:text-red-900 border border-red-900 duration-300 uppercase text-sm"
      >
        Trinti Dj
      </button>
    </form>
  );
};

export default DjDel;
