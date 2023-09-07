import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function EditProfile() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [image, setImage] = useState({ placeholder: '', file: null });
  const [address, setAddress] = useState({ state: '', city: '', pincode: '' });
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    about: '',
    contactNumber: '',
    address: address,
  });

  useEffect(() => {
    setAddress(user.address);
    setUpdatedUser(user);
  }, []);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!image.file) {
      toast.error('Please select correct image');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('name', updatedUser.name);
      formData.append('email', updatedUser.email);
      formData.append('contactNumber', updatedUser.contactNumber);
      formData.append('about', updatedUser.about);
      formData.append('state', address.state);
      formData.append('city', address.city);
      formData.append('pincode', address.pincode);
      const response = await fetch(`${BASE_URL}/api/users/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate('/admin/home/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-12 sm:grid-cols-1 m-4">
        <div
          className="md:col-span-6  md:col-start-4
     sm:col-span-1 sm:col-start-1  w-full flex  bg-gray-100"
        >
          <div className=" w-full p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={handleUpdate}>
              <img
                src={image.placeholder}
                alt=""
                id="image"
                name="image"
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
                  value={updatedUser.name}
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
                  value={updatedUser.email}
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
                  value={updatedUser.about}
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
                  value={updatedUser.contactNumber}
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
                  placeholder="Enter your city"
                />
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
