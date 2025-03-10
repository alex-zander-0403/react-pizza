import { createSlice } from "@reduxjs/toolkit";

// стартовое состояние ->
const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState, // <- стартовое состояние
  // reducers - функции(actions)
  reducers: {
    // actions:
    // метод increment
    increment: (state) => {
      state.value += 1;
    },
    // метод decrement
    decrement: (state) => {
      state.value -= 1;
    },
    // настраиваемый метод incrementByAmount
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// console.log(counterSlice.reducer);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
