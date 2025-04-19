"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        setBreeds(Object.keys(data.message));
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    }

    fetchBreeds();
  }, []);

  const handleBreedSelect = (breed: string) => {
    router.push(`/breed/${breed}`);
    setIsOpen(false); // close dropdown
  };

  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold hover:text-yellow-300 transition duration-200">
          🐶 Dog Center
        </Link>
        <Link href="/admin" className="hover:text-yellow-300 font-medium transition duration-200">
          Admin
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-black px-4 py-2 rounded-md font-semibold shadow hover:bg-yellow-100 transition"
        >
          Explore Breeds ⬇️
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-60 max-h-80 overflow-y-auto bg-white text-black rounded-lg shadow-lg z-50">
            {breeds.map((breed) => (
              <button
                key={breed}
                onClick={() => handleBreedSelect(breed)}
                className="block w-full text-left px-4 py-2 hover:bg-yellow-100 transition"
              >
                {breed.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
