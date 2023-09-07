import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  orders: [],
};

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.orders = action.payload.orders;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getOrders.rejected, (state, action) => {
        toast.error('something went wrong');
      });
  },
});

export const getOrders = createAsyncThunk('orders/get', async () => {
  try {
    const response = await fetch(`${BASE_URL}/order/`, {
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

export const {} = OrderSlice.actions;
export default OrderSlice.reducer;
