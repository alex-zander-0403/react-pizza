import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//
type pizzaItemType = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

interface initialStateType {
  items: pizzaItemType[];
  status: "loading" | "success" | "error";
}

//
// type fetchPizzasArgsType = {
//   category: string;
//   sortBy: string;
//   order: string;
//   search: string;
//   currentPage: string;
// };
// или
type fetchPizzasArgsType = Record<string, string>;

// asyncThunk
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: fetchPizzasArgsType) => {
    const { category, sortBy, order, search, currentPage } = params;
    const res = await axios.get<pizzaItemType[]>(
      `https://67c6fc1ec19eb8753e78293c.mockapi.io/items?page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}${category}${search}`
    );
    return res.data as pizzaItemType[];
  }
);





//
const initialState: initialStateType = {
  items: [],
  status: "loading", // loading | success | error
};

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
        state.status = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // console.log("OK", state);
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        // console.log("ошибка");
        state.items = [];
        state.status = "error";
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
