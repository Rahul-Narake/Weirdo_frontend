import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/user/UserSlice';
export default function Login() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
    if (isLoggedIn) {
      navigate('/user/home');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user/home');
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="grid md:grid-cols-12 sm:grid-cols-1 m-4">
        <div
          className="md:col-span-4  md:col-start-5
     sm:col-span-1 sm:col-start-1  w-full flex  bg-gray-100"
        >
          <div className=" w-full p-6 bg-white rounded shadow-md ">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                Login
              </button>
            </form>
            <Link
              to={'/forgot-password'}
              className="text-blue-700 font-normal text-center "
            >
              Forgot Password ?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
