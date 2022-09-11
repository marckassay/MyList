import { devtools, redux } from "zustand/middleware";
import create from "zustand";
import { AppActions, AppState, createActions } from "../types";
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

export const action = createActions<AppActions>();
