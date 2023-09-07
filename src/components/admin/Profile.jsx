import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/admin/UserSlice';
import { UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className="p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg flex ">
        <div className="flex-shrink-0">
          <img
            src={user && user.image}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="ml-8">
            <h2 className="text-2xl font-semibold">{user && user.name}</h2>
            <p className="text-gray-700">{user && user.email}</p>
            <p className="text-gray-600 mt-2">{user && user.about}</p>
          </div>
          <div className="ml-8 mt-8">
            <Link to={`/admin/home/user/${user._id}`}>
              <UserCog />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
