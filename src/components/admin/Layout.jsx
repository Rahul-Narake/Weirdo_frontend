import React from 'react';
import store from '../../store/admin/Store';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  return (
    <>
      <Provider store={store}>
        <div className="fixed top-0 w-full z-50">
          <Navbar />
          <Toaster />
        </div>
        <div className="absolute top-20 w-full">
          <Outlet />
        </div>
      </Provider>
    </>
  );
}
