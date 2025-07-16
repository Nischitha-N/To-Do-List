// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login data:', { email, password });

    // For now, fake login success:
    localStorage.setItem("task-user", JSON.stringify({ email }));
    navigate('/');
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px] space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-900">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm">
          Don't have an account? <span onClick={() => navigate('/signup')} className="text-blue-600 cursor-pointer underline">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
