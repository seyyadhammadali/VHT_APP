import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// --- Country Destinations ---
export const fetchCountryDestinations = createAsyncThunk(
  'destination/fetchCountryDestinations',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('destinations');
      return res?.data?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// --- Hot Destinations ---
export const fetchHotDestinations = createAsyncThunk(
  'destination/fetchHotDestinations',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('hot_destinations');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// --- City Destinations ---
export const fetchCityDestinations = createAsyncThunk(
  'destination/fetchCityDestinations',
  async (countryId, thunkAPI) => {
    try {
      const res = await api.get(`city_destinations?country=${countryId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// --- Single Destination ---
export const fetchSingleDestination = createAsyncThunk(
  'destination/fetchSingleDestination',
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`single_destination?id=${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// --- All Destinations (New) ---
export const fetchAllDestinations = createAsyncThunk(
  'destination/fetchAllDestinations',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('all_destinations');
      return res.data;
    } catch (err) {
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
    singleDestination: null,
    allDestinations: [], // NEW state
    loading: false,
    error: null,
    allDestinationsStatus:'idle',
    status: 'idle',
  },
  reducers: {},
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
      })

      // --- Single Destination ---
      .addCase(fetchSingleDestination.pending, (state) => {
        state.loading = true;
        state.singleDestination = null;
        state.status = 'loading';
      })
      .addCase(fetchSingleDestination.fulfilled, (state, action) => {
        state.singleDestination = action.payload;
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(fetchSingleDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })

      // --- All Destinations (NEW) ---
      .addCase(fetchAllDestinations.pending, (state) => {
        state.loading = true;
        state.allDestinationsStatus = 'loading';
      })
      .addCase(fetchAllDestinations.fulfilled, (state, action) => {
        state.allDestinations = action.payload;
        console.log(action.payload, "Destinations data fetched!");
        
        state.allDestinationsStatus = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchAllDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allDestinationsStatus = 'failed';
      });
  },
});

export default destinationSlice.reducer;
export const destinationStatus = (state) => state.destination.status;
export const allDestinationsStatus = (state) => state.destination.allDestinationsStatus;
export const selectAllDestinations = (state) => state.destination.allDestinations;

export const selectHotDestinations = (state) => {
  const destinations = state.destination.allDestinations;
  const status = state.destination.allDestinationsStatus;
  if(status !== 'succeeded'){
    fetchAllDestinations();
  }

  if (status === 'succeeded' && destinations?.data) {
    // Return all destinations where hot === 1
    return destinations.data.filter((dest) => dest.hot === 1);
  }

  return [];
};
export const selectCountryDestinations = (state) => {
  const destinations = state.destination.allDestinations;
  const status = state.destination.allDestinationsStatus;
  if(status !== 'succeeded'){
    fetchAllDestinations();
  }

  if (status === 'succeeded' && destinations?.data) {
    return destinations.data.filter((dest) => dest.parent === 0);
  }

  return [];
};
export const selectCityDestinations = (destinationId)=>(state) => {
  const destinations = state.destination.allDestinations;
  const status = state.destination.allDestinationsStatus;
  if(status !== 'succeeded'){
    fetchAllDestinations();
  }

  if (status === 'succeeded' && destinations?.data) {
    return destinations.data.filter((dest) => dest.parent === destinationId);
  }

  return [];
};
export const selectDestinationById = (destinationId)=>(state) => {
  const destinations = state.destination.allDestinations;
  const status = state.destination.allDestinationsStatus;
  if(status !== 'succeeded'){
    fetchAllDestinations();
  }

  if (status === 'succeeded' && destinations?.data) {
    return destinations.data.find((dest) => dest.id === destinationId);
  }

  return [];
};
