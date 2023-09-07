import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [address, setAddress] = useState({ state: '', city: '', pincode: '' });
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
    contactNumber: '',
    address: address,
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    user.address = address;
    try {
      const response = await fetch(`${BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate('/admin/login');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-12 sm:grid-cols-1 m-4">
        <div
          className="md:col-span-4  md:col-start-5
         sm:col-span-1 sm:col-start-1  w-full flex  bg-gray-100"
        >
          <div className=" w-full p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={onChange}
                  required
                  placeholder="Enter your username"
                />
              </div>
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
                  value={user.email}
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
                  value={user.password}
                  onChange={onChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="about"
                >
                  About You
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  type="text"
                  id="about"
                  name="about"
                  value={user.about}
                  onChange={onChange}
                  required
                  rows={5}
                  placeholder="write something about you"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="contactNumber"
                >
                  Contact
                </label>
                <input
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  type="phone"
                  id="contactNumber"
                  name="contactNumber"
                  value={user.contactNumber}
                  onChange={onChange}
                  required
                  placeholder="Enter your Contact"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="State"
                >
                  State
                </label>
                <input
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  type="text"
                  id="state"
                  name="state"
                  required
                  value={address.state}
                  onChange={(e) => {
                    setAddress({ ...address, [e.target.name]: e.target.value });
                  }}
                  placeholder="Enter your State"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="City"
                >
                  City
                </label>
                <input
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  type="text"
                  id="city"
                  name="city"
                  value={address.city}
                  required
                  onChange={(e) => {
                    setAddress({ ...address, [e.target.name]: e.target.value });
                  }}
                  placeholder="Enter your city"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="pincode"
                >
                  Pincode
                </label>
                <input
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={address.pincode}
                  required
                  onChange={(e) => {
                    setAddress({ ...address, [e.target.name]: e.target.value });
                  }}
                  placeholder="Enter your pincode"
                />
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
