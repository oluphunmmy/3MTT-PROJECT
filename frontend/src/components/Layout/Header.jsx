import { useNavigate } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); // Redirects to the login page
  };

  return (
    <header className="p-4 bg-gray-100 shadow-md rounded-b-lg flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">
        Welcome, {user?.username || 'User'}
      </h1>
      <button
        onClick={handleLogout}
        className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-1 px-4 rounded transition-colors"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
