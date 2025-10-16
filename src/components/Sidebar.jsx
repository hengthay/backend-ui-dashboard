import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaBoxOpen, FaHome, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiCodeView } from "react-icons/ri";
import { logout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const SideBar = ({isOpen, onClose}) => {

  const dispatch = useDispatch();  
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
  // menuItems array
  const menuItems = [
    { id: 1, iconName: FaHome, label: "Home",  pathName: "/"},
    { id: 2, iconName: FaBoxOpen, label: "Products",  pathName: "/products"},
    { id: 3, iconName: IoMdAdd, label: "New-Product",  pathName: "/new-product"},
    { id: 4, iconName: CiEdit, label: "Update",  pathName: "/update"},
    { id: 5, iconName: RiCodeView, label: "View-Details",  pathName: "/view-details"},
  ]
  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-40 z-10 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 min-h-screen w-64 bg-white border-r border-gray-200 shadow-md flex flex-col justify-between z-20 transform transition-transform duration-300
          ${isOpen ? "translate-x-0 mt-4" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Top Section */}
        <div className="pt-6 px-6">
          {/* Close Button for Mobile */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-700 md:mt-0 mt-15">Dashboard</h3>
            {/* <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
              <FaTimes size={20} />
            </button> */}
          </div>

          <ul className="space-y-3">
            {
              menuItems.length > 0 && (
                menuItems.map((item) => {
                  let Icon = item.iconName;
                  // To check if pathname matching.
                  const isActive = location.pathname === item.pathName;

                  return (
                    <li key={item.id}>
                      <Link
                        to={item.pathName}
                        className={`flex items-center gap-3  px-4 py-2 transition ${
                          isActive ? "border-l-2 rounded-l-md bg-blue-200 text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        <Icon size={20}/>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })
              )
            }
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="px-6 mb-8">
          <button
            onClick={() => handleLogout()}
            className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md w-full text-left transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default SideBar
