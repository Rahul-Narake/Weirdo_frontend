import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Auth() {
  return (
    <div className="grid grid-cols-1">
      <div className="col-span-1 sol-start-1 bg-purple-500 text-white  h-screen flex flex-col justify-center items-center p-3">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Our Ecommerce Store
        </h1>
        <p className="text-lg mb-8">
          Discover the best products at amazing prices.
        </p>
        <Link className="bg-pink-500 p-2 rounded-lg text-white" to={'/user/'}>
          Explore new Products
        </Link>
        <Link
          className="bg-blue-500 p-2 rounded-lg text-white m-3"
          to={'/admin/'}
        >
          Want to Become Seller ?
        </Link>
      </div>
    </div>
  );
}
