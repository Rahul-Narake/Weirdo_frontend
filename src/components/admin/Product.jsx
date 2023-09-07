import { IndianRupee, PenSquare, Trash2 } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeStatus, removeProduct } from '../../store/admin/ProductSlice';
import { Link } from 'react-router-dom';
export default function Product({ product }) {
  const dispatch = useDispatch();
  const toggleStatus = (_id) => {
    dispatch(changeStatus(_id));
  };
  const handleRemove = (_id) => {
    dispatch(removeProduct(_id));
  };

  return (
    <div className="bg-white border shadow-sm flex flex-col pl-4 pb-4 space-y-3">
      <div className="flex justify-center items-start">
        <img src={`${product.image}`} alt={product.name} />
      </div>
      <h2 className="text-1xl font-medium ">{product.name}</h2>
      <p className="text-1xl text-sm text-gray-500">
        {product.description.length < 40
          ? product.description
          : product.description.slice(0, 37) + '...'}
      </p>
      <div className="flex justify-start items-center">
        <IndianRupee size={16} />
        <p>{product.price}</p>
      </div>
      <div className="flex justify-start items-center space-x-4">
        <div>
          {product.active ? (
            <button
              onClick={(e) => {
                toggleStatus(product._id);
              }}
              className="text-red-600"
            >
              Deactive
            </button>
          ) : (
            <button
              onClick={(e) => {
                toggleStatus(product._id);
              }}
              className="text-green-400"
            >
              Active
            </button>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={(e) => {
              handleRemove(product._id);
            }}
            className="text-gray-700"
          >
            <Trash2 size={20} />
          </button>

          <Link
            to={`/admin/home/product/${product._id}`}
            className="text-gray-700"
          >
            <PenSquare size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
