import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../../store/user/ProductSlice';
import Product from './Product';
import { useParams } from 'react-router-dom';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
export default function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { last } = useSelector((state) => state.product);
  const { category } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getProductsByCategory({ category, page }));
  }, [category]);

  const handleNext = () => {
    setPage(page + 1);
    dispatch(getProductsByCategory({ category, page: page + 1 }));
  };

  const handlePrevious = () => {
    setPage(page - 1);
    dispatch(getProductsByCategory({ category, page: page - 1 }));
  };

  return (
    <>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 p-2">
        {products &&
          products.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
      </div>
      <div className="flex justify-center items-center w-full m-4 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1 ? true : false}
          className="bg-gray-800 text-white p-2 rounded-lg flex"
        >
          <ArrowBigLeft />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={last}
          className="bg-gray-800 text-white p-2 rounded-lg flex"
        >
          Next
          <ArrowBigRight />
        </button>
      </div>
    </>
  );
}
