import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import productSlice, {
  extendedApiSlice as productApi,
} from './features/product/productSlice';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import { extendedApiSlice as userApi } from './features/user/userSlice';
import cartItemSlice from './features/cartItem/cartItemSlice';

export const store = configureStore({
  reducer: {
    cartItem: cartItemSlice,
    product: productSlice,
    user: userReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);
