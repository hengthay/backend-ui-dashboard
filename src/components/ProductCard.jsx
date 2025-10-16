import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
      <div className='flex flex-row w-full justify-between items-center bg-white shadow-md px-2 py-3' key={product.id}>
      <div className='flex items-center gap-x-3'>
        <img 
        src={`http://localhost:3001/images/${product.image}`}
        alt={product.title} 
        className="sm:w-50 sm:h-50 w-20 h-20 object-contain p-2"
        />
            <div className='space-y-1 leading-relaxed'>
              <p className='font-bold md:text-2xl sm:text-lg text-base text-gray-800 max-sm:w-60'>{product.title}</p>
              <p className='text-green-600 font-medium md:text-xl text-base'>${product.price}</p>
              <p className='text-sm text-gray-500 md:text-base '>Stock: {product.stock}</p>
          </div>
      </div>
      <div className='flex md:flex-row flex-col md:gap-y-2 gap-y-1 items-center gap-x-2 mr-2'>
        <button 
        onClick={() => alert("Product Deleted!")}
        className='group flex justify-center items-center bg-red-500 text-white p-2 rounded-lg cursor-pointer hover:bg-red-400 transition duration-300 ease-in-out md:text-base text-sm gap-[2px]'>
          <FaRegTrashAlt size={20}/>
          <span className='opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs transition-all duration-400 ease-in-out whitespace-nowrap'>
            Remove
          </span>
        </button>
        <p className='md:w-[2px] font-medium bg-gray-300 md:h-8'></p>
        <Link 
        to={`${product.id}/edit-product`}
        className='group flex justify-start items-center bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-400 transition duration-300 ease-in-out md:text-base text-sm gap-[2px]'>
          <CiEdit size={20}/>
          <span className='opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs transition-all duration-400 ease-in-out whitespace-nowrap'>
            Edit
          </span>
        </Link>
        <p className='md:w-[2px] font-medium bg-gray-300 md:h-8'></p>
        <Link 
        to={`${product.id}`}
        className='group flex justify-center items-center bg-yellow-500 text-white p-2 rounded-lg cursor-pointer hover:bg-yellow-400 transition duration-300 ease-in-out md:text-base text-sm gap-[2px]'>
          <FaEye size={20}/>
          <span className='opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs transition-all duration-400 ease-in-out whitespace-nowrap'>
            Review
          </span>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard