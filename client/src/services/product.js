import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 透過 createApi 可以建立 RTK query 的 API service，取名為 pokemonApi
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://chiu.hopto.org/api/' }),
  endpoints: (builder) => ({
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

// pokemonApi 會帶有 useGetPokemonByNameQuery 的方法，可以直接呼叫
export const { useGetProductByIdQuery } = productApi;
