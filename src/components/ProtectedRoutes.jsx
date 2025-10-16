import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await axios.get("http://localhost:3001/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if(res.status === 200) {
        setIsValid(true);
      } 
      console.log('user data----', res.data);
      // Set user to localstorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // console.log(token);
    } catch (error) {
      console.log("Token verification failed: ", error);
      localStorage.removeItem("token");
      setIsValid(false);
    }
  }

   // Still verifying
  if (isValid === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Not valid → redirect
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoutes