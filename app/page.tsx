"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDogImage() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setDogImage(data.message);
      } catch (err) {
        console.error("Error fetching image:", err);
        setError("Failed to load dog image. Please try again.");
      }
    }

    fetchDogImage();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0E0E10] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-zinc-900/30 to-black" />
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] rounded-full bg-purple-900/20 blur-[120px] opacity-40 -z-10" />
      <div className="absolute bottom-[-10rem] right-[-5rem] w-[30rem] h-[30rem] rounded-full bg-indigo-800/20 blur-[120px] opacity-30 -z-10" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 gap-8 max-w-3xl mx-auto">
        <h1 className="text-5xl font-serif font-light leading-tight tracking-tight">
          Discover a new <br />
          <span className="text-white font-extrabold italic tracking-wide text-[3.2rem]">
            best friend
          </span>
        </h1>
        <p className="text-zinc-400 text-md">
          Every visit reveals a unique companion looking for a forever home.
        </p>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {dogImage && (
          <div className="mt-10 w-full max-w-sm rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:scale-105 transition-transform duration-500">
            <img
              src={dogImage}
              alt="Random Dog"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
