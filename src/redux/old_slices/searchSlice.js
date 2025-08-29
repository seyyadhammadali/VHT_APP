// redux/slices/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios'; // Assuming this 'api' instance has your base URL configured

// Async Thunk for fetching search packages
export const fetchSearchPackages = createAsyncThunk(
  'search/fetchSearchPackages',
  async (keyword, { rejectWithValue }) => {
    try {
      // FIX THIS LINE: Change single quotes to backticks (`)
      const response = await api.get(`search_packages?keyword=${keyword}`); // Added a leading slash just in case your axios instance doesn't add it
      
      console.log('API Request URL:', `search_packages?keyword=${keyword}`); // Log the actual URL
      console.log('API Response Data:', response.data); // Log the full response data

      // The actual data you want to store in searchResults is within response.data.data
      // because your API response has a 'data' key that holds the array of packages.
      return response.data.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        // Log the full error response for debugging
        console.error('API Error Response:', error.response.data);
        return rejectWithValue(error.response.data.message || 'An API error occurred');
      }
      console.error('Network or unknown error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    loading: false,
    error: null,
    searchKeyword: '', // To store the last searched keyword
  },
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchPackages.fulfilled, (state, action) => {
        state.loading = false;
        // The payload (action.payload) now contains the actual array of packages
        state.searchResults = action.payload; 
        state.error = null;
      })
      .addCase(fetchSearchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchResults = [];
      });
  },
});

export const { setSearchKeyword, clearSearchResults } = searchSlice.actions;

export const selectSearchResults = (state) => state.search.searchResults;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;
export const selectSearchKeyword = (state) => state.search.searchKeyword;

export default searchSlice.reducer;