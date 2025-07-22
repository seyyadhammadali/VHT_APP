import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchHolidayPackages = createAsyncThunk(
  'pakages/fetchHolidayPackages',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('packages_by_page?slug=holiday-deal');
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchMultiCenterDeals = createAsyncThunk(
  'pakages/fetchMultiCenterDeals',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('packages_by_page?slug=multi-centre-holidays');
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchCruisePackages = createAsyncThunk(
  'pakages/fetchCruisePackages',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('packages_by_page?slug=cruise');
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Async thunk to fetch safari packages
export const fetchSafariPackages = createAsyncThunk(
  'packages/fetchSafariPackages',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('packages_by_page?slug=safari');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  holidayPackages: [],
  holidayPackagesStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  multiCenterDeals: [],
  multiCenterDealsStatus: 'idle',
  cruisePackages: [],
  cruisePackagesStatus: 'idle',
  safariPackages: [],
  safariPackagesStatus: 'idle',
  loading: false, // (optional: can be removed if you use status fields)
  error: null,
};

const pakagesSlice = createSlice({
  name: 'pakages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Holiday Packages
      .addCase(fetchHolidayPackages.pending, (state) => {
        state.holidayPackagesStatus = 'loading';
      })
      .addCase(fetchHolidayPackages.fulfilled, (state, action) => {
        state.holidayPackages = action.payload;
        state.holidayPackagesStatus = 'succeeded';
      })
      .addCase(fetchHolidayPackages.rejected, (state, action) => {
        state.holidayPackagesStatus = 'failed';
        state.error = action.payload;
      })
      // Multi-Center Deals
      .addCase(fetchMultiCenterDeals.pending, (state) => {
        state.multiCenterDealsStatus = 'loading';
      })
      .addCase(fetchMultiCenterDeals.fulfilled, (state, action) => {
        state.multiCenterDeals = action.payload;
        state.multiCenterDealsStatus = 'succeeded';
      })
      .addCase(fetchMultiCenterDeals.rejected, (state, action) => {
        state.multiCenterDealsStatus = 'failed';
        state.error = action.payload;
      })
      // Cruise Packages
      .addCase(fetchCruisePackages.pending, (state) => {
        state.cruisePackagesStatus = 'loading';
      })
      .addCase(fetchCruisePackages.fulfilled, (state, action) => {
        state.cruisePackages = action.payload;
        state.cruisePackagesStatus = 'succeeded';
      })
      .addCase(fetchCruisePackages.rejected, (state, action) => {
        state.cruisePackagesStatus = 'failed';
        state.error = action.payload;
      })
      // Safari Packages
      .addCase(fetchSafariPackages.pending, (state) => {
        state.safariPackagesStatus = 'loading';
      })
      .addCase(fetchSafariPackages.fulfilled, (state, action) => {
        state.safariPackagesStatus = 'succeeded';
        state.safariPackages = action.payload.data;
      })
      .addCase(fetchSafariPackages.rejected, (state, action) => {
        state.safariPackagesStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectHolidayPackages = (state) => state.pakages.holidayPackages;
export const selectHolidayPackagesStatus = (state) => state.pakages.holidayPackagesStatus;
export const selectMultiCenterDeals = (state) => state.pakages.multiCenterDeals;
export const selectMultiCenterDealsStatus = (state) => state.pakages.multiCenterDealsStatus;
export const selectCruisePackages = (state) => state.pakages.cruisePackages;
export const selectCruisePackagesStatus = (state) => state.pakages.cruisePackagesStatus;
export const selectSafariPackages = (state) => state.pakages.safariPackages;
export const selectSafariPackagesStatus = (state) => state.pakages.safariPackagesStatus;
export const selectPakagesLoading = (state) => state.pakages.loading;
export const selectPakagesError = (state) => state.pakages.error;

export default pakagesSlice.reducer; 