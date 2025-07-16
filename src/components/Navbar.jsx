import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('task-user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('task-user');
    window.location.href = "/login";
  };

  const [dark, setDark] = useState(false);


  // Theme toggle effect
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    document.body.classList.toggle("light", !dark);
  }, [dark]);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("task-user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);



  return (
    <div className="container mx-auto p-4 flex justify-between items-center bg-blue-300 text-blue-950">
      <div className="text-xl font-bold hover:text-blue-600 transition-all duration-300">
        TaskMate
      </div>

      <ul className="flex gap-6 items-center">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        
        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-semibold">{user.email}</span>
            <button onClick={handleLogout} className="text-red-600 font-bold hover:underline">Logout</button>
          </div>
        ) : (
          <>
            <li onClick={() => window.location.href = '/login'} className='cursor-pointer'>Login</li>
            <li onClick={() => window.location.href = '/signup'} className='cursor-pointer'>Signup</li>
          </>
        )}


        <button
          onClick={() => setDark(prev => !prev)}
          className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100"
        >
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
