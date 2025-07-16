import React, { useState, useEffect } from 'react';
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('my-todos');
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: todo.trim(),
      isCompleted: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setTodo('');
  };

  const handleEdit = (id) => {
    const todoEdit = todos.find((t) => t.id === id);
    if (!todoEdit) return;
    setTodo(todoEdit.text);
    handleDelete(id);
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  useEffect(() => {
  const user = localStorage.getItem("task-user");
  if (!user) window.location.href = "/login"; // Simple redirect
}, []);


  const visibleTodos = showCompleted ? todos.filter(t => t.isCompleted) : todos;

  return (
    <>    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
      <div className="flex justify-center">
        <div className="w-3/4 flex flex-col bg-blue-950 text-white rounded-md m-5 p-3 space-y-4 min-h-[80vh]">

          <p className="text-center text-2xl font-bold">Your Progress</p>

          {/* Add Todo Input */}
          <div className="add-todo">
            <p className="mb-2 font-bold">Add a To-Do</p>
            <div className="flex gap-10">
              <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add a task..."
                className="bg-white rounded-sm text-black w-[400px] border-2 border-black"
              />
              <button
                className="bg-blue-300 text-blue-950 py-1 px-4 rounded-md cursor-pointer font-bold"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>

          {/* Top Bar */}
          <div className="flex justify-start items-center mt-4 gap-4">
            <div className="font-bold text-lg">Your To-Do's</div>
            <button
              className="bg-green-300 text-blue-950 py-1 px-4 rounded-md font-bold"
              onClick={() => setShowCompleted(prev => !prev)}
            >
              {showCompleted ? '🔄 Show All Tasks' : '✅ Show Completed'}
            </button>
          </div>

          {/* Task List */}
          <div className="ur-todo items-center">
            {visibleTodos.length === 0 ? (
              <p className="text-sm text-gray-400 mt-2 ml-2">No tasks to show.</p>
            ) : (
              visibleTodos.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 transition-all duration-500 animate-fade-in"
                >
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleToggleComplete(item.id)}
                  />
                  <div className={`${item.isCompleted ? 'line-through text-gray-400' : ''}`}>
                    {item.text}
                  </div>
                  <div className="buttons flex gap-5 m-2 items-center">
                    <button
                      className="bg-blue-300 text-blue-950 py-1 px-4 rounded-md cursor-pointer font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                      onClick={() => handleEdit(item.id)}
                    >
                      <MdOutlineModeEditOutline className="text-lg" />
                      Edit
                    </button>

                    <button
                      className="bg-blue-300 text-blue-950 py-1 px-4 rounded-md cursor-pointer font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete className="text-lg" />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
