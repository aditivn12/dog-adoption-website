"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface Dog {
  id: string;
  name: string;
  breed: string;
  image_url: string;
  available: boolean;
}

export default function AdminPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchDogs() {
      const { data, error }: { data: Dog[] | null; error: Error | null } = await supabase
        .from("dogs")
        .select("*");

      if (error != null) {
        console.error("Error fetching dogs:", error.message);
        return;
      }

      if (data) setDogs(data);
    }

    fetchDogs();
  }, []);

  async function addDog(event: React.FormEvent) {
    event.preventDefault();
    if (!name || !breed || !imageUrl) return alert("All fields are required!");

    const { data, error } = await supabase
      .from("dogs")
      .insert([{ name, breed, image_url: imageUrl, available: true }])
      .select();

    if (error) {
      console.error("Error adding dog:", error.message);
    } else if (data && data.length > 0) {
      setDogs([...dogs, data[0]]);
      setName("");
      setBreed("");
      setImageUrl("");
    }
  }

  async function removeDog(id: string) {
    const { error } = await supabase.from("dogs").delete().eq("id", id);
    if (error) console.error("Error removing dog:", error.message);
    else setDogs(dogs.filter((dog) => dog.id !== id));
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F0FDF4] to-[#E0F2FE] text-[#1F2937] px-10 py-14 font-sans">
      <div className="w-full flex flex-col gap-12">

        <h1 className="text-center text-5xl font-bold tracking-tight text-[#3BA99C]">
          🐾 Dog Admin Dashboard
        </h1>

        <form
          onSubmit={addDog}
          className="w-full flex flex-col lg:flex-row gap-4 items-center justify-center bg-white border border-teal-100 rounded-xl p-6 shadow-md"
        >
          <input
            type="text"
            placeholder="Dog Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded-md border border-teal-200 bg-white text-[#1F2937] w-full lg:w-40 focus:outline-none focus:ring-2 focus:ring-teal-300"
            required
          />
          <input
            type="text"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="px-4 py-2 rounded-md border border-teal-200 bg-white text-[#1F2937] w-full lg:w-40 focus:outline-none focus:ring-2 focus:ring-teal-300"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="px-4 py-2 rounded-md border border-teal-200 bg-white text-[#1F2937] w-full lg:w-60 focus:outline-none focus:ring-2 focus:ring-teal-300"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#3BA99C] hover:bg-[#297971] text-white rounded-full font-semibold shadow transition"
          >
            Add Dog
          </button>
        </form>

        <div className="w-full overflow-x-auto rounded-xl shadow-lg bg-white border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#E6FFFA] text-[#047857] font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Breed</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((dog) => (
                <tr key={dog.id} className="border-t border-gray-100 hover:bg-teal-50 transition">
                  <td className="px-6 py-4 font-medium">{dog.name}</td>
                  <td className="px-6 py-4">{dog.breed}</td>
                  <td className="px-6 py-4">
                    <img
                      src={dog.image_url}
                      alt={dog.name}
                      className="w-20 h-20 object-cover rounded-md border border-gray-100 shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {dog.available ? (
                      <span className="text-green-600 font-medium">✅ Available</span>
                    ) : (
                      <span className="text-red-500 font-medium">❌ Adopted</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeDog(dog.id)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {dogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">
                    No dogs listed yet. Start adding new furry friends! 🐶
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
