import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunk to fetch home sliders
export const fetchHomeSliders = createAsyncThunk(
  'slider/fetchHomeSliders',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('sliders?type=home');
      console.log('Home Sliders Response890-897890-===============9989898===================:', res?.data);
      return res.data;
    } catch (err) {
      console.log('Home Sliders Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    sliders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeSliders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeSliders.fulfilled, (state, action) => {
        state.sliders = action.payload.data || [];
        state.loading = false;
      })
      .addCase(fetchHomeSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sliderSlice.reducer; 