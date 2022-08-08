import create from "zustand";
import { devtools, redux } from "zustand/middleware";
import { AppState } from "../types";
import { calculateGrandTotal, initialItems } from "../utils";
import { reducer } from "./App.actions";

const initialState: AppState = {
  title: "Grocery List",
  toolbar: {
    item: undefined,
  },
  list: {
    grandTotal: calculateGrandTotal(initialItems),
    items: [...initialItems],
  },
  confirm: {
    item: undefined,
  },
};
export const useAppStore = create(devtools(redux(reducer, initialState)));
