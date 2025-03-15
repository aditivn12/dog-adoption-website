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
    <div style={{ textAlign: "center" }}>
      <h1>{breed?.toString().toUpperCase()} Breed</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {image ? (
        <img src={image} alt={breed?.toString()} width="300px" style={{ borderRadius: "10px" }} />
      ) : (
        <p>Loading image...</p> 
      )}
    </div>
  );
}
