import { configureStore } from '@reduxjs/toolkit';
import destinationReducer from './slices/destinationsSlice';
import sliderReducer from './slices/sliderSlice';
import pakagesReducer from './slices/pakagesSlice';
import faqsReducer from './slices/FaqsSlice';
import reviewReducer from './slices/reviewSlice';
  import safariReducer from './slices/SafariSlice';
  import pagesReducer from './slices/pagesSlice';
import formSubmissionReducer from './slices/formSubmissionSlice';
import blogReducer from './slices/BlogSlice';
import staticReducer from './slices/StaticSlice';
import singlePackageReducer from './slices/singlePackageSlice';
import searchReducer from './slices/searchSlice';
import notificationReducer from './slices/Notificationslice';
export const store = configureStore({
  reducer: {
    destination: destinationReducer,
    slider: sliderReducer,
    pakages: pakagesReducer,
    faqs: faqsReducer,
    reviews: reviewReducer,
    safari: safariReducer, 
    pages: pagesReducer,
    formSubmission:formSubmissionReducer,
    blogs: blogReducer,
    static: staticReducer,
      singlePackage: singlePackageReducer,
      search: searchReducer, 
       notification: notificationReducer,
  },
});
