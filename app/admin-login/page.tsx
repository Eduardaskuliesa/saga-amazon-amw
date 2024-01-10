'use client';

import { useState } from 'react';
import { login } from '@/services/client/auth';

const AdminLogin = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    const res = await login(password);
    setError('');
    setMessage('');
    if (res.message) {
      setMessage(res.message);
    } else if (res.error) {
      setError(res.error);
    }

    setPassword("");
    setLoading(false);

  };

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className='simple-background' />
      <p className="text-2xl mb-2 text-red-700">{error}</p>
      <p className="text-2xl mb-2 text-green-700">{message}</p>
      <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
        <input
            value={password}
            onChange={(e) => setPassword(prevState => e.target.value)}
            type="password"
            placeholder="Irašyk slaptą frazę...."
            required
            minLength={5}
            maxLength={200}
            className="ring-1 mt-2 ring-gray-300 w-full
                  rounded-md px-4 py-2 outline-none focus:ring-4 focus:ring-red-900"
          />

          <button
            type='submit'
            disabled={loading}
            className="mt-5 bg-red-400 font-semibold text-white text-2xl py-3 px-6 border disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed hover:bg-transparent hover:text-red-400 hover:border-red-400 border-transparent duration-300 rounded"
          >
            Prisijungti
          </button>
      </form>
    </main>
  );
};

export default AdminLogin;
