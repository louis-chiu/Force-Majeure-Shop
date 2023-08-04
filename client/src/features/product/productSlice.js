import { apiSlice } from '../api/apiSlice';

import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  productList: [],
  isFirst: true,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const {
        payload: { products },
      } = action;
      state.productList = products;
      state.isFirst = false;
    },
  },
});

export const { setProducts, findProductsByKeyword, setKeyword } =
  productSlice.actions;
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
    getProductsByFilter: builder.query({
      query: ({ keyword, sortBy, ascOrDesc }) => {
        let queryString = 'products?';
        if (keyword) {
          queryString += `keyword=${keyword}&`;
        }
        if (sortBy) {
          queryString += `sortBy=${sortBy}&`;
          queryString += `ascOrDesc=${ascOrDesc}`;
        }

        return queryString;
      },
      // onQueryStarted: (arg) => {
      // },
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetProductsByFilterQuery,
} = extendedApiSlice;
// export const selectProductsResult =
//   extendedApiSlice.endpoints.getProducts.select();
// export const selectProductResult =
//   extendedApiSlice.endpoints.getProductById.select();
