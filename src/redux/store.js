import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './reducers/filters';

const store = configureStore({
  reducer: {
    filters: filtersReducer
  }
});

export default store;
