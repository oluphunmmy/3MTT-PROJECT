
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../../api/apiClient';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  // const [isCountdownActive, setIsCountdownActive] = useState(true); // Start with countdown active
  const [countdown, setCountdown] = useState(55); // Countdown timer in seconds
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isCountdownActive) {
  //     let timer = setInterval(() => {
  //       setCountdown((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);
  //           // window.location.reload(); // Reload the page when countdown ends
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer); // Clean up interval on component unmount
  //   }
  // }, [isCountdownActive]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/api/auth/login', formData);
      
      // Storing the token and user separately in localStorage
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate('/dashboard');
    } catch (error) {
      // Display the error message from the backend using react-toastify
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Start the countdown if the server might be sleeping
      // setIsCountdownActive(true);
    }
  };
  
  return (
    <div>
      <ToastContainer />
      {/* {isCountdownActive && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
          Kindly wait, the server is sleeping, try again in... {countdown} seconds
        </div>
      )} */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Login
        </button>
        <NavLink to='/'>
        <div className='w-full mt-2'>
          {"Don't Have an account? "}
          <span className='underline text-blue-600 font-semibold'>
            register here
          </span>
        </div>
      </NavLink>
      </form>
    </div>
  );
};

export default Login;
