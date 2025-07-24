import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunk to fetch home sliders
export const fetchHomeSliders = createAsyncThunk(
  'slider/fetchHomeSliders',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('sliders?type=home');
    
      return res.data;
    } catch (err) {
      // console.log('Home Sliders Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchSafariSliders = createAsyncThunk(
  'slider/fetchSafariSliders',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('sliders?type=safari');
      
      return res.data;
    } catch (err) {
      console.log('Home Sliders Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchHolidayDeals = createAsyncThunk(
  'slider/fetchHolidayDeals',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('sliders?type=holiday-deal');
      return res.data;
    } catch (err) {
      console.log('Holiday Deal Sliders Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    sliders: [],
     safariSliders: [],
    holidayDeals: [],
    loading: false,
    error: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
//   extraReducers: (builder) => {

//     builder
//       .addCase(fetchHomeSliders.pending, (state) => {
//         state.loading = true;
//         state.status = 'loading';
//       })
//       .addCase(fetchHomeSliders.fulfilled, (state, action) => {
//         state.sliders = action.payload.data || [];
//         state.loading = false;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchHomeSliders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.status = 'failed';
//       });
//   },
// });

// export const sliderStatus = (state) => state.slider.status;
// export default sliderSlice.reducer;
extraReducers: (builder) => {
    // Home sliders
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

    // Safari sliders
    builder
      .addCase(fetchSafariSliders.fulfilled, (state, action) => {
        state.safariSliders = action.payload.data || [];
      });

    // Holiday deal sliders
    builder
      .addCase(fetchHolidayDeals.fulfilled, (state, action) => {
        state.holidayDeals = action.payload.data || [];
      });
  },
});
// Selectors
export const sliderStatus = (state) => state.slider.status;
export const selectHomeSliders = (state) => state.slider.sliders;
export const selectSafariSliders = (state) => state.slider.safariSliders;
export const selectHolidayDeals = (state) => state.slider.holidayDeals;

export default sliderSlice.reducer;