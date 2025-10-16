import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../features/auth/authSlice'
import Swal from 'sweetalert2';

const Login = () => {
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if(!formData.email || !formData.password) {
        setIsValid(true)
        return;
      };

      const result = await dispatch(loginUser(formData)).unwrap();

      // console.log("Token received:", result.token); // should log the token
      if(result) {
        Swal.fire({
          title: "Login Successed",
          text: "Your login is successfully",
          icon: "success"
        });
      }
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Failed to Login",
        text: "Your failed to login",
        icon: "warning"
      });
      console.log("Login failed:", error);
      setIsValid(false);
      setIsLoading(false);
      // setError(error || "Invalid credentials");
    }
  }

  const handleChange = (e) => {

    const {name} = e.target;

    setFormData({
      ...formData,
      [name]: e.target.value
    })
  }


  if(error) return <p className='text-center mt-20 text-2xl underline underline-offset-4 text-gray-400 font-medium border border-dashed flex justify-center mx-auto items-center w-[700px] p-3 shadow'>The Website is cannot reload. Please try again later!</p>
  // console.log(formData);
  return (
    <section className='bg-gray-200 w-screen h-screen flex mx-auto justify-center items-center'>
      <div className='w-[450px] container bg-white/90 space-y-3 py-3 rounded-lg shadow-md'>
        <div className='md:text-2xl text-slate-800/80 font-semibold text-center'>
        <h2>Login Account</h2>
        </div>
        <form className='space-y-3 flex flex-col justify-center items-center my-4' onSubmit={handleSubmit}>
          <div className='flex flex-col space-y-2'>
            <label htmlFor="email" className='text-gray-500'>Email</label>
            <input
            name='email' 
            type="text" 
            className='border-0 w-[250px] bg-gray-200 focus:outline-1 focus:outline-blue-500 px-2 py-2' id='email'
            onChange={handleChange}
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <label htmlFor="password" className='text-gray-500'>Password</label>
            <input 
            name='password'
            type="password" 
            className='border-0 w-[250px] bg-gray-200 focus:outline-1 focus:outline-blue-500 px-2 py-2' id='password'
            onChange={handleChange}
            />
          </div>
          <div className='mt-2'>
            <button type='submit' className='bg-black text-white font-semibold px-2 py-1.5 rounded-md w-[250px] hover:bg-transparent hover:text-black hover:border-1 transition ease-in-out duration-200'>
              {isLoading ? '...Loading' : 'Login'}
            </button>
          </div>
          <div>
            <p>Don't have an account?
              <span className='ml-1 underline underline-offset-2'>
              <Link to={'/register'}>Register</Link>
              </span>
            </p>
          </div>
        </form>
        <div className='text-center text-red-500'>
          {error && <p>{error}</p>}
        </div>
        <div className='text-center text-red-500'>
          {isValid && <p>Please fill out the fleid.</p>}
        </div>
      </div>
    </section>
  )
}

export default Login