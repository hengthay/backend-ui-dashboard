import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailById, selectProductById, selectProductStatus } from '../features/products/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetailCard from './ProductDetailCard';
import { TbListDetails } from "react-icons/tb";

const ProductDetails = () => {

  const dispatch = useDispatch();
  const productData = useSelector(selectProductById);
  const productStatus = useSelector(selectProductStatus);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {id} = useParams(); 
  // console.log('Received id----', id);

  // Fetch Individual Product with id
  useEffect(() => {
      if(!id) {
        console.log('ID is not received')
        return;
      }
      // Check if id present and productStatus is idle or productData is not present or productData.id not equal to id received. So the dispatch will trigger the action to redux.
      if(id || (!productData || productData.id !== Number(id))) {
        dispatch(fetchProductDetailById(id));
      }
      
    }, [id, dispatch]);
  
  // console.log('Product Data', productData);

    // Display loading state
  if (productStatus === 'loading') {
    return <div className='flex justify-center items-center min-h-screen w-screen text-gray-800 sm:text-lg text-base font-medium'>Loading Product Data...</div>;
  }

  // Check for successful fetch that resulted in NO data (404/not found)
  if (productStatus === "successed" && (!productData || productData.id !== Number(id))) {
    // This handles the 404 case where fetch was successful but returned no product
    return <div className='flex justify-center items-center min-h-screen w-screen text-red-500 sm:text-lg text-base font-medium'>Error: Product not found or failed to load.</div>;
}

  // Check for failed fetch
  if (productStatus === 'failed') {
    return <div className='flex justify-center items-center min-h-screen w-screen text-red-500 sm:text-lg text-base font-medium'>Error: Failed to retrieve product details.</div>;
  }

  // If we reach here, productStatus is 'succeeded' AND productData should be valid.
  // You can also add one final defensive check before rendering:
  if (!productData) {
      return null; // or some other safe fallback
  }
    
  return (
    <div className='flex overflow-hidden bg-white mt-23 md:ml-[261px] md:w-[1425px] w-[650px] max-sm:max-w-[550px] mx-3 min-h-screen h-auto p-6 sm:mx-8 z-[-10] border border-gray-200 shadow-md'>
      <div className='md:p-4 p-2 w-full space-y-3'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center gap-x-2'>
            <TbListDetails className='text-blue-500' size={24} />
            <h2 className='md:text-2xl sm:text-lg text-base text-gray-900 font-medium'>Product Detail</h2>
          </div>
          <div className='text-right mt-4'>
            <button 
            onClick={() => navigate("/products")}
            className='shadow-md min-w-30 bg-gray-100 text-gray-800 font-medium sm:text-lg text-sm py-1.5 rounded-md border border-gray-200 cursor-pointer hover:bg-white/80 hover:-translate-y-2 transition ease-linear duration-200'>
              Back
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center w-full'>
          <ProductDetailCard 
            productDetail={productData}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails