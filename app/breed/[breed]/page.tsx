"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BreedPage() {
  const { breed } = useParams();
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBreedImage() {
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        if (!response.ok) throw new Error("Failed to fetch breed image");

        const data = await response.json();
        setImage(data.message);
      } catch (err) {
        console.error("Error fetching breed image:", err);
        setError("Could not load breed image.");
      }
    }

    if (breed) fetchBreedImage();
  }, [breed]);

  return (
    <div className="relative min-h-screen bg-[#0E0E10] text-white flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute top-0 left-[-5rem] w-[30rem] h-[30rem] bg-pink-500/10 blur-[120px] rounded-full opacity-30 -z-10" />
      <div className="absolute bottom-[-10rem] right-[-5rem] w-[40rem] h-[40rem] bg-purple-600/20 blur-[140px] rounded-full opacity-25 -z-10" />

      <div className="max-w-2xl text-center space-y-10 z-10">
        <h1 className="text-4xl md:text-5xl font-serif font-light leading-snug">
          Meet the <br />
          <span className="font-bold italic text-white tracking-tight text-6xl">
            {breed?.toString().toUpperCase()}
          </span>{" "}
          breed
        </h1>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {image ? (
          <div className="mx-auto max-w-sm overflow-hidden rounded-3xl shadow-2xl border border-white/10 backdrop-blur-md hover:scale-105 transition duration-500">
            <img src={image} alt={breed?.toString()} className="w-full object-cover" />
          </div>
        ) : (
          <p className="text-zinc-400">Loading image...</p>
        )}
      </div>
    </div>
  );
}
