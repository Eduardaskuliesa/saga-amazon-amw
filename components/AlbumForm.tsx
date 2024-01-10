/* eslint-disable no-multi-spaces */

"use client";

import React, { useState } from "react";
import { createAlbum } from "@/services/client/albums";

const AlbumForm = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleImage = (e: any) => {
    files.forEach((file: any) => {
      if (file.size > 1028 * 1028 * 2) {
        setError("Daug sveria 2mb max");
      }
    });
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (files.length < 1) {
      setError("Turi buti bent viena photo");
      return;
    }
    setLoading(true);
    const data = new FormData();

    files.forEach((file) => {
      data.append("image[]", file);
    });
    data.set("name", name);
    data.set("date", date);

    const res = await createAlbum(data);
    if (res.message) {
      setMessage(res.message);
      setLoading(false);
      setDate("");
      setName("");
      setFiles([]);
    } else {
      setError(res.error);
      setLoading(false);
      setDate("");
      setName("");
      setFiles([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 rounded-xl bg-white text-black p-4"
    >
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
        <input
          onChange={handleImage}
          type="file"
          accept="image/jpeg, image/jpg"
          id="formupload"
          name="files"
          multiple
        />
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
          Sukurti
        </button>
      </div>
    </form>
  );
};

export default AlbumForm;
