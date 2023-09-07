import { BaggageClaim, Shapes, UserCircle } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Sidebar() {
  const { categories } = useSelector((state) => state.category);
  return (
    <>
      <div className="bg-white broder shadow-xl text-black  flex flex-col flex-wrap  md:justify-start items-start sm:justify-center  w-auto py-8 px-4 space-y-4">
        <h2 className="text-xl font-semibold">Menu</h2>
        <ul className="space-y-4">
          <li className="flex justify-start items-start space-x-2">
            <UserCircle />
            <Link to={'/admin/home'} className="block hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li className="flex justify-start items-start space-x-2">
            <BaggageClaim />
            <Link
              to={'/admin/home/add-product'}
              className="block hover:text-gray-300"
            >
              Add Product
            </Link>
          </li>
        </ul>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-4">
          {categories &&
            categories.map((category) => {
              return (
                <li
                  key={category._id}
                  className="flex justify-start items-start space-x-2"
                >
                  <Shapes />
                  <Link
                    to={`/admin/home/${category._id}`}
                    className="block hover:text-gray-300"
                  >
                    {category.title}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
