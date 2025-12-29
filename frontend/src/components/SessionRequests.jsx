import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function SessionRequests({onAccept}) {

    const [requests, setRequests] = useState([])

    useEffect(() => {
        const fetchRequets = async () => {
            const token = localStorage.getItem('token')
            const res = await fetch(`${API_BASE}/api/sessions/received`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            const data = await res.json();
            setRequests(data);
        }
        fetchRequets();
    }, []);

    const handleAction = async (id, status) => {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_BASE}/api/sessions/${id}/respond`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        const data = await res.json();
        if(status=='accepted'){
            onAccept(data.session);
        }
        
        setRequests(prev => prev.filter(r => r._id !== id));
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 h-[50]">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 -mt-6">Incoming Session Requests</h2>
            {requests.length === 0 ? (
                <p className="text-sm text-gray-500">No session requests received yet.</p>
            ) : (
                <ul className="space-y-4">
                    {Array.isArray(requests) && requests.map((r) => (
                        <li key={r._id} className="border p-4 rounded-lg">
                            <p><span className="font-semibold">From:</span> <span className='text-gray-600'>{r.requester.fullname}</span></p>
                            <p><span className="font-semibold">Topic:</span> <span className='text-gray-600'>{r.topic}</span></p>
                            <p><span className="font-semibold">When:</span> <span className='text-gray-600'>{new Date(r.scheduledAt).toLocaleString()}</span> </p>
                            <p><span className="font-semibold">Note:</span> <span className='text-gray-600'>{r.note}</span></p>
                            <div className="mt-3 flex gap-3">
                                <button onClick={() => handleAction(r._id, 'accepted')} className="px-3 py-1 bg-green-500 text-white rounded">Accept</button>
                                <button onClick={() => handleAction(r._id, 'rejected')} className="px-3 py-1 bg-red-500 text-white rounded">Decline</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SessionRequests
