import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const submitEnquiryForm = createAsyncThunk(
  'formSubmission/submitEnquiryForm',
  async (formData, thunkAPI) => {
    try {
      const res = await api.post('enquire_form', formData);
      console.log('Enquiry Form Response:', res.data);
      return res.data;
    } catch (err) {
      console.log('Enquiry Form Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const formSubmissionSlice = createSlice({
  name: 'formSubmission',
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiryForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitEnquiryForm.fulfilled, (state, action) => {
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(submitEnquiryForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default formSubmissionSlice.reducer; 