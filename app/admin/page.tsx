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
      const { data, error } = await supabase.from("dogs").select("*");
      if (error) console.error("Error fetching dogs:", error);
      else setDogs(data as Dog[]);
    }
    fetchDogs();
  }, []);


  async function addDog(event: React.FormEvent) {
    event.preventDefault();
    if (!name || !breed || !imageUrl) return alert("All fields are required!");
  
    const { data, error } = await supabase.from("dogs").insert([
      { name, breed, image_url: imageUrl, available: true },
    ]).select(); 
  
    if (error) {
      console.error("Error adding dog:", error);
    } else if (data && data.length > 0) { 
      setDogs([...dogs, data[0]]);
      setName("");
      setBreed("");
      setImageUrl("");
    } else {
      console.error("Error: Data returned is null");
    }
  }

  async function removeDog(id: string) {
    const { error } = await supabase.from("dogs").delete().eq("id", id);
    if (error) console.error("Error removing dog:", error);
    else setDogs(dogs.filter((dog) => dog.id !== id));
  }

  return (
    <div>
      <h1>Admin Panel - Dog Adoption List</h1>

      <form onSubmit={addDog} style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="Dog Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <button type="submit">Add Dog</button>
      </form>


      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>Image</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr key={dog.id}>
              <td>{dog.name}</td>
              <td>{dog.breed}</td>
              <td><img src={dog.image_url} width="100px" /></td>
              <td>{dog.available ? "✅ Available" : "❌ Adopted"}</td>
              <td>
                <button onClick={() => removeDog(dog.id)}>❌ Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
