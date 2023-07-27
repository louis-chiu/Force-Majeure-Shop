import { apiSlice } from '../api/apiSlice';

import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});
export const {} = productSlice.actions;
export default productSlice.reducer;

// rtk query
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getProducts: builder.query({
      query: () => 'products',
    }),
  }),
});

export const { useGetProductByIdQuery, useGetProductsQuery } = extendedApiSlice;
// export const selectProductsResult =
//   extendedApiSlice.endpoints.getProducts.select();
// export const selectProductResult =
//   extendedApiSlice.endpoints.getProductById.select();
