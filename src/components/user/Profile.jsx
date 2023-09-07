import React, { useEffect } from 'react';
import { doLogin, getCurrentUser, logout } from '../../store/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('auth-token')) {
      dispatch(logout());
      navigate('/user/login');
    }
    if (localStorage.getItem('auth-token')) {
      dispatch(doLogin());
      dispatch(getCurrentUser());
    }
  }, [isLoggedIn]);

  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1">
      <div className="bg-gray-100 md:col-span-6 md:col-start-4 sm:col-span-1 sm:col-start-1 mx-2 border shadow-md flex items-center justify-center">
        <div className="bg-white w-full shadow-md rounded-md p-8">
          <div className="text-center">
            <img
              src={user.image} // Replace with your image URL
              alt="Profile"
              className="mx-auto w-36 h-36 rounded-full"
            />
            <h1 className="text-2xl font-semibold mt-4">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">About Me</h2>
            <p className="mt-2 text-gray-600">{user.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
