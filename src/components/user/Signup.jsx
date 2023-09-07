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
    contactNumber: '',
    about: '',
    address: address,
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      user.address = address;
      const response = await fetch(`${BASE_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        navigate('/user/login');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1">
      <div className="md:col-span-4 md:col-start-5 sm:col-span-1 sm:col-start-1 bg-white p-4 mx-3 my-6 shadow-md">
        <h1 className="font-bold text-2xl my-4">Signup Here</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={onChange}
              placeholder="john Doe"
              className=" w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={onChange}
              placeholder="john@gmail.com"
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={onChange}
              placeholder="********"
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              type="phone"
              id="contactNumber"
              name="contactNumber"
              value={user.contactNumber}
              onChange={onChange}
              maxLength={10}
              minLength={10}
              placeholder="5783902202"
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contact"
            >
              About
            </label>
            <textarea
              type="text"
              id="about"
              name="about"
              value={user.about}
              onChange={onChange}
              rows={5}
              placeholder="for example your profession"
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={(e) => {
                setAddress({ ...address, [e.target.name]: e.target.value });
              }}
              placeholder="Maharashtra"
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={(e) => {
                setAddress({ ...address, [e.target.name]: e.target.value });
              }}
              placeholder="Kolhapur"
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={address.pincode}
              onChange={(e) => {
                setAddress({ ...address, [e.target.name]: e.target.value });
              }}
              placeholder="756833"
              maxLength={6}
              minLength={6}
              required
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center space-x-4 m-2">
            <button className="bg-pink-500 text-white rounded-lg p-2">
              Signup
            </button>
            <button className="bg-blue-500 text-white rounded-lg p-2">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
