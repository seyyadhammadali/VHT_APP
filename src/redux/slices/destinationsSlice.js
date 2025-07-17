import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// 🔄 Async Thunks
export const fetchCountryDestinations = createAsyncThunk(
  'destination/fetchCountryDestinations',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('destinations?length=10');
      // console.log('Country Destinations Response-=-=-=-=-=-:', res);
//    const res = await api.get('destinations', {
//   params: {
//     length: 10,
//     countrydestination: true,
//   },
// });
    //  console.log('res====================',res)
      // console.log('Country Destinations Response:::::::::======:::::', res?.data);
      return res?.data?.data;
    } catch (err) {
      // console.log('Country Destinations Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchHotDestinations = createAsyncThunk(
  'destination/fetchHotDestinations',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('hot_destinations');
      console.log('Hot Destinations Response:', res.data);
      return res.data;
    } catch (err) {
      console.log('Hot Destinations Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchCityDestinations = createAsyncThunk(
  'destination/fetchCityDestinations',
  async (countryId, thunkAPI) => {
    try {
      const res = await api.get(`city_destinations?country=${countryId}`);
      console.log('City Destinations Response:', res.data);
      return res.data;
    } catch (err) {
      console.log('City Destinations Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const destinationSlice = createSlice({
  name: 'destination',
  initialState: {
    country: [],
    hot: [],
    city: [],
    loading: false,
    error: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    // optional reducers
  },
  extraReducers: (builder) => {
    builder

      // --- Country ---
      .addCase(fetchCountryDestinations.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchCountryDestinations.fulfilled, (state, action) => {
        state.country = action.payload;
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(fetchCountryDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })

      // --- Hot ---
      .addCase(fetchHotDestinations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHotDestinations.fulfilled, (state, action) => {
        state.hot = action.payload;
        state.loading = false;
      })
      .addCase(fetchHotDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- City ---
      .addCase(fetchCityDestinations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCityDestinations.fulfilled, (state, action) => {
        state.city = action.payload;
        state.loading = false;
      })
      .addCase(fetchCityDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default destinationSlice.reducer;
export const destinationStatus =  (state) => state.destination.status;
