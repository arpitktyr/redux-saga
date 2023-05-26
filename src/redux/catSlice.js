import { createSlice } from "@reduxjs/toolkit";

export const catSlice = createSlice({
  name: "cat",
  initialState: {
    data: [],
    isLoading: false,
    haveError: "",
  },
  reducers: {
    getCatsFetch: (state) => {
      state.isLoading = true;
      state.haveError = "";
    },
    getCatsSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    getCatsFailure: (state, action) => {
      state.isLoading = false;
      state.haveError = action.payload;
    },
  },
});
export const { getCatsFailure, getCatsFetch, getCatsSuccess } =
  catSlice.actions;

export default catSlice.reducer;
