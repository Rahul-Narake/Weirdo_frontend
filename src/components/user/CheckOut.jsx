import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogin, logout } from '../../store/user/UserSlice';
import { toast } from 'react-hot-toast';
import useRazorpay from 'react-razorpay';
import { getCartItems } from '../../store/user/CartSlice';

export default function CheckOut() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;
  const [Razorpay] = useRazorpay();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [address, setAddress] = useState({ state: '', city: '', pincode: '' });

  const toggleAddressBox = (e) => {
    e.preventDefault();
    const modal = document.getElementById('address-box');
    modal.classList.toggle('hidden');
  };

  const confirmAddress = (e) => {
    e.preventDefault();
    const modal = document.getElementById('address-box');
    modal.classList.toggle('hidden');
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = (e) => {
    e.preventDefault();
    if (totalPrice <= 0) {
      toast.error('Please purchase something');
      navigate('/user/home');
      return;
    }
    let products = [];
    const currency = 'INR';
    const amount = totalPrice;
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        let obj = {
          id: cartItems[i]._id,
          name: cartItems[i].productName,
          quantity: cartItems[i].quantity,
        };
        products.push(obj);
      }
    }
    createOrder(products, amount, currency);
  };

  const createOrder = async (products, amount, currency) => {
    try {
      const response = await fetch(`${BASE_URL}/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ products, amount, currency }),
      });
      const result = await response.json();
      if (result.orderId && result.success) {
        openPaymentWindow(result, amount, currency, user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openPaymentWindow = async (response, amount, currency, user) => {
    const options = {
      order_id: response.orderId,
      key: KEY_ID,
      amount: amount * 100,
      currency: currency,
      name: user.name,
      description: 'Payment of Online Shopping from cart',
      image:
        'https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908_640.jpg',
      handler: (response) => {
        processResponse(response);
      },
      prefill: {
        name: 'Shopify',
        email: user.email,
        contact: user.contactNumber,
      },
      notes: {
        address: 'Online Shopping',
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpayObject = new Razorpay(options);
    razorpayObject.open();
  };

  const processResponse = async (resp) => {
    try {
      if (resp !== null) {
        const response = await fetch(`${BASE_URL}/order/complete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          },
          body: JSON.stringify({
            orderId: resp.razorpay_order_id,
            paymentId: resp.razorpay_payment_id,
            orderStatus: 'completed',
            date: new Date(),
          }),
        });
        const result = await response.json();
        if (result.success) {
          dispatch(getCartItems());
          toast.success(result.message);
          navigate('/user/home');
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('auth-token')) {
      dispatch(logout());
      navigate('/user/login');
    }
    if (localStorage.getItem('auth-token')) {
      dispatch(doLogin());
    }
  }, [isLoggedIn]);

  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1">
      <div className="flex flex-col md:col-span-4 md:col-start-5 sm:col-soan-1 sm:col-start-1 mx-3 bg-white border shadow-md p-3">
        <button
          onClick={toggleAddressBox}
          className="text-md font-semibold cursor-pointer text-blue-700 m-3"
        >
          Confirm Address
        </button>
        <div id="address-box" className="hidden">
          <form
            onSubmit={confirmAddress}
            className="bg-white border p-2 shadow-md"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="State"
              >
                State
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                type="text"
                id="state"
                name="state"
                required
                defaultValue={user.address && user.address.state}
                onChange={(e) => {
                  setAddress({ ...address, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="City"
              >
                City
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                type="text"
                id="city"
                name="city"
                defaultValue={user.address && user.address.city}
                required
                onChange={(e) => {
                  setAddress({ ...address, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pincode"
              >
                Pincode
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                type="text"
                id="pincode"
                name="pincode"
                defaultValue={user.address && user.address.pincode}
                required
                onChange={(e) => {
                  setAddress({ ...address, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-900 text-white p-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>

        <div>
          <form onSubmit={handleCheckout}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Amount"
              >
                Amount
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                type="Number"
                id="amount"
                name="amount"
                required
                defaultValue={totalPrice}
                onChange={(e) => {}}
              />
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-pink-500 hover:bg-pink-900 text-white font-semibold text-md p-2 rounded-lg">
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
