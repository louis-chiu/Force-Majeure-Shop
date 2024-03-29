import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import productReducer, {
  extendedApiSlice as productApi,
} from './features/product/productSlice';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import { extendedApiSlice as authApi } from './features/auth/authSlice';
import { extendedApiSlice as orderApi } from './features/order/orderSlice';
import { extendedApiSlice as checkoutApi } from './features/checkout/checkoutSlice';
import cartItemReducer from './features/cartItem/cartItemSlice';
import filterReducer from './features/filter/filterSlice';
import bannerSliderReducer from './features/slider/bannerSliderSlice';
import singleProductSliderReducer from './features/slider/singleProductSliderSlice';
import accordionReducer from './features/accordion/accordionSlice';

export const store = configureStore({
  reducer: {
    accordion: accordionReducer,
    singleProductSlider: singleProductSliderReducer,
    bannerSlider: bannerSliderReducer,
    filter: filterReducer,
    cartItem: cartItemReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);
