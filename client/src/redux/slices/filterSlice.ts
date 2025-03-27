import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

//
export type SortType = {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
};

interface InitialStateType {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}

//
const initialState: InitialStateType = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности (убывание)",
    sortProperty: "-rating",
  },
};

//
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<InitialStateType>) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const selectSort = (state: RootState) => state.filterSlice.sort;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
