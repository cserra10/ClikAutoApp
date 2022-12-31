/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { toggleValueFromString } from 'src/utils';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: 'foo',
    makers: '',
    modelsByMaker: {},
  },
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },

    toggleMake(state, action) {
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

    resetModels(state, action) {
      state.modelsByMaker = {
        ...state.modelsByMaker,
        [action.payload]: ''
      };
    },
  }
})

export const { setFilter, toggleModel, toggleMake, resetModels } = filtersSlice.actions;
export default filtersSlice.reducer;
