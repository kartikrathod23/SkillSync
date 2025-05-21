import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            const [profileRes, currentRes] = await Promise.all([
                fetch(`http://localhost:5000/api/auth/users/${id}`),
                fetch('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            const profileData = await profileRes.json();
            const currentData = await currentRes.json();
            setProfile(profileData);
            setCurrentUser(currentData);
        };

        fetchData();
    }, [id]);

    const handleRequestSession = async () => {
        const token = localStorage.getItem('token');

        await fetch('http://localhost:5000/api/sessions/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                recipientId: profile._id,
                topic: 'Skill exchange session',
                scheduledAt: new Date().toISOString(), // or let user pick
            }),
        });
    };


    if (!profile || !currentUser) return <p>Loading profile...</p>;

    const isOwnProfile = profile._id === currentUser._id;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-orange-400 to-orange-600"></div>
            <div className="px-6 pb-6 -mt-12 relative">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden absolute top-[-3rem]">
                    <img src="https://i.pravatar.cc/100" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="pt-14">
                    <h2 className="text-xl font-bold text-gray-800">{profile.fullname}</h2>
                    <p className="text-sm text-gray-500">{profile.username} • {profile.email}</p>
                    <p className="mt-2 text-sm text-gray-600">{profile.bio || 'No bio added yet.'}</p>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-1">Skills Offered</h4>
                            <ul className="flex flex-wrap gap-2 text-xs text-gray-700">
                                {profile.skills?.map((skill, i) => (
                                    <li key={i} className="bg-orange-100 px-2 py-1 rounded-full">{skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-1">Looking to Learn</h4>
                            <ul className="flex flex-wrap gap-2 text-xs text-blue-700">
                                {profile.interests?.map((interest, i) => (
                                    <li key={i} className="bg-blue-100 px-2 py-1 rounded-full">{interest}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-600 mb-1">Experience</h4>
                        <p className="text-sm text-gray-500">{profile.experienceSummary || 'No experience added.'}</p>
                    </div>
                </div>
            </div>
            {!isOwnProfile && (
                <div className="mt-6">
                    <button onClick={handleRequestSession} className="bg-orange-500 text-white px-4 py-2 rounded">Request Mentorship</button>
                    <button className="ml-3 border border-orange-500 text-orange-500 px-4 py-2 rounded">Message</button>
                </div>
            )}

        </div>
    );
};

export default UserProfile;
