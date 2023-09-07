import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import CategorySlice from './CategorySlice';
import ProductSlice from './ProductSlice';
import CartSlice from './CartSlice';
import OrderSlice from './OrderSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
    category: CategorySlice,
    product: ProductSlice,
    cart: CartSlice,
    order: OrderSlice,
  },
});

export default store;
