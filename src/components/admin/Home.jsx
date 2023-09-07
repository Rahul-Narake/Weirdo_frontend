import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/admin/UserSlice';
import { getCategories } from '../../store/admin/CategorySlice';
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!localStorage.getItem('auth-token') && !isLoggedIn) {
      dispatch(logout());
      navigate('/admin/login');
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('auth-token') && !isLoggedIn) {
      dispatch(logout());
      navigate('/admin/login');
    } else {
      if (localStorage.getItem('auth-token') && isLoggedIn) {
        dispatch(getCategories());
      }
      navigate('/admin/home');
    }
  }, [isLoggedIn]);

  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1 md:p-4 sm:p-4">
      <div className="md:col-span-2 md:col-start-1 sm:col-span-1 sm:col-start-1 mx-2">
        <Sidebar />
      </div>
      <div className="md:col-span-10 md:col-start-3 sm:col-span-1 sm:col-start-1 sm:mt-5 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
}
