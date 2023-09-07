import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin, getCurrentUser, logout } from '../../store/user/UserSlice';
import { ShoppingCart } from 'lucide-react';
import { getCartItems } from '../../store/user/CartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [text, setText] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);

  const handle = (e) => {
    const value = e.target.value;
    switch (value) {
      case 'logout':
        dispatch(logout());
        break;
      case 'profile':
        navigate('/user/home/profile');
        break;
      case 'edit-profile':
        navigate('/user/home/edit-profile');
        break;
      case 'orders':
        navigate('/user/home/orders');
        break;

      default:
        break;
    }
  };

  const handleSearch = async (e) => {
    try {
      setText(e.target.value);
      const response = await fetch(
        `http://localhost:5001/product/search/${text}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setSearchedProducts(result.searchedProducts);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && localStorage.getItem('auth-token')) {
      dispatch(doLogin());
      dispatch(getCartItems());
      dispatch(getCurrentUser());
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="flex flex-wrap md:justify-between md:items-center sm:justify-start sm:items-start md:p-3 sm:p-2 bg-white shadow-md ">
        <div className="flex flex-wrap justify-start items-center text-black font-md space-x-4">
          <Link to={'/user/home'} className="text-2xl font-bold text-pink-500">
            Weirdo
          </Link>
          {isLoggedIn && (
            <Link
              to={'/user/home'}
              className="text-md font-normal text-gray-500"
            >
              Home
            </Link>
          )}

          {!isLoggedIn && (
            <Link to={'/'} className="text-md font-normal text-gray-500">
              Home
            </Link>
          )}
        </div>

        <div className="flex flex-wrap md:justify-start md:items-center sm:justify-start sm:items-start sm:p-0 text-black font-md md:space-x-4 sm:space-x-1">
          {isLoggedIn && (
            <input
              type="text"
              name="searchtext"
              id="searchtext"
              value={text}
              onChange={handleSearch}
              className=" px-4 py-2 border rounded shadow-sm focus:outline-none focus:border-pink-500 ml-0"
              placeholder="Search for products"
            />
          )}
          <>
            {!isLoggedIn ? (
              <>
                <Link
                  to={'/user/login'}
                  className="bg-pink-500 border p-2 rounded-xl text-white"
                >
                  Login
                </Link>
                <Link
                  to={'/user/signup'}
                  className="bg-blue-500 border p-2 rounded-xl text-white"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <div className="flex justify-start items-start">
                  <select
                    className="border p-2"
                    id="menu"
                    name="menu"
                    onChange={handle}
                  >
                    <option value="">👤</option>
                    <option value="profile">Profile</option>
                    <option value="orders">Orders</option>
                    <option value="edit-profile">Edit Profile</option>
                    <option value="logout">Logout</option>
                  </select>
                </div>

                <Link to={'/user/home/cart'} className="flex flex-wrap">
                  <ShoppingCart color="gray" className="mt-2" />
                  <p>{cartItems.length}</p>
                </Link>
              </>
            )}
          </>
        </div>
      </div>

      {text && (
        <div className="grid md:grid-cols-12 sm:grid-cols-1 mx-3">
          <ul className=" bg-white border text-gray-800 mt-1 md:col-span-4 md:col-start-8 sm:col-span-1 sm:col-start-1 flex  flex-col w-full items-center justify-start space-y-2 cursor-pointer">
            {searchedProducts && searchedProducts.length === 0 ? (
              <li>Not Available</li>
            ) : (
              searchedProducts.map((product) => {
                return (
                  <li
                    key={product._id}
                    className="cursor:pointer text-start text-gray-600"
                    onClick={(e) => {
                      e.preventDefault();
                      setText('');
                      navigate(`/user/home/product/${product._id}`);
                    }}
                  >
                    {product.name}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </>
  );
}
