import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  selectedItem: null
};

// Implement on fetch all products
export const fetchProduct = createAsyncThunk('/products/fetchProduct', async (_, thunkAPI) => {
  try {
    const res = await axios.get('http://localhost:3001/api/products');
    
    if(!res) return console.log('Unable to receive data');

    return res.data.data;
  } catch (error) {
    console.log('Error on fetched data: ',error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetch data failed");
  }
});

// Implement on fetch product by id
export const fetchProductById = createAsyncThunk('/products/fetchProductById', async (id, thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/products/${id}`);

    if(!res) return console.log(`Product with id:${id} not exists`);

    return res.data.data;
  } catch (error) {
    console.log('Error on fetched product by id: ',error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || `Unable to fetch product with id:${id}`);
  }
});

// Implement on fetch product detail by id
export const fetchProductDetailById = createAsyncThunk('/products/fetchProductDetailById', async (id, thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/products/detail/${id}`);

    if(!res) return console.log(`Product detail with id:${id} not exists`);

    return res.data.data;
  } catch (error) {
    console.log('Erorr on fetched product detail by id: ',error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || `Unable to fetch product detail with id:${id}`);
  }
});
// Implement on create product
export const createProduct = createAsyncThunk('/products/createProduct', async (productData, thunkAPI) => {

  try {
    const res = await axios.post('http://localhost:3001/api/products', productData);

    if(!res) return console.log('Unable to create new product!');

    return res.data.data;
  } catch (error) {
    console.log('Erorr create product: ',error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Create failed");
  }
  
});

// Implement on update product by using id
export const updateProduct = createAsyncThunk('/products/updateProduct', async (payload, thunkAPI) => {
  try {
    // 1. Destructure the ID from the payload for the URL
    const id = payload.id;

    // 2. Separate the ID from the rest of the data for the request body
    const {id: _, ...productData} = payload;
    
    const res = await axios.put(`http://localhost:3001/api/products/${id}`, productData);

    if(!res) return console.log('Unable to update products');

    return res.data.data;

  } catch (error) {
    console.log('Erorr updated product: ',error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Update failed");
  }
});

// Implement on delete products by using id
export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id, thunkAPI) => {
  try {
    const res = await axios.delete(`http://localhost:3001/api/products/${id}`);

    if(!res) return console.log(`Product with id: ${id} not exists`);
    
    return res.data;
    
  } catch (error) {
    console.log('Error delete product: ', error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
  }
})

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProduct.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch by id
      .addCase(fetchProductById.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedItem = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch Product detail by id
      .addCase(fetchProductDetailById.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchProductDetailById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedItem = action.payload;
      })
      .addCase(fetchProductDetailById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Find index of product to update
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        // Assign new data to product index
        if(index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
})

export default productSlice.reducer;
export const selectAllProducts = (state) => state.products.items;
export const selectProductStatus = (state) => state.products.status;
export const selectProductById = (state) => state.products.selectedItem;