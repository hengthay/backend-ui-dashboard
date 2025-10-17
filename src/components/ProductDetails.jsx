import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, selectProductById, selectProductStatus } from '../features/products/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetailCard from './ProductDetailCard';

const ProductDetails = () => {

  // State and datas
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: 0,
    stock: 0,
    rating: 0,
    category_id: 1,
    descriptions: ""
  });
  const dispatch = useDispatch();
  const productData = useSelector(selectProductById);
  const productStatus = useSelector(selectProductStatus);
  const [error, setError] = useState(null);
  const {id} = useParams(); 
  const navigate = useNavigate();
  console.log('Received id----', id);

  // Fetch Individual Product with id
  useEffect(() => {
    if(!id) {
      console.log('ID is not received');
      setError("ID is not received");
      return;
    }
    // Check if id present and productStatus is idle or productData is not present or productData.id not equal to id received. So the dispatch will trigger the action to redux.
    if(id && (productStatus === "idle" || !productData || productData.id !== Number(id))) {
      dispatch(fetchProductById(id));
    }
    
  }, [id, dispatch]);
  
  // console.log('Product Data', productData);

    // Display loading state
  if (productStatus === 'loading' || !productData) {
    return <div className='flex justify-center items-center min-h-screen w-screen text-gray-800 sm:text-lg text-base font-medium'>Loading Product Data...</div>;
  }

  // Check if data is loaded but doesn't match the ID (e.g., initial state is different) or failed
  if (!productData || productData.id !== Number(id)) {
    // It might show a "Product Not Found" message or a loading spinner
    // based on Redux state if the fetch failed or is still loading.
    // For now, a fallback.
    if (productStatus === 'succeeded') {
        return <div className='flex justify-center items-center min-h-screen w-screen text-red-500 sm:text-lg text-base font-medium'>Error: Product not found or failed to load.</div>;
    }
  }
  return (
    <div className='flex overflow-hidden bg-white mt-23 md:ml-[261px] md:w-[1425px] w-[650px] max-sm:max-w-[550px] mx-3 min-h-screen h-auto p-6 sm:mx-8 z-[-10]'>
      <div className='md:p-4 p-2 w-full'>
        <div className='flex justify-center items-center w-full'>
          <ProductDetailCard productDetail={productData}/>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails