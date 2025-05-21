import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


// const profiles = [
//   {
//     name: 'Aryan Sharma',
//     bio: 'UI/UX designer passionate about accessibility and clean interfaces.',
//     skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
//     interests: ['React', 'Frontend Architecture'],
//     rating: 4.8,
//   },
//   {
//     name: 'Sneha Kapoor',
//     bio: 'Backend engineer who loves working on databases and scaling APIs.',
//     skills: ['Node.js', 'MongoDB', 'Express.js'],
//     interests: ['DevOps', 'GraphQL'],
//     rating: 4.7,
//   },
//   {
//     name: 'Rahul Verma',
//     bio: 'Full stack developer with a passion for teaching JavaScript.',
//     skills: ['React', 'JavaScript', 'Firebase'],
//     interests: ['UI Testing', 'Next.js'],
//     rating: 4.9,
//   },
// ];

const ProfileShowcase = () => {

  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/api/match/learnonly', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setMatches(data);
      console.log(data)
    };

    fetchMatches();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Profiles Matching Your Learning Interests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((profile, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg">
            <div className="flex flex-col justify-between  mb-2">
              <h3 className="text-orange-600 text-md font-bold">{profile.fullname}</h3>
              <p className="bg-orange-100 px-2 py-1 rounded-full inline-block">{profile.experienceLevel}</p>
              <p className="text-sm text-gray-600 mb-2">{profile.experienceSummary}</p>
              <span className="text-sm text-yellow-500 font-medium">⭐ {profile.rating}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{profile.bio}</p>
            <p className="text-xs font-semibold text-gray-500">Skills Offered:</p>
            <ul className="flex flex-wrap gap-2 text-xs text-gray-700 mb-2">
              {profile.skills.map((skill, i) => (
                <li key={i} className="bg-orange-100 px-2 py-1 rounded-full">{skill}</li>
              ))}
            </ul>
            <p className="text-xs font-semibold text-gray-500">Interested in:</p>
            <ul className="flex flex-wrap gap-2 text-xs text-blue-700">
              {profile.interests.map((interest, i) => (
                <li key={i} className="bg-blue-100 px-2 py-1 rounded-full">{interest}</li>
              ))}
            </ul>
            <button
              className="mt-2 text-sm text-blue-600 hover:underline"
              onClick={() => navigate(`/profile/${profile._id}`)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
      <button className='ml-auto block mt-2 p-2 rounded-2xl text-orange-600 font-bold'>View More →</button>
    </div>
  );
};

export default ProfileShowcase;
