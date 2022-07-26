import { GroceryItem, Entity } from "./types";

export const initialItems: GroceryItem[] = [
  { id: 1, name: "Apples", price: 6 },
  { id: 2, name: "Bread", price: 3 },
  { id: 3, name: "Watermelon", price: 7 },
];

export const emptyGroceryItem = { id: 0, name: "", price: 0 };

/**
 * Used for form validation; prior to `POST` in the context of
 * Restful API. In otherwords, the `id` value may be falsely.
 */
export const isGroceryItemValid = (item?: GroceryItem) => {
  return item ? item.name.length > 1 && item.price > 0 : false;
};

/**
 * Similar to `isGroceryItemValid` predicate, this predicate
 * verifies the shape; it checks for `id` in addition to all
 * other properties. But *not* their values.
 */
export const isGroceryItemEntity = (
  item?: GroceryItem
): item is GroceryItem => {
  return item ? "id" in item && "name" in item && "price" in item : false;
};

export const getMaxId = (items: Entity[]) =>
  items.reduce((previousId, item) => {
    if (previousId <= item.id) {
      previousId = item.id;
    }
    return previousId;
  }, 1);
