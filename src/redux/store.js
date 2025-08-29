import { configureStore } from '@reduxjs/toolkit';
import {apiSlice} from './slices/apiSlice';
// import destinationReducer from './slices/destinationsSlice';
// import sliderReducer from './slices/sliderSlice';
// import pakagesReducer from './slices/pakagesSlice';
// import faqsReducer from './slices/FaqsSlice';
// import reviewReducer from './slices/reviewSlice';
//   import safariReducer from './slices/SafariSlice';
//   import pagesReducer from './slices/pagesSlice';
// import formSubmissionReducer from './slices/formSubmissionSlice';
// import blogReducer from './slices/BlogSlice';
// import staticReducer from './slices/StaticSlice';
// import singlePackageReducer from './slices/singlePackageSlice';
// import searchReducer from './slices/searchSlice';
// import notificationReducer from './slices/NotificationSlice';
export default store = configureStore({
  reducer: {
     [apiSlice.reducerPath]: apiSlice.reducer
    // destination: destinationReducer,
    // slider: sliderReducer,
    // pakages: pakagesReducer,
    // faqs: faqsReducer,
    // reviews: reviewReducer,
    // safari: safariReducer, 
    // pages: pagesReducer,
    // formSubmission:formSubmissionReducer,
    // blogs: blogReducer,
    // static: staticReducer,
    //   singlePackage: singlePackageReducer,
    //   search: searchReducer, 
    //    notification: notificationReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
