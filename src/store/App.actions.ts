import { useAppStore } from "./App.store";
import { AppState, GroceryItem, IncludeOnlyActions } from "../types";
import { nanoid } from "nanoid";

import { calculateGrandTotal } from "../utils";

export const appStoreActions = (): IncludeOnlyActions<AppState> => ({
  cancel: () => {
    useAppStore.setState((state) => ({
      toolbar: { ...state.toolbar, item: undefined },
    }));
  },
  submit: (item: GroceryItem) => {
    useAppStore.setState((state) => {
      const items = state.list.items;

      if (item.id !== 0) {
        items.forEach((i) => {
          // since the name and/or price could of changed, map
          // those values into `i` of matching id.
          if (i.id === item.id) {
            i.name = item.name;
            i.price = item.price;
          }
        });
      } else {
        item.id = nanoid();
        items.push(item);
      }

      return {
        list: {
          ...state.list,
          grandTotal: calculateGrandTotal(items),
          items,
        },
      };
    });
    useAppStore.setState((state) => ({
      toolbar: { ...state.toolbar, item: undefined },
    }));
  },
  edit: (item: GroceryItem) => {
    useAppStore.setState((state) => ({
      toolbar: { ...state.toolbar, item },
    }));
  },
  trash: (value: boolean) => {
    if (value) {
      const item = useAppStore.getState().confirm.item;
      if (item) {
        useAppStore.setState((state) => {
          const items = state.list.items.filter((i) => i.id !== item.id);

          return {
            list: {
              ...state.list,
              grandTotal: calculateGrandTotal(items),
              items,
            },
          };
        });
      } else {
        throw Error(
          "Unexpected state: `trash` action did not retrieve item from state"
        );
      }

      // TODO: although this works. there may be a reactive
      // way to do this. that is, to 'dispatch' to 'subscribers'
      // that an item has been removed from collection
      const toolbar = useAppStore.getState().toolbar;
      if (item.id === toolbar.item?.id) {
        useAppStore.setState((state) => ({
          toolbar: { ...state.toolbar, item: undefined },
        }));
      }
    }

    useAppStore.setState((state) => ({
      confirm: { ...state.confirm, item: undefined },
    }));
  },
  confirmToTrash: (item: GroceryItem) => {
    useAppStore.setState((state) => ({ confirm: { ...state.confirm, item } }));
  },
});
