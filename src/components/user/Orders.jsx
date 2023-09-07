import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, doLogin } from '../../store/user/UserSlice';
import { getOrders } from '../../store/user/OrderSlice';

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('auth-token')) {
      dispatch(logout());
      navigate('/user/login');
    }
    if (localStorage.getItem('auth-token')) {
      dispatch(doLogin());
      dispatch(getOrders());
    }
  }, [isLoggedIn]);
  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1 m-3">
      {orders.length > 0 ? (
        <div className="flex flex-col md:col-span-6 md:col-start-4 sm:col-span-1 sm:col-start-1 border mx-2 shadow-lg p-2 space-y-4">
          <h1 className="text-md font-bold text-black">Your Order Data</h1>
          {orders.map((order) => {
            return (
              <div
                key={order._id}
                className="border p-2 bg-white rounded-md hover:outline-none hover:border-pink-500 flex flex-col"
              >
                <h2 className="text-sm font-semibold text-gray-500 ">
                  Total Products : {order.products.length}
                </h2>
                <p className="text-sm font-semibold text-gray-500 ">
                  Amount : {order.amount}
                </p>
                {order.date && (
                  <p className="text-sm font-semibold text-gray-500 ">
                    Date : {order.date}
                  </p>
                )}

                <p className="text-sm font-semibold text-gray-500 ">
                  Status : {order.orderStatus}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col md:col-span-6 md:col-start-4 sm:col-span-1 sm:col-start-1 border mx-2 shadow-md p-2">
          <h1 className="text-md font-bold text-black">
            You haven't placed any Order yet!
          </h1>
          <p className="text-sm font-semibold text-gray-500 ">
            Order section is empty. After placing order, You can track them from
            here!
          </p>
        </div>
      )}
    </div>
  );
}
