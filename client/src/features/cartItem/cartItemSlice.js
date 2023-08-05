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
  isAddToCart: false,
};

const cartItemSlice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    resetCartItem: (state, action) => {
      const product = action.payload;
      state.name = product.name;
      state.image = product.image[0];
      state.price = parseInt(product.price);
      state.color = product.color[0].name;
      state.size = product.size[0];
      state.id = product.id;
      state.amount = 1;
    },
    setColor: (state, action) => {
      const product = action.payload;
      state.color = product.color;
    },
    setSize: (state, action) => {
      const product = action.payload;
      state.size = product.size;
    },
    setStock: (state, action) => {
      const product = action.payload;
      state.stock = product.stock;
    },
    addAmount: (state) => {
      if (state.amount < state.stock) {
        state.amount += 1;
      }
    },
    subtractAmount: (state) => {
      if (state.amount > 1) {
        state.amount -= 1;
      }
    },
    resetAmount: (state) => {
      state.amount = 1;
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
