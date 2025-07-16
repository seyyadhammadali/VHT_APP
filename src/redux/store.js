import { configureStore } from '@reduxjs/toolkit';
import destinationReducer from './slices/destinationsSlice';
import sliderReducer from './slices/sliderSlice';
import pakagesReducer from './slices/pakagesSlice';

export const store = configureStore({
  reducer: {
    destination: destinationReducer,
    slider: sliderReducer,
    pakages: pakagesReducer,
  },
});
