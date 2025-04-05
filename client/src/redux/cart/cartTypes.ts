export type CartItemType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

export interface InitialStateType {
  items: CartItemType[];
  totalPrice: number;
}
