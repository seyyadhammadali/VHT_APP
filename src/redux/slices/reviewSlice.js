import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// export const fetchAllReviews = createAsyncThunk(
//   'reviews/fetchAllReviews',
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get('reviews/all');
//       console.log('All Reviews Response:', res.data);
//       return res.data;
//     } catch (err) {
//       console.log('All Reviews Error:', err.message);
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );
export const fetchYoutubeVideos = createAsyncThunk(
  'reviews/fetchYoutubeVideos',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('youtube_videos');
      console.log('YouTube Videos Response:-=-=-=----=============================', res?.data?.data);
      return res.data;
    } catch (err) {
      console.log('YouTube Videos Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchReviewComments = createAsyncThunk(
  'reviews/fetchReviewComments',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('reviews?length=10');
      console.log('Review Comments Response:', res.data);
      return res.data;
    } catch (err) {
      console.log('Review Comments Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    all: [],
    youtubeVideos: [],
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   .addCase(fetchAllReviews.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(fetchAllReviews.fulfilled, (state, action) => {
    //     state.all = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(fetchAllReviews.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
      .addCase(fetchYoutubeVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchYoutubeVideos.fulfilled, (state, action) => {
        state.youtubeVideos = action.payload;
        state.loading = false;
      })
      .addCase(fetchYoutubeVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReviewComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviewComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
