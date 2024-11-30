/* eslint-disable react/prop-types */
import { useState } from 'react';
import apiClient from '../../api/apiClient';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', priority: 'Medium', deadline: '', user_id: JSON.parse(localStorage.getItem('user'))._id
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {
      const response = await apiClient.post('task/create', formData);
      onTaskCreated(prev => [...prev, response.data]);
      setFormData({ title: '', description: '', priority: 'Medium', deadline: '', user_id: formData.user_id });
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Task</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Priority:</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low" selected>Low</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Deadline:</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
