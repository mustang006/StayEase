import React from "react";

const MyBookingsPage = () => {
  return (
    <>
      {/* Head section would go in index.html or you can use react-helmet */}
      
      {/* Navbar: convert '../partials/nav' to a React <Navbar /> component */}
      <nav className="bg-white shadow-md py-4 px-8 fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-500">Airbnb</h1>
          {/* Add navigation links here */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto mt-32 text-center">
        <h2 className="text-6xl font-bold text-red-500 mb-4">My Bookings</h2>
        <p className="text-2xl text-gray-700 mb-8">Bookings will appear here</p>
      </main>
    </>
  );
};

export default MyBookingsPage;
