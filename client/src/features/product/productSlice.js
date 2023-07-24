import { apiSlice } from '../api/apiSlice';

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
