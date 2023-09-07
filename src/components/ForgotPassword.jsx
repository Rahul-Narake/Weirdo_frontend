import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1 mt-10">
      <div className="md:col-span-6 md:col-start-4 sm:col-span-1 sm:col-start-1 bg-white  p-3 w-full flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Find Your Account</h1>
          <p className="text-gray-400 font-normal">
            Enter the email associated with your account to change your
            password.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@gmail.com"
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              className=" text-1.2xl bg-pink-500 text-white hover:bg-pink-900 rounded-lg p-2 mt-4 w-full font-medium"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
