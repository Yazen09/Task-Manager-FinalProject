import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar, logout } from '../redux/slices/authSlice';
import UserAvatar from './UserAvatar';
import NotificationPanel from './NotificationPanel';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/log-in');
  };

  return (
    <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-gray-500 block md:hidden'
        >
          ☰
        </button>

        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
          <MdOutlineSearch className='text-gray-500 text-xl' />
          <input
            type='text'
            placeholder='Search....'
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
          />
        </div>
      </div>

      <div className='flex gap-4 items-center'>
        <NotificationPanel />
        <UserAvatar />

        {/* Bouton de déconnexion */}
        {user && (
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
