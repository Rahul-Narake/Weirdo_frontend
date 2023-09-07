import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
    });
  },
});

export const getCategories = createAsyncThunk('category/get', async () => {
  try {
    const response = await fetch(`${BASE_URL}/category`, {
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

export const {} = categorySlice.actions;
export default categorySlice.reducer;
