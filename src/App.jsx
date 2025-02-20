import { useState } from "react";
// Import Heroicons for icons
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/solid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const handleUpdate = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedTask("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col px-6 py-8">
      {/* Main Container */}
      <div className="w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800">
          To-Do List
        </h1>

        {/* Add Task Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {editingIndex === index ? (
                <>
                  {/* Edit Mode */}
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg mb-2 sm:mb-0 shadow-sm"
                  />
                  <button
                    onClick={() => handleUpdate(index)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <CheckIcon className="h-5 w-5" /> <span>Save</span>
                  </button>
                </>
              ) : (
                <>
                  {/* View Mode */}
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(index)}
                      className="rounded text-blue-500 focus:ring-blue-500 h-6 w-6"
                    />
                    <span
                      className={`${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      } text-lg`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center space-x-2 w-full sm:w-auto shadow-md hover:shadow-lg"
                    >
                      <PencilIcon className="h-5 w-5" /> <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 flex items-center space-x-2 w-full sm:w-auto shadow-md hover:shadow-lg"
                    >
                      <TrashIcon className="h-5 w-5" /> <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
