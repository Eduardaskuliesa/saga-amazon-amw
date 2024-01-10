'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { GiCheckMark } from 'react-icons/gi';
import { conntactForm } from '@/services/client/contactForm';

const ConactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const sendEmail = async (e:React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const res = await conntactForm({
      message,
      email,
      name,
    });
    if (res.message) {
      setLoading(false);
      setSent(true);
    } else if (res.error) {
      setLoading(false);
      setError(res.error);
    }
  };

  return (
    <>
      { !sent
        ? (
          <form
            className="flex flex-col space-y-4"
            onSubmit={sendEmail}
          >
            <label htmlFor="name" className="text-sm">
              Vardas
              <input
                maxLength={50}
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                required
                type="text"
                placeholder="Vardas..."
                className="ring-1 appearance-none mt-2 ring-gray-300 w-full
                        rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-300"
              />
            </label>
            <label htmlFor="mail" className="text-sm">
              El.paštas
              <input
                maxLength={50}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="mail"
                required
                type="text"
                placeholder="El.paštas..."
                className="ring-1 appearance-none mt-2 ring-gray-300 w-full
                        rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-300"
              />
            </label>
            <label htmlFor="message" className="text-sm">
              Žinutė
              <textarea
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                placeholder="Žinutė..."
                required
                rows={5}
                className="ring-1 appearance-none mt-2 ring-gray-300 w-full
                        rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-300 resize-none"
              />
            </label>
            <p className="text-red-700 text-lg">{error}</p>
            <button
              type="submit"
              disabled={loading}
              className="inline-block
                    self-end bg-red-900 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm hover:bg-red-700 active:bg-red-600 duration-300 disabled:bg-gray-700 disabled:text-gray-300"
            >
              Siusti
            </button>
            <div />
          </form>
        )
        : (
          <div className="flex flex-col justify-start items-center">
            <div className="text-red-400 text-[13rem] mb-10">
              <GiCheckMark />
            </div>
            <h3 className="text-2xl font-bold text-center">Žinutė isiustą!</h3>
          </div>
        )}
    </>
  );
};

export default ConactForm;
