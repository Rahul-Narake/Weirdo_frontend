import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function ChangePassword() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Both password should be same');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/change-password/change`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        toast.success(result.message);
        navigate('/user/login');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1 mt-10">
      <div className="md:col-span-6 md:col-start-4 sm:col-span-1 sm:col-start-1 bg-white  p-3 w-full flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Change Password</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="passowrd"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassowrd"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            className=" text-1.2xl bg-pink-500 text-white hover:bg-pink-900 rounded-lg p-2 mt-4 w-full font-medium"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
