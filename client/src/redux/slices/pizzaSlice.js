import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// asyncThunk
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const res = await axios.get(
      `https://-67c6fc1ec19eb8753e78293c.mockapi.io/items?page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}${category}${search}`
    );
    return res.data;
  }
);

//
const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state, action) => {
        // console.log("загрузка");
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // console.log("OK", state);
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        // console.log("ошибка");
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
