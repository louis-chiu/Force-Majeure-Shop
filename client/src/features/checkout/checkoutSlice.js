import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (linePayBody) => ({
        url: 'line-pay/checkout',
        method: 'POST',
        body: linePayBody,
      }),
    }),
  }),
});

export const { useCheckoutMutation } = extendedApiSlice;
