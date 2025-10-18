import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { deleteProduct } from '../features/products/productSlice';

const RemoveButton = ({ id }) => {
  // Action
  const dispatch = useDispatch();

  // Delete Product
  const handleDelete = async () => {
    // Alert confirm button
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    })
    // console.log(result.isConfirmed);
    if(result.isConfirmed) {
      try {
        const res = await dispatch(deleteProduct(id)).unwrap();
        // console.log(res);
        Swal.fire(
          'Deleted!', 'Product has been removed.', 'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!', error || 'Failed to delete product.', 'error'
        );
      }
    }
  } 
  // console.log(id);

  return (
    <button 
      onClick={handleDelete}
      className='group flex justify-center items-center bg-red-500 text-white p-2 rounded-lg cursor-pointer hover:bg-red-400 transition duration-300 ease-in-out md:text-base text-sm gap-[2px]'
      >
      <FaRegTrashAlt size={20}/>
      <span className='opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs transition-all duration-400 ease-in-out whitespace-nowrap'>
        Remove
      </span>
    </button>
  )
}

export default RemoveButton