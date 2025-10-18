import React from 'react'

const ProductDetailCard = ({ productDetail, error }) => {

  // console.log("Product Details------", productDetail);

  return (
    <div className='w-full grid md:grid-cols-3 grid-cols-1 gap-8'>
      <div className='md:col-span-2 bg-white shadow-md p-4 rounded-lg space-y-3'>
        <h2 className='md:text-2xl sm:text-lg test-base text-gray-900 font-medium'>General Information</h2>
        <div className='space-y-2'>
          <p className='text-gray-500 text-base'>Product Name</p>
          <p className='text-gray-900 text-base px-3 py-2 bg-gray-100 font-medium rounded-lg'>{productDetail.title}</p>
        </div>
        <div className='space-y-2'>
          <p className='text-gray-500 text-base'>Description</p>
          <p className='text-gray-900 text-base px-3 py-2 bg-gray-100 font-medium rounded-lg min-h-40'>{productDetail.descriptions ?  productDetail.descriptions : "Descriptions is Not Available"}</p>
        </div>
      </div>
      <div className='bg-white shadow-md p-4 rounded-lg space-y-3'>
        <h2 className='md:text-2xl sm:text-lg test-base text-gray-900 font-medium'>Product Media</h2>
        <div className='space-y-2'>
          <p className='text-gray-500 text-base'>Photo Product</p>
          <div className='min-h-60 flex justify-center items-center text-gray-900 text-base px-3 py-2 bg-gray-100 font-medium rounded-lg border-2 border-gray-300 border-dashed'>
            <img 
            src={`http://localhost:3001/images/${productDetail.image}`} alt={productDetail.title} 
            className='sm:size-64 size-96'
            />
          </div>
        </div>
      </div>
      <div className='md:col-span-2 bg-white shadow-md p-4 rounded-lg space-y-3'>
        <h2 className='md:text-2xl sm:text-lg test-base text-gray-900 font-medium'>Pricing & Stock & Quality</h2>
        <div className='space-y-2'>
          <p className='text-gray-500 text-base'>Base Price</p>
          <p className='text-gray-900 text-base px-3 py-2 bg-gray-100 font-medium rounded-lg'>$ {productDetail.price}</p>
        </div>
        <div className='flex sm:flex-row flex-col justify-between items-center gap-2'>
          <div className='md:w-1/2 w-full space-y-2'>
            <p className='text-gray-500 text-base'>Stock</p>
            <p className='text-gray-900 text-base px-3 py-2 bg-gray-100 font-medium rounded-lg '>{productDetail.stock}</p>
          </div>
          <div className='md:w-1/2 w-full space-y-2'>
            <p className='text-gray-500 text-base'>Rating</p>
            <p className='text-gray-900 text-base px-3 py-2 bg-gray-100 font-medium rounded-lg '>{productDetail.rating}</p>
          </div>
        </div> 
      </div>
      <div className='bg-white shadow-md p-4 rounded-lg space-y-3'>
        <h2 className='md:text-2xl sm:text-lg test-base text-gray-900 font-medium'>Category</h2>
        <div className='spacy-2'>
          <p className='text-gray-500 text-base'>Product Category</p>
          <p className='text-gray-900 text-base px-3 py-2 bg-gray-100 font-medium rounded-lg'>{productDetail.name}</p>
        </div>
        <div className='spacy-2'>
          <p className='text-gray-500 text-base'>Product Description</p>
          <p className='text-gray-900 text-base px-3 py-2 bg-gray-100 font-medium rounded-lg min-h-20'>{productDetail.description ?  productDetail.description : "Description is Not Available"}</p>
        </div>
      </div>
      {error && <p className='text-center text-red-500 font-medium sm:text-base md:text-lg text-sm'>{error}</p>}
    </div>
  )
};

export default ProductDetailCard