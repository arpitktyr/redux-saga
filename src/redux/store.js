import { configureStore } from "@reduxjs/toolkit";
import catSlice from "./catSlice";
import catSaga from "./saga";
import createSagaMiddleware from "redux-saga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cat: catSlice,
  },
  middleware: [saga],
});

saga.run(catSaga);
