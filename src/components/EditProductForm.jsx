import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchProductById, selectProductById } from '../features/products/productSlice';

const EditProductForm = () => {

  const dispatch = useDispatch();
  const products = useSelector(selectProductById);
  const {id} = useParams(); 

  console.log('Received id----', id);
  useEffect(() => {
    if(!id) return console.log('ID is not received');
    
    dispatch(fetchProductById(id));

  }, [id,dispatch]);

  console.log(`Product with id:${id}`, products)
  return (
    <div className='flex overflow-hidden bg-white mt-23 md:ml-[261px] md:w-[1425px] w-[650px] max-sm:max-w-[550px] mx-3 min-h-screen h-auto p-6 sm:mx-8 z-[-10]'>
      
    </div>
  )
}

export default EditProductForm