import { Entity, GroceryItem } from "./types";
import { Toolbar } from "./Toolbar";
import { List } from "./list/List";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

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

const getMaxId = (items: Entity[]) =>
  items.reduce((previousId, item) => {
    if (previousId <= item.id) {
      previousId = item.id;
    }
    return previousId;
  }, 1);

const initialItems: GroceryItem[] = [
  { id: 1, name: "Apples", price: 6 },
  { id: 2, name: "Bread", price: 3 },
  { id: 3, name: "Watermelon", price: 7 },
];

export default function App() {
  const [items, setItems] = useState<GroceryItem[]>(initialItems);
  const [editItem, setEditItem] = useState<GroceryItem | undefined>();
  const [confirmDeleteItem, setDeleteItem] = useState<
    GroceryItem | undefined
  >();

  const createItem = (item: GroceryItem) => {
    if (isGroceryItemValid(item)) {
      // an id of 0 indicates it's new, versus user edited it.
      if (item.id !== 0) {
        setItems((s) => {
          s.forEach((i) => {
            // since the name and/or price could of changed, map
            // those values into `i` of matching id.
            if (i.id === item.id) {
              i.name = item.name;
              i.price = item.price;
            }
          });

          return s;
        });
      } else {
        item.id = getMaxId(items) + 1;
        setItems((s) => [item, ...s]);
      }
    }
    setEditItem(undefined);
    return Promise.resolve();
  };

  const updateItem = (item: GroceryItem) => setEditItem({ ...item });

  const deleteItem = (item: GroceryItem | undefined) => {
    if (isGroceryItemEntity(item)) {
      // prior to the user confirmed to delete this `item has
      // the *same* item (by matching `id`) in the Toolbar for editing,
      // lets remove it now to prevent conflicting results if they continue
      // to edit that item.
      if (editItem?.id === item.id) {
        setEditItem(undefined);
      }

      const itemsCopy = [...items];
      const index = itemsCopy.findIndex((i) => i.id === item.id);

      if (index > -1) {
        itemsCopy.splice(index, 1);
        setItems(itemsCopy);
      }
    }
    setDeleteItem(undefined);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex mx-auto justify-center flex-col rounded-lg shadow-md bg-blue-100 w-1/3">
        <div className="text-2xl text-center p-2 font-bold text-blue-900 underline">
          Grocery List
        </div>
        <Toolbar addEditItemProps={{ createItem, editItem }} />
        <ConfirmationModal
          item={confirmDeleteItem}
          onConfirmDelete={(value) => deleteItem(value)}
        >
          <List
            items={items}
            onEdit={updateItem}
            onDelete={(item) => setDeleteItem(item)}
          />
        </ConfirmationModal>
      </div>
    </div>
  );
}
