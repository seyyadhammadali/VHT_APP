import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';


export const fetchSafariSliders = createAsyncThunk(
  'safari/fetchSafariSliders',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('sliders?type=safari&length=1');
      // console.log('Safari API Response=========================:', res?.data);
      return res.data;
    } catch (err) {
      // console.log('Safari fetch error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const safariSlice = createSlice({
  name: 'safari',
  initialState: {
    safariSliders: [],
    safariLoading: false,
    safariError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSafariSliders.pending, (state) => {
        state.safariLoading = true;
        state.safariError = null;
      })
      .addCase(fetchSafariSliders.fulfilled, (state, action) => {
       state.safariSliders = action.payload.data || []; // ✅ extract only data array
        state.safariLoading = false;
      })
      .addCase(fetchSafariSliders.rejected, (state, action) => {
        state.safariLoading = false;
        state.safariError = action.payload;
      });
  },
});

export default safariSlice.reducer; 