import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rvq7c13gf9.execute-api.ap-northeast-1.amazonaws.com/api/',
  }),
  endpoints: (builder) => ({}),
});
