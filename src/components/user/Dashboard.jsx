import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogin, logout } from '../../store/user/UserSlice';
import Category from './Category';
import { getCategories } from '../../store/user/CategorySlice';
import { getProducts } from '../../store/user/ProductSlice';
import Product from './Product';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('auth-token')) {
      dispatch(logout());
      navigate('/user/login');
    } else {
      dispatch(doLogin());
      dispatch(getCategories());
      dispatch(getProducts());
    }
  }, [isLoggedIn]);

  return (
    <div className="bg-white shadow-sm flex flex-col w-full space-y-4">
      <div className="px-5 w-full">
        <img
          src="https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-117920.jpg?size=626&ext=jpg&ga=GA1.2.1070161496.1689833033&semt=ais"
          alt="lp-image"
          className="object-cover w-full h-96"
        />
      </div>
      <h2 className="text-2xl font-bold px-5">Categories</h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 text-black px-5">
        {categories &&
          categories.map((category) => {
            return <Category key={category._id} category={category} />;
          })}
      </div>
      <h2 className="text-2xl font-bold px-5">Recommended Products</h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 text-black px-5 gap-4">
        {products &&
          products.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
      </div>
    </div>
  );
}
