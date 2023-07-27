import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const initialState = {
  cart: [
    {
      id: 1,
      name: 'Crewneck',
      size: 'S',
      unitPrice: 399,
      amount: 1,
      totalPrice: 399,
    },
  ],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product } = action;
      product.totalPrice = amount * unitPrice;
      state.push(product);
      state.totalPrice += product.totalPrice;
    },
  },
});
export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
