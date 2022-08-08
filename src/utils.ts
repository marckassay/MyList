import { customAlphabet } from "nanoid";
import { GroceryItem } from "./types";

export const newId = () => Number(customAlphabet("0123456789", 7)());

export const initialItems: GroceryItem[] = [
  { id: newId(), name: "Apples", price: 6 },
  { id: newId(), name: "Bread", price: 3 },
  { id: newId(), name: "Watermelon", price: 7 },
];

export const calculateGrandTotal = (items: GroceryItem[]) =>
  items
    .map((item) => item.price)
    .reduce((previousprice, price) => previousprice + price, 0);

export const emptyGroceryItem: GroceryItem = { id: 0, name: "", price: 0 };

/**
 * Used for form validation; prior to `POST` in the context of
 * Restful API. In otherwords, the `id` value may be falsely.
 */
export const isGroceryItemValid = (item?: GroceryItem) => {
  return item ? item.name.length > 1 && item.price > 0 : false;
};
