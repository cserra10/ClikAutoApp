/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
  },
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      state[key] = value
    }
  }
})

export const { setFilter } = filtersSlice.actions
export default filtersSlice.reducer
