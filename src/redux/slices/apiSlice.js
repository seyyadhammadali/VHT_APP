import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // key in store
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.viriksonholidays.co.uk/ci-admin/index.php/access/app/v1', // change to your API base URL
    prepareHeaders: (headers) => {
      // const token = getState().auth?.token; // if you have authentication
      const token = 'gsa*6dt3@72t&6dtuy6R$^gjff'; // if you have authentication
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['StaticData', 'Destinations', 'Faqs', 'Pages','FormSubmission', 'Posts', 'Comments'], // helpful for cache invalidation
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

    // Fetch Faqs
    getFaqs: builder.query({
      query: () => '/faqs?length=10',
      providesTags: ['Faqs'],
    }),
    
    // Fetch Reviews
    getReviews: builder.query({
      query: () => '/reviews',
      providesTags: ['Reviews'],
    }),

    // Fetch Faqs
    getYoutubeVideos: builder.query({
      query: () => '/youtube_videos',
      providesTags: ['YoutubeVideos'],
    }),

    // Example: Fetch single user by ID
    // getUserById: builder.query({
    //   query: (id) => `/users/${id}`,
    //   providesTags: ['User'],
    // }),



    // FormSubmission
    formSubmission: builder.mutation({
      query: (formData) => ({
        url: '/enquire_form',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['FormSubmission'],
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetStaticDataQuery,
  useGetDestinationsQuery,
  useGetPagesQuery,
  useGetFaqsQuery,
  useGetYoutubeVideosQuery,
  useGetReviewsQuery,
  useFormSubmissionMutation,
  // useGetUserByIdQuery,
  // useGetPostsQuery,
  // useAddPostMutation,
} = apiSlice;
