import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // key in store
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.viriksonholidays.co.uk/ci-admin/index.php/access/app/v1', // change to your API base URL
    prepareHeaders: (headers) => {
      // const token = getState().auth?.token; // if you have authentication
      const token = 'gsa*6dt3@72t&6dtuy6R$^gjff'; // if you have authentication
      if (token) headers.set('Authorization', `Bearer ${token}`);
      console.log("call",headers);
      
      return headers;
    },
  }),
  tagTypes: ['StaticData', 'Destinations', 'Pages', 'Posts', 'Comments'], // helpful for cache invalidation
  endpoints: (builder) => ({
    // Example: Fetch all Static data
    getStaticData: builder.query({
      query: () => '/site_settings',
      providesTags: ['StaticData'],
    }),

    // Fetch all destinations
    getDestinations: builder.query({
      query: () => '/all_destinations',
      providesTags: ['Destinations'],
    }),

    // Fetch All Pages
    getPages: builder.query({
      query: () => '/pages',
      providesTags: ['Pages'],
    }),

    // Example: Fetch single user by ID
    // getUserById: builder.query({
    //   query: (id) => `/users/${id}`,
    //   providesTags: ['User'],
    // }),

    // // Example: Fetch posts
    // getPosts: builder.query({
    //   query: () => '/posts',
    //   providesTags: ['Posts'],
    // }),

    // // Example: Add new post
    // addPost: builder.mutation({
    //   query: (newPost) => ({
    //     url: '/posts',
    //     method: 'POST',
    //     body: newPost,
    //   }),
    //   invalidatesTags: ['Posts'],
    // }),
  }),
});

// Auto-generated hooks
export const {
  useGetStaticDataQuery,
  useGetDestinationsQuery,
  useGetPagesQuery,
  // useGetUserByIdQuery,
  // useGetPostsQuery,
  // useAddPostMutation,
} = apiSlice;
