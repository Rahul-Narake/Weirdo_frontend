import React from 'react';
import { Link } from 'react-router-dom';

export default function Category({ category }) {
  return (
    <Link
      to={`/user/home/${category._id}`}
      className="flex flex-col text-black m-3 border shadow-sm"
    >
      <div className="flex justify-center items-start">
        <img
          src={category.imageUrl}
          alt={category.title}
          style={{ width: '200px', height: '200px' }}
        />
      </div>
      <h1 className="text-1xl  text-black p-2 font-semibold">
        {category.title}
      </h1>
    </Link>
  );
}
