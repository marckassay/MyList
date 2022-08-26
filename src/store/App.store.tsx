import { devtools, redux } from "zustand/middleware";
import create from "zustand";
import { AppState, createActions, GroceryItem, ReduxParams } from "../types";
import { calculateGrandTotal, initialItems } from "../utils";
import { reducer } from "./App.actions";

const initialState: AppState = {
  title: "",
  toolbar: {
    item: undefined,
  },
  list: {
    grandTotal: undefined,
    items: undefined,
  },
  confirm: {
    item: undefined,
  },
};

export const useAppStore = create(devtools(redux(reducer, initialState)));
useAppStore.setState({
  title: "Grocery List",
  list: {
    grandTotal: calculateGrandTotal(initialItems),
    items: [...initialItems],
  },
});

/*
  Below is work in progress. Only implemented very modestly by using it only
  one instance. More TS typing knowledge is needed.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AppActions = {
  toolbar: { "submit form": GroceryItem; "edit form": undefined };
  list: { "init edit item": undefined; "confirm trash item": undefined };
  confirm: { "abort trash": undefined; "proceed to trash": undefined };
};
export const action: ReduxParams<AppActions> = createActions<AppActions>();
