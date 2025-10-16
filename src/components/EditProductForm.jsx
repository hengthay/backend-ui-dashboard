import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById, selectProductById, selectProductStatus, updateProduct } from '../features/products/productSlice';
import { IoMdAdd } from 'react-icons/io';
import { FiUpload } from 'react-icons/fi';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditProductForm = () => {

  // State and datas
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: 0,
    stock: 0,
    rating: 0,
    category_id: 1
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
      console.log('ID is not received')
      return;
    }
    
    if(productStatus === 'idle' || (productData && productData.id !== Number(id))) {
      dispatch(fetchProductById(id));
    }
    
  }, [id, dispatch, productData, productStatus]);

  // Initialize local formData with the fetched product data
  useEffect(() => {
    // Checkk if data is present and id is received, then we set the fetched product and assign value to our state to display that item.
    if(productData && productData.title && productData.id === Number(id)) {
      setFormData({
        title: productData.title || "",
        image: productData.image || "",
        price: Number(productData.price) || 0,
        stock: Number(productData.stock) || 0,
        rating: Number(productData.rating) || 0,
        // Ensure category_id is set correctly for the select box
        category_id: Number(productData.category_id) || 1
      });
    }
  }, [productData, id]);

  // Handle on update the products
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Payload that contains any datas for sending to backend side.
      const payload = {
        id: Number(id),
        title: formData.title,
        image: formData.image,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating),
        category_id: Number(formData.category_id)
      };

      if(isNaN(payload.price) || isNaN(payload.stock) || isNaN(payload.rating) || isNaN(payload.category_id)) {
        setError("Price, Stock, Rating, and Category_id must be valid numbers");
        return;
      }

      if(!payload.title || !payload.image || payload.price === 0 || payload.stock === 0 || payload.rating === 0 || !payload.category_id) {
        setError("Title, Image, Price, Stock, and Category ID are required fields.");
        return;
      }

      const uploadProduct = await dispatch(updateProduct(payload)).unwrap();

      if(uploadProduct) {
        navigate("/products");
        Swal.fire({
          title: "Update Succeeded",
          text: "Product has been updated successfully",
          icon: "success"
        })
      }

    } catch (error) {
      Swal.fire({
        title: "Failed to Update",
        text: "Product update failed: " + (error.message || "Server Error"),
        icon: "warning"
      })
      setError(error.message || "Failed to update product.");
      console.log('Submission Error: ', error);
    }
  }

  // Handle Input value for each box
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // Check if the field is expected to be a number
    // const numericFields = ['price', 'stock', 'rating', 'category_id'];
    // const newValue = numericFields.includes(name) ? Number(value) : value;
    // For text, number, and select inputs, store the value as a string.
    // Conversion to number only happens on submit.
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Handle on move image and upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if(!file) return;
    
    // Create form data
    const formDataFile = new FormData();
    formDataFile.append("images", file);

    try {
      const res = await axios.post("http://localhost:3001/api/products/upload", formDataFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("image upload---", res.data);

      // Assuming res.data.imageUrl is the URL/path needed for the product record
      setFormData({
        ...formData,
        image: res.data.imageUrl
      });
    } catch (error) {
      console.error("Image upload failed", error);
      setError("Failed to upload image");
    }
  }
  console.log(formData);
  // console.log(`Product with id:${id}`, products)

  // Display loading state
  if (productStatus === 'loading') {
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
      <div className='md:p-4 p-2'>
        {/* Header of Product */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-2'>
            <IoMdAdd size={24} />
            <h2 className='md:text-2xl sm:text-lg test-base text-gray-900 font-medium'>Edit Product</h2>
          </div>
          <div className='block space-x-2'>
            <button
            onClick={() => navigate("/products")}
            type='buton'
              className='shadow-md min-w-24 bg-gray-100 text-gray-500 font-medium sm:text-base text-sm py-1.5 rounded-md border border-gray-200 cursor-pointer hover:bg-white/80 hover:-translate-y-1.5 transition ease-linear duration-200'>
              Cancel
            </button>
            <button
            type='submit'
              form='product-form'
              className='shadow-md bg-orange-400 text-white font-medium sm:text-base text-sm min-w-24 py-1.5 rounded-md border border-gray-200 cursor-pointer hover:bg-orange-500 hover:-translate-y-1.5 transition ease-linear duration-200'>
              Save
            </button>
          </div>
        </div>

        {/* Added Product Form */}
        <form className='p-3 mt-4 max-w-7xl max-sm:w-[450px]' id="product-form" onSubmit={handleOnSubmit} encType="multipart/form-data">
          <div className='flex md:flex-row flex-col space-x-6 w-[1300px] '>
            <div className='md:w-2/3 w-[450px] shadow-md p-4 rounded-lg space-y-4'>
              <h3 className='font-medium sm:text-lg text-base my-2'>General Information</h3>
              <hr className='text-gray-300 my-2' />
              <div className='flex flex-col space-y-2'>
                <label
                  className='font-medium sm:text-base text-[15px]'
                  htmlFor="title">Product Title</label>
                <input
                  type="text"
                  onChange={handleOnChange}
                  name="title"
                  className='border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-blue-500 focus:outline-1 placeholder:text-sm'
                  id="title"
                  placeholder='Product name...'
                  value={formData.title}
                />
              </div>
              <div className='space-y-2 w-full flex flex-col md:flex-row space-x-2'>
                <div className='flex flex-col md:w-1/2 w-full space-y-2'>
                  <label
                    className='font-medium sm:text-base text-[15px]'
                    htmlFor="price">Price</label>
                  <input
                    type="text"
                    onChange={handleOnChange}
                    name="price"
                    className='border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-blue-500 focus:outline-1 placeholder:text-sm'
                    id="price"
                    placeholder='$0.00'
                    value={formData.price}
                  />
                </div>
                <div className='flex flex-col md:w-1/2 w-full space-y-2'>
                  <label
                    className='font-medium sm:text-base text-[15px]'
                    htmlFor="stock">Stock</label>
                  <input
                    type="text"
                    onChange={handleOnChange}
                    name="stock"
                    className='border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-blue-500 focus:outline-1 placeholder:text-sm'
                    id="stock"
                    placeholder='0'
                    value={formData.stock}
                  />
                </div>
              </div>
              <div className='space-y-2 w-full flex flex-col md:flex-row space-x-2'>
                <div className='flex flex-col md:w-1/2 w-full space-y-2'>
                  <label
                    className='font-medium sm:text-base text-[15px]'
                    htmlFor="rating">Rating</label>
                  <input
                    type="text"
                    onChange={handleOnChange}
                    name="rating"
                    className='border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-blue-500 focus:outline-1 placeholder:text-sm'
                    id="rating"
                    placeholder='123'
                    value={formData.rating}
                  />
                </div>
                <div className='flex flex-col md:w-1/2 w-full space-y-2'>
                  <label
                    className='font-medium sm:text-base text-[15px]'
                    htmlFor="category_id">Category ID</label>
                  <select id='category_id' name='category_id' className='border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-blue-500 focus:outline-1 placeholder:text-sm' onChange={handleOnChange}
                  value={formData.category_id}
                  >
                    <option value="1">Apparel & Fashion</option>
                    <option value="2">Home & Kitchen</option>
                    <option value="3">Electronics</option>
                  </select>
                </div>
              </div>
              {error && <p className='text-center text-red-500 font-medium sm:text-base md:text-lg text-sm'>{error}</p>}
            </div>
            <div className='md:w-1/3 w-[450px] shadow-md p-3 rounded-lg h-80 max-sm:mt-15 mb-4'>
              <h3 className='font-medium sm:text-lg text-base my-2'>Product Image</h3>
              <hr className='text-gray-300 my-2' />
              <div className='flex flex-col w-full space-y-2'>
                <label
                  className='font-medium sm:text-base text-[15px]'
                  htmlFor="images"
                >
                  Images
                </label>
                <div className='border border-dashed border-gray-300 rounded-lg px-2 py-1.5 focus:outline-blue-500 focus:outline-1 placeholder:text-sm h-44 w-[400px] flex flex-col justify-center items-center space-x-2 hover:text-blue-500 cursor-pointer'>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    name="images"
                    className='hidden'
                    id="images"
                  />
                  <FiUpload size={24} />
                  <label htmlFor="images">Click or Drag to Upload</label>
                  {formData.image && <span className="text-xs text-blue-500 font-medium pt-2 truncate max-w-full">{formData.image} selected</span>}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductForm