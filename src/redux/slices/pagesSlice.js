import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Get All Pages
export const fetchAllPages = createAsyncThunk(
  'pages/fetchAllPages',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('pages');
      console.log('All Pages Response:', res.data);
      return res.data;
    } catch (err) {
      console.log('All Pages Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
// Get Single Page
export const fetchSinglePage = createAsyncThunk(
  'pages/fetchSinglePage',
  async (id, thunkAPI) => {
    try {
      const res = await api.get('single_page?slug=destinations');
      console.log('Single Page Response:====================-----singleeeeeeeeee', res.data);
      return res.data;
    } catch (err) {
      console.log('Single Page Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchSingleCruisePage = createAsyncThunk(
  'pages/fetchSingleCruisePage',
  async (id, thunkAPI) => {
    try {
      const res = await api.get('single_page?slug=cruise');
      console.log('Single Page Response:====================-----singleeeeeeeeee', res.data);
      return res.data;
    } catch (err) {
      console.log('single_page?slug=cruise Page Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    all: [],
    singlePage: [],
     singleCruisePage: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All Pages
      .addCase(fetchAllPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPages.fulfilled, (state, action) => {
        state.all = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Single Page
      .addCase(fetchSinglePage.pending, (state) => {
        state.loading = true;
      })
     .addCase(fetchSinglePage.fulfilled, (state, action) => {
  state.singlePage = action.payload.data; // not entire payload
  state.loading = false;
})

      .addCase(fetchSinglePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       // 🚢 Single Cruise Page
      .addCase(fetchSingleCruisePage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleCruisePage.fulfilled, (state, action) => {
        state.singleCruisePage = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchSingleCruisePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pagesSlice.reducer;

// Selectors for Cruise.js
export const selectSingleCruisePage = (state) => state.pages.singleCruisePage;
export const selectPagesLoading = (state) => state.pages.loading; 