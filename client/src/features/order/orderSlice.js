import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderByUserId: builder.query({
      providesTags: ['Orders'],
      query: (id) => `user/${id}/order`,
    }),
    getOrderById: builder.query({
      providesTags: ['Order'],
      query: (id) => `order/${id}`,
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: 'order',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrderByUserIdQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = extendedApiSlice;
