"use client";

import { useEffect, useState } from "react";

interface WebRadio {
  id: string;
  name: string;
  img: string;
  fluxUrl: string;
}

export default function WebRadioPage() {
  const [radios, setRadios] = useState<WebRadio[]>([]);
  const [form, setForm] = useState({ name: "", img: "", fluxUrl: "" });

  useEffect(() => {
    fetch("/api/webradios")
      .then((res) => res.json())
      .then(setRadios);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/webradios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newRadio = await res.json();
      setRadios([...radios, newRadio]); // Update state with the new radio
      setForm({ name: "", img: "", fluxUrl: "" }); // Reset form
    }
  };

  async function handleDelete(id: string) {
    const res = await fetch(`/api/webradios/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setRadios(radios.filter((radio) => radio.id !== id)); // Remove from state
    }
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>WebRadios</h1>

      {/* Form to Add a WebRadio */}
      <form onSubmit={handleSubmit} className='my-4 space-y-2'>
        <input
          type='text'
          name='name'
          placeholder='Radio Name'
          value={form.name}
          onChange={handleChange}
          className='p-2 border rounded w-full'
          required
        />
        <input
          type='text'
          name='img'
          placeholder='Image URL'
          value={form.img}
          onChange={handleChange}
          className='p-2 border rounded w-full'
          required
        />
        <input
          type='text'
          name='fluxUrl'
          placeholder='Stream URL'
          value={form.fluxUrl}
          onChange={handleChange}
          className='p-2 border rounded w-full'
          required
        />
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Add WebRadio
        </button>
      </form>

      {/* List of WebRadios */}
      <ul>
        {radios.map((radio) => (
          <li key={radio.id} className='p-2 border my-2'>
            <img src={radio.img} alt={radio.name} className='w-16 h-16' />
            <h2>{radio.name}</h2>
            <audio controls src={radio.fluxUrl}></audio>
            <button
              onClick={() => handleDelete(radio.id)}
              className='px-4 py-2 bg-red-500 text-white rounded'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
