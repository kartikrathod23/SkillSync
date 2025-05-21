import React, { useState } from "react";

const SessionRequestModal = ({ isOpen, onClose, onSubmit, recipientId }) => {
    const [topic, setTopic] = useState('')
    const [scheduledAt, setScheduledAt] = useState('')
    const [note, setNote] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ topic, scheduledAt, note, recipientId });

        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Request a Session</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Session topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <textarea
                        placeholder="Write a message or note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full border p-2 rounded h-24"
                    ></textarea>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:underline">Cancel</button>
                        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Send Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SessionRequestModal;