//
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type pizzaItemType = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export interface initialStateType {
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
