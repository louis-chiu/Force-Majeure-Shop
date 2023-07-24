import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const initialState = {
  memberAccount: '',
  memberData: {},
  orderHistory: {},
  isLoading: true,
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { payload } = action;

      state.memberAccount = payload.email;
      state.memberData = payload;
      state.isLoading = false;
      state.isLogin = true;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// rtk query
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation } = extendedApiSlice;
export const selectLoginResult = extendedApiSlice.endpoints.login.select();
