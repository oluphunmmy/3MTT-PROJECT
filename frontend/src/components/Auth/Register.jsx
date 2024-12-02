import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import apiClient from "../../api/apiClient";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [countdown, setCountdown] = useState(60); // Countdown timer in seconds
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isCountdownActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.reload(); // Reload the page when countdown ends
          }
          return prev - 1;
        });
      }, 5000);
    }
    return () => clearInterval(timer); // Clean up interval on component unmount
  }, [isCountdownActive]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await apiClient.post("/api/auth/register", formData);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      setErrors({ general: "Registration failed. Please try again." });

      // Start the countdown if the server might be sleeping
      setIsCountdownActive(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
     {isCountdownActive && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
          Kindly wait, the server is sleeping, try again in... {countdown} seconds, kindly continue after first countdown is reached
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-lg border border-gray-300"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
        {errors.general && (
          <p className="text-red-500 text-sm mb-2">{errors.general}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-woody-300"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-woody-300"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-woody-300"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            First Name:
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-woody-300"
            required
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Last Name:
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-woody-300"
            required
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-woody-300"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Register
        </button>
        <NavLink to="/login">
          <div className="w-full mt-2">
            Have an account?{" "}
            <span className="underline text-blue-600 font-semibold">
              login here
            </span>
          </div>
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
