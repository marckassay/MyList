import create from "zustand";
import { devtools, redux } from "zustand/middleware";
import { reducer } from "./App.actions";
import { AppState } from "../types";
import { calculateGrandTotal, initialItems } from "../utils";

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
