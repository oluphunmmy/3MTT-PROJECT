/* eslint-disable react/prop-types */
import { useState } from 'react';
import apiClient from '../../api/apiClient';

const TaskItem = ({ task, onTasksChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);

  const handleCheckboxChange = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await apiClient.put(`/task/update/${task.id}`, updatedTask);
      onTasksChange((prev) => prev.map(t => t.id === task.id ? updatedTask : t));
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put(`/task/update/${task._id}`, editData);
      onTasksChange((prev) => prev.map(t => t._id === task._id ? response.data : t));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.delete(`/task/delete/${task._id}`);
        onTasksChange((prev) => prev.filter(t => t._id !== task._id));
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  };

  return (
    <div className={`mb-4 p-4 border ${task.completed ? 'bg-gray-100 text-gray-400 line-through' : 'bg-white'} rounded-lg shadow-md`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Description:</label>
            <input
              type="text"
              name="description"
              value={editData.description}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={editData.deadline.split('T')[0]}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Priority:</label>
            <select
              name="priority"
              value={editData.priority}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Save
          </button>
        </form>
      ) : (
        <>
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          <p>Priority: {task.priority}</p>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <button
            onClick={() => setIsEditing(true)}
            className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded transition-colors"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
