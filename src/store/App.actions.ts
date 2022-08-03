import { useAppStore } from "./App.store";
import { AppState, GroceryItem, IncludeOnlyActions } from "../types";
import { calculateGrandTotal } from "../utils";

export const appStoreActions = (): IncludeOnlyActions<AppState> => ({
  cancel: () => {
    useAppStore.setState((state) => ({
      toolbar: { ...state.toolbar, item: undefined },
    }));
  },
  submit: () => {
    useAppStore.setState((state) => ({
      toolbar: { ...state.toolbar, item: undefined },
    }));
  },
  edit: (item: GroceryItem) => {
    useAppStore.setState((state) => {
      const items = state.list.items.filter((i) => i.id !== item.id);
      items.push(item);

      return {
        list: {
          ...state.list,
          grandTotal: calculateGrandTotal(items),
          items,
        },
      };
    });
  },
  trash: (item: GroceryItem) => {
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
  },
});
