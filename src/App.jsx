import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);


  const handleAdd = () => {
    if (todo.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: todo.trim(),
      isCompleted: false,
    };
    setTodos(prev => [...prev, newTodo]);
    setTodo("");
  }

  const handleEdit = (id) => {
    const todoEdit = todos.find((t) => t.id === id);
    if (!todoEdit) return;
    setTodo(todoEdit.text);
    handleDelete(id);
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter((t) => t.id !== id));
  };
  const handleToggleComplete = (id) => {
  setTodos(prev =>
    prev.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    )
  );
};


  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-3/4 flex flex-col bg-blue-950 text-white rounded-md m-5 p-3 space-y-4 min-h-[80vh]">

          <p className="text-center text-2xl font-bold">Your Progress</p>

          <div className="add-todo">
            <p className="mb-2 font-bold">Add a To-Do</p>
            <div className="flex gap-10">
              <input
                type="text" value={todo} onChange={(e) => setTodo(e.target.value)}
                placeholder='Add a task...'
                className="bg-white rounded-sm text-black w-[400px] border-2 border-black"
              />
              <button className="bg-blue-300 text-blue-950 py-1 px-4 rounded-md cursor-pointer font-bold" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>

          <div className="ur-todo items-center">
            <div className="font-bold">Your To-Do's</div>
            {todos.length===0 && <div className='font-'>No Todos to display</div>}
            {todos.map((item) => (
              <div key={item.id} className="trans flex items-center gap-4 transition-all duration-500 opacity-0 animate-fade-in">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggleComplete(item.id)}
                />

                <div className={`${item.isCompleted ? 'line-through' : ''}`}>
                  {item.text}
                </div>

                <div className="buttons flex gap-5 m-2">
                  <button
                    className="bg-blue-300 text-blue-950 py-1 px-4 rounded-md cursor-pointer font-bold"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-blue-300 text-blue-950 py-1 px-4 rounded-md cursor-pointer font-bold"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
}

export default App;
