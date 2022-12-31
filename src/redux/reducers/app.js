/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'app',
  initialState: {
    mode: 'light',
  },
  reducers: {
    setValue(state, action) {
      const { key, value } = action.payload;
      state[key] = value
    }
  }
})

export const { setValue } = filtersSlice.actions;
export default filtersSlice.reducer;
