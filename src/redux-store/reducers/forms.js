import { createSlice } from '@reduxjs/toolkit';

const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    homeCount: 1,
  },
  reducers: {
    incrementHomeCount(state) {
      state.homeCount++;
    },
    decrementHomeCount(state) {
      state.homeCount--;
    },
    setHomeCount(state, action) {
      state.homeCount = action.payload;
    },
  },
});

export const { incrementHomeCount, decrementHomeCount, setHomeCount } = formsSlice.actions;
export default formsSlice.reducer;
