import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Generic async thunk creator
const createFetchThunk = (name, slug) =>
  createAsyncThunk(`packages/${name}`, async (_, thunkAPI) => {
    try {
      const res = await api.get(`packages_by_page?slug=${slug}`);
      return res.data.data || res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  });

export const fetchHolidayPackages = createFetchThunk("fetchHolidayPackages", "holiday-deal");
export const fetchMultiCenterDeals = createFetchThunk("fetchMultiCenterDeals", "multi-centre-holidays");
export const fetchCruisePackages = createFetchThunk("fetchCruisePackages", "cruise");
export const fetchSafariPackages = createFetchThunk("fetchSafariPackages", "safari");

// Single package fetch
export const fetchSinglePackage = createAsyncThunk(
  "packages/fetchSinglePackage",
  async (slug, thunkAPI) => {
    try {
      const res = await api.get(`single_package?slug=${slug}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchDestinationPackages = createAsyncThunk(
  "packages/fetchDestinationPackages",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`packages_by_destination?id=${id}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  destinationPackages: [],
  holidayPackages: [],
  multiCenterDeals: [],
  cruisePackages: [],
  safariPackages: [],
  singlePackage: null,

  holidayPackagesStatus: "idle",
  destinationPackagesStatus: "idle",
  multiCenterDealsStatus: "idle",
  cruisePackagesStatus: "idle",
  safariPackagesStatus: "idle",
  singlePackageStatus: "idle",

  error: null,
};

const pakagesSlice = createSlice({
  name: "pakages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const addCases = (thunk, stateKey) => {
      builder
        .addCase(thunk.pending, (state) => {
          state[`${stateKey}Status`] = "loading";
        })
        .addCase(thunk.fulfilled, (state, action) => {
          console.log(action.payload, "packages api calls", stateKey);
          
          state[stateKey] = action.payload;
          state[`${stateKey}Status`] = "succeeded";
        })
        .addCase(thunk.rejected, (state, action) => {
          state[`${stateKey}Status`] = "failed";
          state.error = action.payload;
        });
    };

    addCases(fetchHolidayPackages, "holidayPackages");
    addCases(fetchMultiCenterDeals, "multiCenterDeals");
    addCases(fetchCruisePackages, "cruisePackages");
    addCases(fetchSafariPackages, "safariPackages");
    addCases(fetchSinglePackage, "singlePackage");
    addCases(fetchDestinationPackages, "destinationPackages");
  },
});

// Selectors
export const selectHolidayPackages = (state) => state.pakages.holidayPackages;
export const selectHolidayPackagesStatus = (state) => state.pakages.holidayPackagesStatus;
export const selectMultiCenterDeals = (state) => state.pakages.multiCenterDeals;
export const selectMultiCenterDealsStatus = (state) => state.pakages.multiCenterDealsStatus;
export const selectCruisePackages = (state) => state.pakages.cruisePackages;
export const selectCruisePackagesStatus = (state) => state.pakages.cruisePackagesStatus;
export const selectSafariPackages = (state) => state.pakages.safariPackages;
export const selectSafariPackagesStatus = (state) => state.pakages.safariPackagesStatus;
export const selectSinglePackage = (state) => state.pakages.singlePackage;
export const selectSinglePackageStatus = (state) => state.pakages.singlePackageStatus;
export const selectDestinationPackages = (state) => state.pakages.destinationPackages;
export const selectDestinationPackagesStatus = (state) => state.pakages.destinationPackagesStatus;
export const selectPakagesError = (state) => state.pakages.error;

export default pakagesSlice.reducer;