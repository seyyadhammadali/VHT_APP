import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Fetch All Blog Posts
export const fetchAllPosts = createAsyncThunk(
  'blogs/fetchAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('posts'); // Adjust endpoint if needed
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch Single Blog Post
export const fetchSinglePost = createAsyncThunk(
  'blogs/fetchSinglePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.get('single_post?id=${postId}'); // Adjust endpoint if needed
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    allPosts: [],
    singlePost: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Posts
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.allPosts = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Post
      .addCase(fetchSinglePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.singlePost = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.blogs.allPosts;
export const selectSinglePost = (state) => state.blogs.singlePost;
export const selectBlogsLoading = (state) => state.blogs.loading;
export const selectBlogsError = (state) => state.blogs.error;

export default blogSlice.reducer; 