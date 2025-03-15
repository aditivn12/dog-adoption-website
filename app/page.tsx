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
    <div>
      <h1>Welcome to the Dog Adoption Center</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {dogImage && <img src={dogImage} alt="Random Dog" />}
    </div>
  );
}
