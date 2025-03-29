import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { SortType } from "./filterSlice";

//
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

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
  status: Status;
}

//
// type fetchPizzasArgsType = Record<string, string>;

export type searchPizzasParams = {
  sortBy: string;
  category: string;
  order: string;
  search: string;
  currentPage: string;
};

// asyncThunk
// export const fetchPizzas = createAsyncThunk<pizzaItemType[], Record<string, string>>(
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: searchPizzasParams) => {
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
  status: Status.LOADING, // loading | success | error
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

// export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectPizza = (state: RootState) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
