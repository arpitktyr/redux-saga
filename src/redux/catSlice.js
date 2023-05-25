import { createSlice } from "@reduxjs/toolkit";

export const catSlice = createSlice({
  name: "cat",
  initialState: {
    data: [],
    isLoading: false,
  },
  reducers: {
    getCatsFetch: (state) => {
      state.isLoading = true;
    },
    getCatsSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = true;
    },
    getCatsFailure: (state) => {
      state.isLoading = false;
    },
  },
});
export const { getCatsFailure, getCatsFetch, getCatsSuccess } =
  catSlice.actions;

export default catSlice.reducer;
