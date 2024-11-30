import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import Header from '../components/Layout/Header';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get(`/task/user/${user._id}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchTasks();
  }, [user._id]);

  const handleTaskUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const toggleCreateTask = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Header />
      
      <button onClick={toggleCreateTask} className='bg-orange-500 text-white p-2 rounded-lg ml-4 mt-4'> Create</button>
      {
        showForm ? (<TaskForm onTaskCreated={handleTaskUpdate} />) : false
      }
      <TaskList tasks={tasks} onTasksChange={handleTaskUpdate} />
    </div>
  );
};

export default Dashboard;
