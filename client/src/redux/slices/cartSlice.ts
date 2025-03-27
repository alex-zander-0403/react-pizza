import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

//
export type CartItemType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

interface InitialStateType {
  totalPrice: number;
  items: CartItemType[];
}

//
const initialState: InitialStateType = {
  items: [],
  totalPrice: 0,
};

//
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// селекторы
export const selectCart = (state: RootState) => state.cartSlice;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);

//
export const { addItem, removeItem, clearItems, plusItem, minusItem } =
  cartSlice.actions; // Экспортируем addItem
export default cartSlice.reducer;
