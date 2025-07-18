import { configureStore } from '@reduxjs/toolkit';
import destinationReducer from './slices/destinationsSlice';
import sliderReducer from './slices/sliderSlice';
import pakagesReducer from './slices/pakagesSlice';
import faqsReducer from './slices/FaqsSlice';
import reviewReducer from './slices/reviewSlice';
  import safariReducer from './slices/SafariSlice';

export const store = configureStore({
  reducer: {
    destination: destinationReducer,
    slider: sliderReducer,
    pakages: pakagesReducer,
    faqs: faqsReducer,
    reviews: reviewReducer,
      safari: safariReducer, 
  },
});
