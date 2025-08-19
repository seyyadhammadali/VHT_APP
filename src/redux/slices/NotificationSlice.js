import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunk to save firebase token
export const saveFirebaseToken = createAsyncThunk(
  'notification/saveFirebaseToken',
  async (token, thunkAPI) => {
    try {
      const res = await api.post('save_firebase_token', {
        device_type: 'android',
        device_token: token,
      });
      console.log('Save Firebase Token Response::::::comingggggg:::::::++++++++', res);
      return res.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearNotificationState: (state) => {
      state.response = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFirebaseToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveFirebaseToken.fulfilled, (state, action) => {
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(saveFirebaseToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNotificationState } = notificationSlice.actions;
export default notificationSlice.reducer;
