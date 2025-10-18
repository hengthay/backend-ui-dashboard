import { useEffect } from 'react'
import { IoMdAdd } from "react-icons/io";
import { fetchProduct, selectAllProducts, selectProductStatus } from '../features/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Link, useLocation } from 'react-router-dom';

const Products = () => {
  const status = useSelector(selectProductStatus);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const location = useLocation();

  useEffect(() => {

    if(location.pathname === '/products') {
      dispatch(fetchProduct());
    }

  }, [location.pathname, dispatch]);

  if(status === 'failed') return <p>Product cannot be fetch</p>;

  if(status === 'loading') return <p>Loading...</p>

  // console.log('Product Received:-------', products);
  
  return (
    <div className="space-y-6 mt-23 md:ml-65 bg-white/90 min-h-screen md:w-[1420px] w-[650px] max-sm:max-w-[500px] p-6 sm:mx-8 z-[-10] border border-gray-200 shadow-md">
      {/* Added New Product */}
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='font-semibold lg:text-2xl md:text-xl text-base text-gray-900'>Product Overview</h3>
        </div>
        <div className='flex'>
          <Link 
          to={'/products/new'}
          className='flex justify-center items-center bg-blue-500 text-white font-medium px-2 py-1.5 rounded-lg cursor-pointer hover:bg-blue-400 transition duration-300 ease-in-out'>
            <IoMdAdd size={24}/>
            <span>Add New Product</span>
          </Link>
        </div>
      </div>
      {/* Product Card */}
      {
        products.length > 0 ? (
          products.map((product) => <ProductCard product={product} key={product.id}/>)
        ) : (
          <p>No Product was found</p>
        )
      }
      
    </div>
  )
}

export default Products