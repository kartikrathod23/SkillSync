import React from "react";

const Testimonials = () => {
  return (
    <section className="py-20 bg-amber-50 text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">What Users Say</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 px-6 max-w-4xl mx-auto">
        <blockquote className="bg-white p-6 rounded-md shadow-md">
          <p className="text-gray-600 italic">"An amazing platform to learn and teach!"</p>
          <footer className="mt-4 text-sm text-gray-500">— Priya, Designer</footer>
        </blockquote>
        <blockquote className="bg-white p-6 rounded-md shadow-md">
          <p className="text-gray-600 italic">"SkillLink helped me find a mentor who boosted my career."</p>
          <footer className="mt-4 text-sm text-gray-500">— Rahul, Developer</footer>
        </blockquote>
      </div>
    </section>
  );
};

export default Testimonials;
