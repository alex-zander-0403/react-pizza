import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, pizzaItemType, Status } from "./pizzaTypes";
import { fetchPizzas } from "./asyncActions";

//
const initialState: initialStateType = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

//
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<pizzaItemType[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        // console.log("загрузка");
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // console.log("OK", state);
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        // console.log("ошибка");
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

//
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
