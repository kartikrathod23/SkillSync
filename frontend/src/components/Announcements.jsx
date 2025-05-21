import React from 'react';

const Announcements = () => {
  const posts = [
    { title: 'New Matching Algorithm Released!', date: 'May 20, 2025' },
    { title: 'Join our Discord Community', date: 'May 15, 2025' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Announcements</h2>
      <ul className="space-y-2">
        {posts.map((post, i) => (
          <li key={i} className="border p-3 rounded hover:bg-gray-50">
            <h3 className="text-orange-600 font-bold">{post.title}</h3>
            <p className="text-sm text-gray-500">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
