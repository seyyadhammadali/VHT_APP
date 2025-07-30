import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import TermAndConditions from '../../screens/TermsAndConditions';

// Get All Pages
export const fetchAllPages = createAsyncThunk(
  'pages/fetchAllPages',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('pages');
    //  / console.log('All Pages Response:', res.data);
      return res.data;
    } catch (err) {
      console.log('All Pages Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
// Get Single Page
export const fetchSinglePage = createAsyncThunk(
  'pages/fetchSinglePage',
  async (id, thunkAPI) => {
    try {
      const res = await api.get('single_page?slug=destinations');
      return res.data;
    } catch (err) {
      // console.log('Single Page Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchSingleCruisePage = createAsyncThunk(
  'pages/fetchSingleCruisePage',
  async (id, thunkAPI) => {
    try {
      const res = await api.get('single_page?slug=cruise');
      return res.data;
    } catch (err) {
      console.log('single_page?slug=cruise Page Error:', err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchSingleSafariPage = createAsyncThunk(
  'pages/fetchSingleSafariPage',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('single_page?slug=safari');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
// Fetch Disclaimer Page
export const fetchDisclaimerPage = createAsyncThunk(
  'pages/fetchDisclaimerPage',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('single_page?slug=disclaimer');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
// Fetch About Us Page
export const fetchAboutUsPage = createAsyncThunk(
  'pages/fetchAboutUsPage',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('single_page?slug=about-us');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
// Fetch Privacy Policy Page
export const fetchPrivacyPolicyPage = createAsyncThunk(
  'pages/fetchPrivacyPolicyPage',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('single_page?slug=privacy-policy');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const fetchTermAndConditionPage = createAsyncThunk(
  'pages/fetchTermAndConditionPage',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('single_page?slug=terms-and-conditions');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    all: [],
    singlePage: [],
    singleCruisePage: [],
    singleSafariPage: [], // Add state for safari page
    disclaimerPage: [],
    aboutUsPage: [],
    privacyPolicyPage: [],
    termAndConditionPage: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All Pages
      .addCase(fetchAllPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPages.fulfilled, (state, action) => {
        state.all = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Single Page
      .addCase(fetchSinglePage.pending, (state) => {
        state.loading = true;
      })
     .addCase(fetchSinglePage.fulfilled, (state, action) => {
  state.singlePage = action.payload.data; // not entire payload
  state.loading = false;
})

      .addCase(fetchSinglePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       // 🚢 Single Cruise Page
      .addCase(fetchSingleCruisePage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleCruisePage.fulfilled, (state, action) => {
        state.singleCruisePage = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchSingleCruisePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(fetchSingleSafariPage.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchSingleSafariPage.fulfilled, (state, action) => {
        state.singleSafariPage = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchSingleSafariPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDisclaimerPage.pending, (state) => { state.loading = true; })
      .addCase(fetchDisclaimerPage.fulfilled, (state, action) => {
        state.disclaimerPage = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchDisclaimerPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAboutUsPage.pending, (state) => { state.loading = true; })
      .addCase(fetchAboutUsPage.fulfilled, (state, action) => {
        state.aboutUsPage = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAboutUsPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPrivacyPolicyPage.pending, (state) => { state.loading = true; })
      .addCase(fetchPrivacyPolicyPage.fulfilled, (state, action) => {
        state.privacyPolicyPage = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchPrivacyPolicyPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
         .addCase(fetchTermAndConditionPage.pending, (state) => {
                state.loading = true;
                state.termAndConditionPage = null; // Clear old data
                state.error = null;
            })
            .addCase(fetchTermAndConditionPage.fulfilled, (state, action) => {
                state.termAndConditionPage = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchTermAndConditionPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.termAndConditionPage = null;
            });
  },
});

export default pagesSlice.reducer;

// Selectors
export const selectSingleCruisePage = (state) => state.pages.singleCruisePage;
export const selectSingleSafariPage = (state) => state.pages.singleSafariPage;
export const selectPagesLoading = (state) => state.pages.loading;
export const selectDisclaimerPage = (state) => state.pages.disclaimerPage;
export const selectAboutUsPage = (state) => state.pages.aboutUsPage;
export const selectPrivacyPolicyPage = (state) => state.pages.privacyPolicyPage; 
export const selectTermAndConditionPage = (state) => state.pages.termAndConditionPage; 