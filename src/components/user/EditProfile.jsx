import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogin, getCurrentUser, logout } from '../../store/user/UserSlice';
import { toast } from 'react-hot-toast';
export default function EditProfile() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [image, setImage] = useState({ placeholder: '', file: null });
  const [address, setAddress] = useState({ state: '', city: '', pincode: '' });
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    about: '',
    contactNumber: '',
    address: address,
  });

  const onChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleProfileImageChange = (e) => {
    if (
      e.target.files[0].type === 'image/png' ||
      e.target.files[0].type === 'image/jpeg'
    ) {
      //show preview
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({ placeholder: r.target.result, file: e.target.files[0] });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error('invalid file');
      image.file = null;
    }
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!image.file) {
      toast.error('Please select image');
      return;
    }
    updatedUser.address = address;
    if (updatedUser.name === '') {
      updatedUser.name = user.name;
    }
    if (updatedUser.email === '') {
      updatedUser.email = user.email;
    }
    if (updatedUser.contactNumber === '') {
      updatedUser.contactNumber = user.contactNumber;
    }
    if (updatedUser.about === '') {
      updatedUser.about = user.about;
    }
    if (address.state === '') {
      updatedUser.address.state = user.address.state;
    }
    if (address.city === '') {
      updatedUser.address.city = user.address.city;
    }
    if (address.pincode === '') {
      updatedUser.address.pincode = user.address.pincode;
    }
    try {
      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('name', updatedUser.name);
      formData.append('email', updatedUser.email);
      formData.append('contactNumber', updatedUser.contactNumber);
      formData.append('about', updatedUser.about);
      formData.append('state', updatedUser.address.state);
      formData.append('city', updatedUser.address.city);
      formData.append('pincode', updatedUser.address.pincode);
      const response = await fetch(`${BASE_URL}/users/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate('/user/home/profile');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1">
      <div className="flex flex-col md:col-span-6 md:col-start-4 sm:col-span-1 sm:col-start-1 border bg-white shadow-md mx-2 p-4 mb-4">
        <h1 className="text-1.8xl text-black font-semibold my-2">
          Edit Details
        </h1>
        <hr />
        <form onSubmit={handleUpdate} className="my-2">
          <img
            src={image.placeholder}
            className="w-100 h-100"
            style={{ width: '150px', margin: 'auto', ObjectFit: 'cover ' }}
          />

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              onChange={handleProfileImageChange}
            />
            <p className="text-sm text-gray-500 p-3">
              Image should be of type jpg and file name should be your name
            </p>
          </div>

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
              defaultValue={user.name}
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
              defaultValue={user.email}
              onChange={onChange}
              required
              placeholder="Enter your email"
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
              defaultValue={user.about}
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
              defaultValue={user.contactNumber}
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
              defaultValue={user.address && user.address.state}
              onChange={(e) => {
                setAddress({ ...address, [e.target.name]: e.target.value });
              }}
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
              defaultValue={user.address && user.address.city}
              required
              onChange={(e) => {
                setAddress({ ...address, [e.target.name]: e.target.value });
              }}
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
              defaultValue={user.address && user.address.pincode}
              required
              onChange={(e) => {
                setAddress({ ...address, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <button
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-900 focus:outline-none focus:shadow-outline-blue"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
