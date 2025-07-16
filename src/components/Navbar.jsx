import React, { useState, useEffect } from 'react';

const Navbar = () => {
  // 1. Create dark mode state
  const [dark, setDark] = useState(false);

  // 2. Apply dark/light class to <body> on state change
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="container mx-auto p-4 flex justify-between items-center bg-blue-300 text-blue-950">
      <div className="text-xl font-bold hover:text-blue-600 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300">
        TaskMate
      </div>

      <ul className="flex gap-6 items-center">
        <li className='cursor-pointer hover:font-bold transition-all'>All Tasks</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Completed</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Pending</li>
        <li className='cursor-pointer hover:font-bold transition-all'>User</li>
        <button
          onClick={() => setDark(prev => !prev)}
          className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100"
        >
          {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
