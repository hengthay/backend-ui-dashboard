import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = ({isOpen, handleOpenMenu}) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // console.log(parsedUser.username);
      setUser(parsedUser);
    }

  }, []);

  // console.log("Current User:", user);

  return (
    <header className="max-w-[1425px] lg:w-full fixed top-0 left-0 right-0 z-20 bg-white shadow-md border-b border-gray-200 md:ml-66">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-4">
        {/* Left Side */}
        <div className="flex items-center gap-x-3">
          {/* Hamburger visible on mobile */}
          <button
            onClick={() => handleOpenMenu()}
            className="block md:hidden text-gray-600 hover:text-gray-900"
          >
            <GiHamburgerMenu size={26} />
          </button>

          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://static.vecteezy.com/system/resources/previews/011/999/627/original/monitoring-icon-logo-illustration-dashboard-admin-symbol-template-for-graphic-and-web-design-collection-free-vector.jpg"
              alt="Logo-Dashboard"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <h2 className="md:text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 whitespace-nowrap">
              Product Management
            </h2>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <FaRegUserCircle
            size={24}
            className="text-gray-700 sm:w-7 sm:h-7"
          />
          <span className="inline text-sm sm:text-base md:text-lg font-medium text-gray-700">
            {user ? user.username : "Guest"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
