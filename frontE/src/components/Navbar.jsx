import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../assets';

{/* <Link to="/" className="flex items-center">
              <img src={logo} className="w-28 object-contain" alt="logo" />
            </Link> */}

const Navbar = () => {
  return (
    <nav className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
      <Link to="/" className="flex items-center">
              <img src={logo} className="w-28 object-contain" alt="logo" />
            </Link>
        <div className="flex items-center md:order-2">
          <a href="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log In</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
