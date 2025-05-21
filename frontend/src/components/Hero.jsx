import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-amber-100 via-white to-white py-24 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Connect. Learn. Exchange.
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
        SkillLink helps learners and mentors collaborate, exchange skills, and grow together — all in one place.
      </p>
      <div className="flex justify-center gap-4">

        <Link to='/signup'>
            <button className="bg-amber-500 text-white px-6 py-3 rounded-md hover:bg-amber-600 transition">
            Get Started
            </button>
        </Link>

        <Link to='/features'>
            <button className="border border-amber-500 text-amber-600 px-6 py-3 rounded-md hover:bg-amber-50 transition">
            Learn More
            </button>
        </Link>

      </div>
    </section>
  );
};

export default Hero;
