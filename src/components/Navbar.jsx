import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem("task-user");
    setUser(null);
    // Optional: redirect to login page
  };

  return (
    <div className="container mx-auto p-4 flex justify-between items-center bg-blue-300 text-blue-950">
      <div className="text-xl font-bold hover:text-blue-600 transition-all duration-300">
        TaskMate
      </div>

      <ul className="flex gap-6 items-center">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>

        {user ? (
          <>
            <li className="font-semibold">👋 {user.name}</li>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <li className="cursor-pointer hover:font-bold transition-all">Login</li>
            <li className="cursor-pointer hover:font-bold transition-all">Signup</li>
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
