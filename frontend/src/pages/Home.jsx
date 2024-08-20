import React from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";

const Home = () => {
  return (
    <div>
      <h1 className="bg-zinc-900 text-white px-10 py-8">
        <Hero />
        <RecentlyAdded />
      </h1>
    </div>
  );
};

export default Home;
