import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogin, logout } from '../../store/user/UserSlice';
export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('auth-token')) {
      dispatch(logout());
      navigate('/user/login');
    } else {
      dispatch(doLogin());
    }
  }, [isLoggedIn]);
  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1">
      <div className="md:col-span-2 md:col-start-1 sm:col-span-1 sm:col-start-1 md:ml-4 sm:m-5">
        <Sidebar />
      </div>
      <div className="md:col-span-10 md:col-start-3 sm:col-span-1 sm:col-start-1 mx-2">
        <Outlet />
      </div>
    </div>
  );
}
