"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [breeds, setBreeds] = useState<string[]>([]);

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

  return (
    <nav style={{ padding: "10px", background: "#333", color: "white", textAlign: "center" }}>
      <Link href="/" style={{ marginRight: "20px", color: "white", textDecoration: "none", fontWeight: "bold" }}>
        Home
      </Link>
      <Link href="/admin" style={{ marginLeft: "20px", color: "white", textDecoration: "none", fontWeight: "bold" }}>
        Admin
      </Link>

      <h3 style={{ marginTop: "10px" }}>Explore Breeds</h3>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", paddingTop: "10px" }}>
        {breeds.map((breed) => ( // ✅ Show ALL breeds now
          <Link key={breed} href={`/breed/${breed}`} passHref>
            <button
              style={{
                padding: "8px",
                borderRadius: "5px",
                background: "lightgray",
                cursor: "pointer",
                border: "none",
                fontSize: "14px",
              }}
            >
              {breed.toUpperCase()}
            </button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
