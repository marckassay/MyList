import { GroceryItem } from "./types";
import { Toolbar } from "./toolbar/Toolbar";
import { List } from "./list/List";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import {
  initialItems,
  isGroceryItemValid,
  getNextGreatestIdValue,
  isGroceryItemEntity,
} from "./utils";
import { useAppStore } from "./store/App.store";

export default function App() {
  const { title } = useAppStore();
  const [items, setItems] = useState<GroceryItem[]>(initialItems);
  const [editItem, setEditItem] = useState<GroceryItem | undefined>();
  const [confirmDeleteItem, setConfirmDeleteItem] = useState<
    GroceryItem | undefined
  >();

  const updateItems = (item: GroceryItem) => {
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
        item.id = getNextGreatestIdValue(items);
        setItems((s) => [item, ...s]);
      }
    }
    setEditItem(undefined);
  };

  const deleteItem = (item: GroceryItem | undefined) => {
    if (isGroceryItemEntity(item)) {
      // prior to user confirmed to delete this `item`, they may have
      // the *same* item (by matching `id`) in the Toolbar for editing.
      // if so, remove it now to prevent possible conflicting results
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
    setConfirmDeleteItem(undefined);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex mx-auto justify-center flex-col rounded-lg shadow-md bg-blue-100 w-1/3">
        <div className="text-2xl text-center p-2 font-bold text-blue-900 underline select-none">
          {title}
        </div>
        <Toolbar modifyItemProps={{ updateItems, editItem }} />
        <ConfirmationModal
          item={confirmDeleteItem}
          onConfirmDelete={(value) => deleteItem(value)}
        >
          <List
            items={items}
            onEdit={(item) => setEditItem({ ...item })}
            onDelete={(item) => setConfirmDeleteItem(item)}
          />
        </ConfirmationModal>
      </div>
    </div>
  );
}
