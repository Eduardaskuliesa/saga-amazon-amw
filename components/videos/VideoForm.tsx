'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addYtVideo } from '@/services/client/ytVideo';

const VideoForm = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formToSend = {
      name: e.target.name.value,
      date: e.target.date.value,
      youtubeId: e.target.youtubeId.value,
    };

    const res = await addYtVideo(formToSend);

    setError('');
    setMessage('');
    if (res.message) {
      setLoading(false);
      setMessage(res.message);
      e.target.reset();
      router.refresh();
    } else if (res.error) {
      setLoading(false);
      setError(res.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-[400px] flex flex-col justify-center items-center rounded-xl shadow-lg p-8 text-gray-600"
    >
      <label htmlFor="name" className="text-sm">
        *Pavadinimas:
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Pavadinimas..."
          required
          className="ring-1 mt-2 ring-gray-300 w-full
                rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
        />
      </label>

      <label htmlFor="date" className="text-sm">
        *Data:
        <input
          type="date"
          id="date"
          name="date"
          required
          className="ring-1 mt-2 ring-gray-300 w-full
                rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
        />
      </label>

      <label htmlFor="youtubeId" className="text-sm">
        *Youtube video id:
        <input
          id="youtubeId"
          name="youtubeId"
          type="text"
          placeholder="Youtube video id..."
          required
          className="ring-1 mt-2 ring-gray-300 w-full
                rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
        />
      </label>

      <p className="text-base mt-2 text-red-900">{error}</p>
      <p className="text-base mt-2 text-green-900">{message}</p>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 bg-red-900 text-white disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed font-bold rounded-lg px-6 py-2 hover:bg-transparent hover:text-red-900 border border-red-900 duration-300 uppercase text-sm"
      >
        Prideti Video
      </button>
    </form>
  );
};

export default VideoForm;
