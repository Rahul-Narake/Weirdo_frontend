import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      }
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.products = action.payload.products;
      }
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      toast.error(action.payload.error);
    });
    builder.addCase(changeStatus.fulfilled, (state, action) => {
      if (action.payload.success) {
        const updatedProducts = state.products.map((product) => {
          if (product._id === action.payload._id) {
            product.active = product.active === true ? false : true;
          }
          return product;
        });
        state.products = updatedProducts;
        toast.success(action.payload.message);
      }
    });
    builder.addCase(changeStatus.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      if (action.payload.success) {
        const newProducts = state.products.filter((product) => {
          return product._id !== action.payload._id;
        });
        state.products = newProducts;
        toast.success(action.payload.message);
      }
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
  },
});

export const addProduct = createAsyncThunk(
  'product/add',
  async (product, image) => {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('image', image);

      const response = await fetch(`${BASE_URL}/api/product/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: formData,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const getProducts = createAsyncThunk('product/get', async (category) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/product/category/${category}`,
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
});

export const changeStatus = createAsyncThunk(
  'product/changeStatus',
  async (_id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/product/${_id}`, {
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
  }
);

export const removeProduct = createAsyncThunk(
  'product/removeProduct',
  async (_id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/product/${_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
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
