import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://63188c25f6b281877c6f8a4b.mockapi.io' }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => '/contacts',
            providesTags: ['Contact'],
        }),
        addContact: builder.mutation({
            query: (newContact) => ({
                url: '/contacts',
                method: 'POST',
                body: newContact,  
            }),
            invalidatesTags: ['Contact'],
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
    }),
});

export const { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation } = api;