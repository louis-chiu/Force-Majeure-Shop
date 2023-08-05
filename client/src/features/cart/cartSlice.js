import { createSlice, current } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const initialState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const cartItem = action.payload;
      if (cartItem.amount < 1) return;

      const existedCartItem = state.cart.find(
        (item) =>
          item.id === cartItem.id &&
          item.color === cartItem.color &&
          item.size === cartItem.size
      );

      if (existedCartItem !== undefined) {
        if (existedCartItem.amount + cartItem.amount > existedCartItem.stock) {
          existedCartItem.amount = cartItem.stock;
        } else {
          existedCartItem.amount += cartItem.amount;
          existedCartItem.totalPrice = cartItem.amount * cartItem.price;
          state.totalPrice += existedCartItem.totalPrice;
        }
      } else {
        cartItem.totalPrice = cartItem.amount * cartItem.price;
        state.cart.push(cartItem);
        state.totalPrice += cartItem.totalPrice;
      }
    },
    removeItem: (state, action) => {
      const { id, color, size } = action.payload;
      const { amount, price } = state.cart.find(
        (cartItem) =>
          cartItem.id === id &&
          cartItem.color === color &&
          cartItem.size === size
      );
      state.totalPrice -= amount * price;
      state.cart = state.cart.filter(
        (cartItem) =>
          cartItem.id !== id ||
          cartItem.color !== color ||
          cartItem.size !== size
      );
    },
    clearItems: (state) => {
      return { ...initialState };
    },
    addItemAmount: (state, action) => {
      const cartItem = action.payload;

      const existedCartItem = state.cart.find(
        (item) =>
          item.id === cartItem.id &&
          item.color === cartItem.color &&
          item.size === cartItem.size
      );

      if (existedCartItem.amount < existedCartItem.stock) {
        existedCartItem.amount += 1;
        existedCartItem.totalPrice += existedCartItem.price;
        state.totalPrice += existedCartItem.price;
      }
    },
    subtractItemAmount: (state, action) => {
      const cartItem = action.payload;
      const existedCartItem = state.cart.find(
        (item) =>
          item.id === cartItem.id &&
          item.color === cartItem.color &&
          item.size === cartItem.size
      );

      if (existedCartItem.amount > 1) {
        existedCartItem.amount -= 1;
        existedCartItem.totalPrice -= existedCartItem.price;
        state.totalPrice -= existedCartItem.price;
      }
    },
  },
});
export const {
  addItem,
  clearItems,
  removeItem,
  addItemAmount,
  subtractItemAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
