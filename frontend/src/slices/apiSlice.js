import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', 
    prepareHeaders: (headers, { getState }) => {
        const state=getState();
        console.log('Current State:', state); 
      const token = getState().auth.userInfo?.token;
      console.log(localStorage.getItem('userInfo'));

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({
  }),
});

