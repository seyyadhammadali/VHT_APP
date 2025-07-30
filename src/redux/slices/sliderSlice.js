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
export const fetchHolidayHotlist = createAsyncThunk(
  'slider/fetchHolidayHotlist',
  async (_, thunkAPI) => {
    try {
      // Assuming the API endpoint for holiday hotlist is 'sliders?type=holiday-hotlist'
      // Adjust 'holiday-hotlist' if your backend uses a different type.
      const res = await api.get('sliders?type=holiday-hotlist');
      return res.data;
    } catch (err) {
      console.log('Holiday Hotlist Sliders Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
// Async thunk to fetch Maldives sliders
export const fetchMaldivesSliders = createAsyncThunk(
  'slider/fetchMaldivesSliders',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('sliders?type=maldives');
      return res.data;
    } catch (err) {
      // You can handle errors more gracefully here, e.g., using a toast
      console.error('Maldives Sliders Error:', err.message);
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
     holidayHotlist: [],
      maldivesSliders: [],
    loading: false,
    error: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},

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
         builder
      .addCase(fetchHolidayHotlist.pending, (state) => {
        // You can add specific loading state for hotlist if needed,
        // or just rely on the general 'status' and 'loading'
      })
      .addCase(fetchHolidayHotlist.fulfilled, (state, action) => {
        state.holidayHotlist = action.payload.data || [];
      })
      .addCase(fetchHolidayHotlist.rejected, (state, action) => {
        // Handle error for holiday hotlist if needed
        console.error('Failed to fetch Holiday Hotlist:', action.payload);
      });
         builder
      .addCase(fetchMaldivesSliders.pending, (state) => {
        // Optional: add a specific loading state for maldivesSliders if needed
      })
      .addCase(fetchMaldivesSliders.fulfilled, (state, action) => {
        state.maldivesSliders = action.payload.data || [];
      })
      .addCase(fetchMaldivesSliders.rejected, (state, action) => {
        console.error('Failed to fetch Maldives Sliders:', action.payload);
      });
  },
});
// Selectors
export const sliderStatus = (state) => state.slider.status;
export const selectHomeSliders = (state) => state.slider.sliders;
export const selectSafariSliders = (state) => state.slider.safariSliders;
export const selectHolidayDeals = (state) => state.slider.holidayDeals;
export const selectHolidayHotlist = (state) => state.slider.holidayHotlist;
export const selectMaldivesSliders = (state) => state.slider.maldivesSliders;

export default sliderSlice.reducer;