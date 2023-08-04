import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import productReducer, {
  extendedApiSlice as productApi,
} from './features/product/productSlice';
import userReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import { extendedApiSlice as authApi } from './features/auth/authSlice';
import cartItemReducer from './features/cartItem/cartItemSlice';
import filterReducer from './features/filter/filterSlice';
import bannerSliderReducer from './features/slider/bannerSliderSlice';
import singleProductSliderReducer from './features/slider/singleProductSliderSlice';

export const store = configureStore({
  reducer: {
    singleProductSlider: singleProductSliderReducer,
    bannerSlider: bannerSliderReducer,
    filter: filterReducer,
    cartItem: cartItemReducer,
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);
