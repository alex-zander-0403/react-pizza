import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/counterSlice";
import filterSlice from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
  },
});

// console.log(store);
