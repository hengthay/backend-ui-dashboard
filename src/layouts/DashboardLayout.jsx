import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import SideBar from '../components/Sidebar'

const DashboardLayout = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <SideBar isOpen={isOpen} onClose={handleOpenMenu}/>
     
      <div className='max-w-6xl'>
        {/* NavBar */}
        <Navbar handleOpenMenu={handleOpenMenu}/>  
        <main>
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default DashboardLayout