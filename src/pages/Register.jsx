import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { registerUser } from '../features/auth/authSlice';

const Register = () => {

  const [formData, setFormData] = useState({
    username: "",
    gmail: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(registerUser(formData)).unwrap();

      console.log("Register response:", res);
      
      // Reset form after successful submit
      setFormData({
        username: "",
        email: "",
        password: ""
      });

      setError(""); // clear any previous error
    } catch (error) {
      console.log("Register failed:", error);
      setError(error);
    }
  }

  const handleChange = (e) => {
    const {name} = e.target;

    setFormData({
      ...formData,
      [name]: e.target.value
    });

  };

  console.log("Form data:", formData);
  return (
    <section className='bg-gray-200 w-screen h-screen flex mx-auto justify-center items-center'>
      <div className='w-[450px] container bg-white/90 space-y-3 py-3 rounded-lg shadow-md'>
        <div className='md:text-2xl text-slate-800/80 font-semibold text-center'>
        <h2>Create Account</h2>
        </div>
        <form className='space-y-3 flex flex-col justify-center items-center my-4' onSubmit={handleSubmit}>
          <div className='flex flex-col space-y-2'>
            <label htmlFor="username" className='text-gray-500'>Username</label>
            <input
            name='username' 
            type="text" 
            className='border-0 w-[250px] bg-gray-200 focus:outline-1 focus:outline-blue-500 px-2 py-2' id='username'
            onChange={handleChange}
            />
          </div>
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
            <button type='submit' className='bg-black text-white font-semibold px-2 py-1.5 rounded-md w-[250px] hover:bg-transparent hover:text-black hover:border-1 transition ease-in-out duration-200'>Create</button>
          </div>
          <div>
            <p>Already have an account?
              <span className='ml-1 underline underline-offset-2'>
              <Link to={'/login'}>Back</Link>
              </span>
            </p>
          </div>
        </form>
        <div className='text-center text-red-500'>
          {error && <p>{error}</p>}
        </div>
      </div>
    </section>
  )
}

export default Register