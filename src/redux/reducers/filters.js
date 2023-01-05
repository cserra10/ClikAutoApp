/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { toggleValueFromString } from 'src/utils';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    sort: '',
    perPage: 4,
    search: '',
    makers: '',
    modelsByMaker: {},
  },
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },

    toggleMake(state, action) {
      if (state.makers.includes(action.payload)) {
        state.modelsByMaker[action.payload] = ''
      }
      state.makers = toggleValueFromString(action.payload, state.makers);
    },

    toggleModel(state, action) {
      const { model, maker } = action.payload;

      if (!state.makers.includes(maker)) {
        state.makers = toggleValueFromString(maker, state.makers)
      }
      state.modelsByMaker = {
        ...state.modelsByMaker,
        [maker]: toggleValueFromString(model, state.modelsByMaker[maker])
      };
    },
  }
})

export const { setFilter, toggleModel, toggleMake } = filtersSlice.actions;
export default filtersSlice.reducer;
