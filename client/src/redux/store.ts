import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filterSlice from "./filter/filterSlice";
import cartSlice from "./cart/cartSlice";
import pizzaSlice from "./pizza/pizzaSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzaSlice,
  },
});

// определение типа структуры всего состояния хранилища Redux на основе созданного store
export type RootState = ReturnType<typeof store.getState>;

// продвинутый кастомный хук useAppDispatch
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
