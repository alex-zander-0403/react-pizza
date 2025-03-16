import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/counterSlice";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
  },
});
