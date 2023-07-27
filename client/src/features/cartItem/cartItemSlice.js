import { useSelector } from 'react-redux';
import { apiSlice } from '../api/apiSlice';

import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  name: '',
  price: 0,
  color: '',
  amount: 0,
  size: '',
  stock: 0,
  image: [],
};

const cartItemSlice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    resetCartItem: (state, action) => {
      const { payload: product } = action;
      return { ...initialState, ...product, amount: 0 };
    },
    setColor: (state, action) => {
      const { payload: product } = action;
      state.color = product.color;
    },
    setSize: (state, action) => {
      const { payload: product } = action;
      state.size = product.size;
    },
    setStock: (state, action) => {
      const { payload: product } = action;
      state.stock = product.stock;
    },
    addAmount: (state) => {
      if (state.amount < state.stock) {
        state.amount += 1;
      }
    },
    subtractAmount: (state) => {
      if (state.amount > 0) {
        state.amount -= 1;
      }
    },
    resetAmount: (state) => {
      state.amount = 0;
    },
  },
});
export const {
  resetCartItem,
  addAmount,
  subtractAmount,
  setColor,
  setSize,
  setStock,
  resetAmount,
} = cartItemSlice.actions;
export default cartItemSlice.reducer;
