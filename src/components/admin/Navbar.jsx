import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/admin/UserSlice';
import { doLogin } from '../../store/admin/UserSlice';
export default function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const handlelogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('auth-token');
    dispatch(logout());
  };

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(doLogin());
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center bg-white shadow-md p-3">
      <div className="flex flex-wrap justify-start items-center text-pink-500 font-md space-x-4">
        <Link to={'/admin/home'} className="text-2xl font-bold">
          Weirdo
        </Link>
        {!isLoggedIn && (
          <Link to={'/'} className="text-md font-normal text-gray-500">
            Home
          </Link>
        )}
      </div>

      {!isLoggedIn ? (
        <div className="flex flex-wrap justify-start items-center text-black font-md space-x-4">
          <Link
            to={'/admin/login'}
            className="bg-pink-500 border p-2 rounded-xl text-white"
          >
            Login
          </Link>
          <Link
            to={'/admin/signup'}
            className="bg-blue-500 border p-2 rounded-xl text-white"
          >
            Signup
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start items-center text-black font-md space-x-4">
          <Link
            to={'/admin/signup'}
            className="bg-blue-500 border p-2 rounded-xl text-white"
            onClick={handlelogout}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}
