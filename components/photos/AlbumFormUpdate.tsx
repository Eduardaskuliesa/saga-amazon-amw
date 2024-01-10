/* eslint-disable no-multi-spaces */

'use client';

import React, { useState } from 'react';
import { updateAlbum } from '@/services/client/albums';

type Props = {
  album: Album
};

const AlbumFormUpdate = (album: Props) => {
  const [name, setName] = useState(album.album.name);
  const [date, setDate] = useState(album.album.date);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImage = (e:any) => {
    const files = Array.from(e.target.files);
    files.forEach((file: any) => {
      if (file.size > 1028 * 1028 * 2) {
        setError('Daug sveria 2mb max');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldFiles: [string | ArrayBuffer | null]) => ([...oldFiles, reader.result]));
      };
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDate: NewAlbum = { name, date, images };
    if (images.length < 1) {
      setError('Turi buti bent viena photo');
      return;
    }
    setLoading(true);
    const res = await updateAlbum(formDate, album.album._id);
    setMessage('');
    if (res.message) {
      setMessage(res.message);
      setLoading(false);
      setDate('');
      setName('');
      setImages([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 rounded-xl bg-white text-black p-4">
      <label htmlFor="name">
        Pavadinimas
        <input
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          type="text"
          placeholder="Pavadinimas"
          className="ring-1 mt-2 ring-gray-400 w-full
     rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-300"
        />
      </label>
      <label htmlFor="date">
        Data
        <input
          onChange={(e) => setDate(e.target.value)}
          value={date}
          required
          name="date"
          type="date"
          placeholder="Data"
          className="ring-1 mt-2 ring-gray-400 w-full
     rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-300"
        />
      </label>
      <label htmlFor="form4Example2">
        Image
        <input onChange={handleImage} type="file" accept="image/jpeg, image/jpg" id="formupload" name="files" multiple />
      </label>
      <div>
        <p className="text-base mt-2 text-green-900">{message}</p>
        <p className="text-base mt-2 text-red-900">{error}</p>
        <button
          disabled={loading}
          type="submit"
          className="m-6 bg-red-900 text-white disabled:bg-gray-300 disabled:text-black font-bold
           rounded-lg px-6 py-2 hover:bg-transparent hover:text-red-900 border border-red-900 duration-300
           uppercase text-sm"
        >
          Atnaujinti
        </button>
      </div>

    </form>
  );
};

export default AlbumFormUpdate;
