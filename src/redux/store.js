import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/app';
import filtersReducer from './reducers/filters';

const store = configureStore({
  reducer: {
    app: appReducer,
    filters: filtersReducer
  }
});

export default store;
