import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from '../../store/user/Store';

export default function Layout() {
  return (
    <>
      <Provider store={store}>
        <div className="fixed top-0 w-full z-30">
          <Navbar />
          <Toaster />
        </div>
        <div className="absolute top-20 w-full ">
          <Outlet />
        </div>
      </Provider>
    </>
  );
}
