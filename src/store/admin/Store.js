import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import CategorySlice from './CategorySlice';
import ProductSlice from './ProductSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
    category: CategorySlice,
    product: ProductSlice,
  },
});

export default store;
