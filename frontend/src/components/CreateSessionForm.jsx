import React from 'react';

const CreateSessionForm = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Create New Session</h2>
      <form className="space-y-3">
        <input type="text" placeholder="Session Topic" className="w-full border p-2 rounded" />
        <input type="datetime-local" className="w-full border p-2 rounded" />
        <textarea placeholder="Description" className="w-full border p-2 rounded h-24"></textarea>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Schedule</button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
