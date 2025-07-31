import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunk: fetch single package by ID
export const fetchSinglePackage = createAsyncThunk(
  'singlePackage/fetchSinglePackage',
  async (slug,  thunkAPI) => {
    try {
      const res = await api.get(`single_package?slug=${slug}`);
      console.log('res-----------================---------------===========',res?.data?.data)
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const singlePackageSlice = createSlice({
  name: 'singlePackage',
  initialState: {
    data: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePackage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSinglePackage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchSinglePackage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectSinglePackage = (state) => state.singlePackage.data;
export const selectSinglePackageStatus = (state) => state.singlePackage.status;
export const selectSinglePackageError = (state) => state.singlePackage.error;

export default singlePackageSlice.reducer;
