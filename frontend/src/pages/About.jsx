import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-center">
        <Navbar/>
      <h1 className="text-4xl font-bold text-orange-600 mb-4 mt-10">About SkillSync</h1>
      <p className="text-gray-700 max-w-3xl mx-auto text-lg">
        SkillSync is a collaborative platform designed to connect learners and mentors in real-time for skill-sharing, learning, and growth. 
        Whether you're looking to teach, learn, or collaborate, SkillSync empowers individuals through meaningful mentorship and live chat, session requests, and personalized dashboards.
      </p>

      <div className="mt-10 max-w-4xl mx-auto grid md:grid-cols-2 gap-10 text-left">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-orange-500 mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To create an inclusive ecosystem where knowledge and skills can be exchanged freely, empowering individuals to grow faster through peer-to-peer mentorship.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-orange-500 mb-2">Why SkillSync?</h3>
          <p className="text-gray-600">
            We believe in the power of community-driven learning. SkillSync breaks the barriers of traditional mentorship by enabling real-time interactions, structured session requests, and visibility into shared skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
