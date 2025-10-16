  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
  import axios from "axios";

  // InitialState
  const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    status: 'idle',
    error: null,
  }

  // Implement on login user API
  export const loginUser = createAsyncThunk(
    '/auth/login', async ({email, password}, thunkAPI) => {
      try {
        // Send request to API to login
        const res = await axios.post(`http://localhost:3001/api/user/login`, {
          email,
          password
        });

        // console.log("Login response:", res.data.data);

        const {user, token} = res.data.data;
        // If res is not present 
        // if(!user) return console.log('Login is not successfully!');

        if (!token) {
          // Properly reject with a string error
          return thunkAPI.rejectWithValue("No token received from backend");
        }

        // Set token when received from backend
        localStorage.setItem("token", token);
        // Return data
        return {user, token};
      } catch (error) {
        console.log(error);
        throw new Error("Couldn't be fetch from the backend source. (Please double check your spelling or maybe resource is not exist)");
      }
    }
  );

  // Implement on register user
  export const registerUser = createAsyncThunk(
    '/auth/register', async ({username, email, password}, thunkAPI) => {
      try {
        // Send request to API to create user
        const res = await axios.post('http://localhost:3001/api/user/register', {
          username,
          email,
          password
        });

        if(!res) return console.log('Unable to create new user');
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
        throw new Error("Couldn't be fetch from the backend source. (Please double check your spelling or maybe resource is not exist)");
      }
    }
  )

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      // logout
      logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        state.error = null;
        state.status = 'idle';
      }
    },
    // Performance with fetch data
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.error = null;
          state.status = 'loading';
        })

        .addCase(loginUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload.user;
          state.token = action.payload.token;
        })

        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload;
          state.status = 'failed';
        })

        .addCase(registerUser.pending, (state) => {
          state.error = null;
          state.status = 'loading';
        })

        .addCase(registerUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload.user;
        })

        .addCase(registerUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
    }
  });

  // Export function or reducers to use in another place.
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;
  export const selectUserLogin = (state) => state.auth.user;
  export const selectUserRegister = (state) => state.auth.user;
  export const selectAuthStatus = (state) => state.auth.status;
  export const selectAuthError = (state) => state.auth.erorr;