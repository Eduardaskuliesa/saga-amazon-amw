'use client';

import { useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { createDj } from '@/services/client/djs';

const DjForm = () => {
  const [social, setSocial] = useState({
    platform: '',
    url: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    socials: [social],
  });

  const [image, setImage] = useState<string | ArrayBuffer | null>('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      socials: [],

    }));
    setSocial({ ...social, platform: 'Facebook' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSocial({ ...social, [e.target.name]: e.target.value });
  };

  const handleSocialUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocial({ ...social, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e:any) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const addSocial = () => {
    if (social.url !== '') {
      setFormData((prevData) => ({
        ...prevData,
        socials: [...prevData.socials, social],
      }));
      setSocial({
        ...social,
        url: '',
      });
    }
  };

  const removeSocial = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      socials: formData.socials.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formToSend = {
      name: formData.name,
      image,
      socials: formData.socials,
    };
    const res = await createDj(formToSend);

    setError('');
    setMessage('');
    if (res.message) {
      setMessage(res.message);
      setFormData({
        name: '',
        socials: [],
      });
      setImage('');
    } else if (res.error) {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white max-w-[400px] flex flex-col justify-center items-center rounded-xl shadow-lg p-10 text-gray-600">
      <label htmlFor="name" className="text-sm">
        *Vardas/Nickname.
        <input
          value={formData.name}
          onChange={handleChange}
          id="name"
          name="name"
          type="text"
          placeholder="Nickname..."
                    // required
          className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
        />
      </label>

      <label htmlFor="image" className="text-sm">
        *Foto/Img
        <input
          onChange={handleImageChange}
          id="image"
          name="image"
          type="file"
          accept="image/jpg"
          required
          className="ring-1 mt-2 ring-gray-300 w-full
                rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
        />
      </label>

      <div>
        <label htmlFor="socials" className="text-sm">
          Socials
          <select
            className="ring-1 mt-2 ring-gray-300 w-full
                    rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
            id="socials"
            name="platform"
            onChange={handleSocialChange}
          >
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Soundcloud">Soundcloud</option>
            <option value="Spotify">Spotify</option>
            <option value="Youtube">Youtube</option>
          </select>
        </label>

        <label htmlFor="socialUrl" className="text-sm">
          Social url
          <input
            value={social.url}
            onChange={handleSocialUrlChange}
            id="socialUrl"
            name="url"
            type="text"
            placeholder="Social url..."
            className="ring-1 mt-2 ring-gray-300 w-full
                        rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
          />
        </label>
        <button
          type="button"
          className="mt-2 bg-red-900 text-white font-bold rounded-lg px-3 py-1 hover:bg-transparent hover:text-red-900 border border-red-900 duration-300 text-sm"
          onClick={addSocial}
        >
          Add
        </button>
      </div>
      {formData.socials.length > 0
            && (
            <div className="mt-2 mb-3">
              <p>Dj socials:</p>

              {formData.socials
                .filter((social) => social.url !== '')
                .map((social, i) => (
                  <div key={social.url} className="flex">
                    <p>{social.platform}</p>
                    <button type="button" onClick={() => removeSocial(i)}><GrFormClose size={17} /></button>
                  </div>
                ))}

            </div>
            )}
      <p className="text-base mt-2 text-red-900">{error}</p>
      <p className="text-base mt-2 text-green-900">{message}</p>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 bg-red-900 disabled:bg-gray-300 disabled:text-black text-white font-bold rounded-lg px-6 py-2 hover:bg-transparent hover:text-red-900 border border-red-900 duration-300 uppercase text-sm"
      >
        Kurti Dj
      </button>

    </form>
  );
};

export default DjForm;
