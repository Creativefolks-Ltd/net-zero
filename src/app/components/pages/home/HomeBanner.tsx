import React from "react";

export default function HomeBanner() {
  return (
    <header className="h-screen bg-black">
      <div className="container h-full flex items-center">
        <div className="w-1/2">
          <h1 className="text-7xl mb-12 font-bold text-white">The Anthos Net Zero project</h1>
          <h2 className="text-3xl font-bold text-white">Created to provide an ongoing service to help all family members</h2>
        </div>
      </div>
    </header>
  );
}
