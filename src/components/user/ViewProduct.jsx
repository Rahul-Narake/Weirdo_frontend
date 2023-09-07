import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { doLogin, logout } from '../../store/user/UserSlice';
import { toast } from 'react-hot-toast';
import { IndianRupee } from 'lucide-react';
import { addToCart } from '../../store/user/CartSlice';

export default function ViewProduct() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [size, setSize] = useState('');
  const { isLoggedIn } = useSelector((state) => state.user);

  const getProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/product/get/${productId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setProduct(result.product);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('auth-token')) {
      dispatch(logout());
      navigate('/user/login');
    }
    if (localStorage.getItem('auth-token')) {
      dispatch(doLogin());
      if (productId) {
        getProduct(productId);
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-2 mx-4">
      <div className="flex justify-center items-center md:col-span-2 md:col-start-2 sm:col-span-1 sm:col-start-1 border shadow-md">
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '300px', height: '400px' }}
        />
      </div>
      <div className="flex flex-col md:col-span-8 md:col-start-4 md:justify-start md:items-start sm:col-span-1 sm:col-start-2 sm:justify-center sm:items-start p-5 border shadow-md">
        <h1 className="font-bold text-2xl text-black">{product.name}</h1>
        <p className="font-normal text-gray-500  ">{product.description}</p>
        <hr />
        <hr />
        <h1 className="font-semibold text-1.8xl text-black mt-5 flex justify-start items-center">
          <IndianRupee style={{ height: '14px' }} className="" />
          {product.price}
        </h1>
        <h2 className=" text-green-600 font-semibold">
          inclusive of all taxes
        </h2>

        <div className="flex flex-wrap space-x-3 justify-start my-4">
          <h2 className=" text-black font-semibold">Colors :</h2>
          {product.colors &&
            product.colors.map((color, index) => {
              return (
                <span
                  key={index}
                  className={`w-8 h-8 bg-${color}-500 p-2 `}
                  style={{
                    background: `${color !== 'white' ? color : 'gray'}`,
                    color: 'orange',
                    borderRadius: '50%',
                  }}
                ></span>
              );
            })}
        </div>

        <div className="flex flex-wrap space-x-3 justify-start my-4">
          <h2 className=" text-black font-semibold">Size :</h2>
          {product.sizes &&
            product.sizes.map((size, index) => {
              return (
                <span
                  key={index}
                  onClick={(e) => {
                    handlesetSize(size);
                  }}
                  className={`w-15 h-15 p-2 pt-1  border text-center hover:border-orange-500 rounded-3xl cursor-pointer`}
                >
                  {size}
                </span>
              );
            })}
        </div>

        <div className="flex justify-center items-center my-3">
          <button
            onClick={handleAddToCart}
            className="bg-pink-500 p-2 rounded-md text-white font-semibold"
          >
            🛒 Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
