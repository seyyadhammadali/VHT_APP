import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchFaqs = createAsyncThunk(
  'faqs/fetchFaqs',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('faqs?length=10');
      console.log('FAQs Response:', res.data);
      return res.data;
    } catch (err) {
      console.log('FAQs Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const faqsSlice = createSlice({
  name: 'faqs',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default faqsSlice.reducer;
