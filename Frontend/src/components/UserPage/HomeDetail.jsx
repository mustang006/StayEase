import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HomeDetails = () => {
  const { id } = useParams(); // 🆔 Get home ID from URL
  const [home, setHome] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/homes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHome(data.home); // your backend should return { home: { ... } }
      })
      .catch((err) => console.error("Error fetching home details:", err));
  }, [id]);

  if (!home) {
    return <p className="text-center mt-10 text-xl">Loading home details...</p>;
  }

  return (
    <main className="container mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 max-w-6xl">
      <h2 className="text-3xl text-red-500 font-bold text-center mb-6">
        Details of {home.houseName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden">
          <img
            src={home.photoUrl}
            alt={home.houseName}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{home.description}</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600">{home.location}</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">Price</h3>
            <p className="text-green-600 text-xl font-bold">₹{home.price} / night</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-2xl font-semibold mb-2">Rating</h3>
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="ml-2 text-lg">{home.rating} / 5</span>
            </div>
          </div>

          <div className="mt-2">
            {/* Replace with your FavouriteButton component if you have one */}
            <button className="bg-red-300 px-4 py-2 rounded hover:bg-red-400">
              ♥ Add to Favourites
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeDetails;
