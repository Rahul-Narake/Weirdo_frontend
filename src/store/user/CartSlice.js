import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increseQuantity: (state, action) => {
      const items = state.cartItems;
      const newCartItems = items.map((cartItem, index) => {
        if (cartItem.productId === action.payload) {
          cartItem.quantity = cartItem.quantity + 1;
        }
        return cartItem;
      });
      state.cartItems = newCartItems;
    },

    decreseQuantity: (state, action) => {
      const items = state.cartItems;
      const newCartItems = items.map((cartItem, index) => {
        if (cartItem.productId === action.payload) {
          if (cartItem.quantity !== 0)
            cartItem.quantity = cartItem.quantity - 1;
        }
        return cartItem;
      });
      state.cartItems = newCartItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.cartItems = action.payload.cartItems;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        toast.error('Something went wrong');
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.cartItems = action.payload.cartItems;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getCartItems.rejected, (state, action) => {
        toast.error('Something went wrong');
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.cartItems = action.payload.cartItems;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        toast.error('something went wrong');
      });
  },
});

export const addToCart = createAsyncThunk('cart/add', async (cart) => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
      body: JSON.stringify(cart),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    toast.error(error.message);
  }
});

export const getCartItems = createAsyncThunk('cart/get', async () => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
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

export const removeCartItem = createAsyncThunk(
  'cart/remove',
  async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${productId}`, {
        method: 'Delete',
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

export const { increseQuantity, decreseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
