import { createAsyncThunk } from "@reduxjs/toolkit";
import { pizzaItemType, searchPizzasParams } from "./pizzaTypes";
import axios from "axios";

//
// export const fetchPizzas = createAsyncThunk<pizzaItemType[], Record<string, string>>(
export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params: searchPizzasParams) => {
  const { category, sortBy, order, search, currentPage } = params;
  const res = await axios.get<pizzaItemType[]>(
    `https://67c6fc1ec19eb8753e78293c.mockapi.io/items?page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}${category}${search}`
  );
  return res.data as pizzaItemType[];
});
