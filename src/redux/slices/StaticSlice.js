import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchStaticData = createAsyncThunk(
  'static/fetchStaticData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('site_settings'); // Adjust endpoint if needed
      
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const staticSlice = createSlice({
  name: 'static',
  initialState: {
    data: null,
    loading: false,
    error: null,
      status: 'idle', 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaticData.pending, (state) => {
         state.status = 'loading'; 
        state.loading = true;
      })
      .addCase(fetchStaticData.fulfilled, (state, action) => {
           state.status = 'succeeded';
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchStaticData.rejected, (state, action) => {
         state.status = 'failed'; 
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectStaticData = (state) => state.static.data;
export const selectStaticLoading = (state) => state.static.loading;
export const selectStaticError = (state) => state.static.error;
export const selectStaticStatus = (state) => state.static.status;

export default staticSlice.reducer; 