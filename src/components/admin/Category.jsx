import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/admin/ProductSlice';
import Product from './Product';
export default function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts(category));
  }, [category]);

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
      {products &&
        products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
    </div>
  );
}
