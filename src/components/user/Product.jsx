import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/user/CartSlice';
import { toast } from 'react-hot-toast';

export default function Product({ product }) {
  const dispatch = useDispatch();
  const [size, setSize] = useState('');
  const handlesetSize = (val) => {
    setSize(val);
    toast.success('size set successfully', size);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!size) {
      toast.error('Please select size');
      return;
    }
    dispatch(
      addToCart({
        productName: product.name,
        productId: product._id,
        price: product.price,
        quantity: 1,
        image: product.image,
        size,
      })
    );
  };

  return (
    <>
      <Link
        to={`/user/home/product/${product._id}`}
        className="flex flex-col border shadow-sm space-y-3 pb-4"
      >
        <div className="flex justify-center items-start">
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '200px', height: '250px' }}
          />
        </div>
        <div className="flex flex-col ">
          <h2 className="text-1xl font-semibold ml-4">{product.name}</h2>
          <p className="text-1xl font-normal ml-4 text-gray-500">
            {product.description.length < 35
              ? product.description
              : product.description.slice(0, 35) + '...'}
          </p>
        </div>
        <h2 className="text-1xl font-semibold ml-4">Rs. {product.price}</h2>

        <div className="flex flex-wrap space-x-2 ml-4">
          {product.sizes.map((sz, index) => {
            return (
              <span
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  handlesetSize(sz);
                }}
                className={`border p-2 hover:outline-none hover:border-blue-400`}
              >
                {sz}
              </span>
            );
          })}
        </div>
        <div className="flex justify-center items-center ">
          <button
            onClick={handleAddToCart}
            className="bg-pink-500 text-white p-2 rounded-md"
          >
            Add To Cart
          </button>
        </div>
      </Link>
    </>
  );
}
