import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  products: [],
  last: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.products = action.payload.products;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        toast.error('Something went wrong');
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.products = action.payload.products;
          state.last = action.payload.last;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        toast.error('Something went wrong');
      })
      .addCase(getProductsByFilter.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.products = action.payload.products;
          if (action.payload.products.length > 0) {
            toast.success(action.payload.message);
          } else {
            toast.success('Products not available with this filter');
          }
        }
      })
      .addCase(getProductsByFilter.rejected, (state, action) => {
        toast.error('Something went wrong');
      });
  },
});

export const getProducts = createAsyncThunk('product/get', async () => {
  try {
    const response = await fetch(`${BASE_URL}/product/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    toast.error(error.message);
  }
});

export const getProductsByCategory = createAsyncThunk(
  'product/getByCategory',
  async (data) => {
    try {
      const response = await fetch(
        `${BASE_URL}/product/${data.category}?page=${data.page}&limit=4`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          },
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const getProductsByFilter = createAsyncThunk(
  'product/getByFilter',
  async (filter) => {
    console.log(filter);
    try {
      const response = await fetch(`${BASE_URL}/product/filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({
          category: filter.category,
          colors: filter.colors,
          sizes: filter.sizes,
          prices: filter.prices,
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const {} = productSlice.actions;
export default productSlice.reducer;
