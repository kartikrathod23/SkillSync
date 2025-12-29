import React from 'react';
import Navbar from '../components/Navbar';

const features = [
  {
    title: 'Real-Time Chat & Video Call',
    description: 'Communicate instantly with mentors or learners via our integrated chat and video system.',
    icon: '💬',
  },
  {
    title: 'Session Request System',
    description: 'Easily request and schedule mentorship or learning sessions with your peers.',
    icon: '📅',
  },
  {
    title: 'Personalized Dashboard',
    description: 'View upcoming sessions, track completed ones, and manage your stats in one place.',
    icon: '📊',
  },
  {
    title: 'Skill & Interest Matching',
    description: 'Smart algorithm to suggest profiles based on what you can offer and what you want to learn.',
    icon: '🔍',
  },
  {
    title: 'Profile Showcases',
    description: 'Each user has a public profile highlighting their expertise, experience, and learning interests.',
    icon: '👤',
  },
  {
    title: 'Secure Authentication',
    description: 'Robust authentication system ensures your data and sessions remain secure.',
    icon: '🔒',
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-center">
        <Navbar/>
      <h1 className="text-4xl font-bold text-orange-600 mb-6 mt-10">SkillSync Features</h1>
      <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-12">
        Explore the powerful features that make SkillSync the ultimate platform for peer learning and mentorship.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
