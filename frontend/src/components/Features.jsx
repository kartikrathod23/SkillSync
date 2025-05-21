import React from "react";

const features = [
  {
    title: "Mentorship Matching",
    desc: "Get matched with mentors or mentees based on skills and availability.",
  },
  {
    title: "Live Sessions",
    desc: "Schedule and host embedded video calls with Jitsi Meet integration.",
  },
  {
    title: "Skill Exchange",
    desc: "Offer your expertise in exchange for learning new skills.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="shadow-md p-6 rounded-lg border hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-amber-600 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
