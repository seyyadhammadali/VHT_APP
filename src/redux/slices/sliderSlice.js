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

export const fetchSafariSliders = createAsyncThunk(
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
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeSliders.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchHomeSliders.fulfilled, (state, action) => {
        state.sliders = action.payload.data || [];
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(fetchHomeSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const sliderStatus = (state) => state.slider.status;
export default sliderSlice.reducer; 