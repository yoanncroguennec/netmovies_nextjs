"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./auth.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/pages/login");
    } else {
      const data = await res.json();
      alert(data.error || "Erreur lors de la création du compte");
    }
  };

  return (
    <div className='auth-container'>
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Nom'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Créer le compte</button>
      </form>
      <p>
        Déjà inscrit ? <a href='/login'>Se connecter</a>
      </p>
    </div>
  );
}
