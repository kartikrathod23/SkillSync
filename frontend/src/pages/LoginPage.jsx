// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate  = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log('Logging in with:', { email, password });
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json();
      console.log('data:',data);
      if (res.ok) {
        localStorage.setItem('token', data.token); // store JWT token
        // alert("Login successful");
        navigate('/dashboard');  // if using React Router
      } else {
        alert(data.message)
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white px-4">
      <Navbar />
      <div className="w-full max-w-md bg-white p-10 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-2">Welcome back to SkillBridge</h2>
        <p className="text-sm text-gray-500 mb-6">Log in to continue learning and sharing.</p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded" />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded" />
          <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600">Login</button>
        </form>
        <div className="text-center text-sm text-gray-400 mt-4">or continue with</div>
        <div className="flex justify-center mt-2 gap-4">
          <button className="border px-4 py-2 rounded hover:bg-gray-100">Google</button>
          <button className="border px-4 py-2 rounded hover:bg-gray-100">Facebook</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
