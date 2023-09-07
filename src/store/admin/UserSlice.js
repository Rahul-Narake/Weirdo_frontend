import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  data: [],
  user: {},
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isLoggedIn = false;
    },
    doLogin: (state, action) => {
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoggedIn = true;
          localStorage.setItem('auth-token', action.payload.token);
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })

      .addCase(login.rejected, (state, action) => {
        toast.error('Something went wrong');
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })

      .addCase(getCurrentUser.rejected, (state, action) => {
        toast.error('Something went wrong');
      });
  },
});

export const login = createAsyncThunk('user/post', async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    toast.error(error.message);
  }
});

export const getCurrentUser = createAsyncThunk('user/currentUser', async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/current`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    toast.error(error.message);
  }
});

export const { logout, doLogin } = userSlice.actions;
export default userSlice.reducer;
