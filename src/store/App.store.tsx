import create, { StateCreator } from "zustand";
import {
  AppState,
  ConfirmationModalSlice,
  ListSlice,
  ToolbarSlice,
} from "../types";
import { calculateGrandTotal, initialItems } from "../utils";
import { appStoreActions } from "./App.actions";

const createToolbarSlice: StateCreator<
  AppState,
  [],
  [],
  ToolbarSlice
> = () => ({
  item: undefined,
});

const createListSlice: StateCreator<AppState, [], [], ListSlice> = () => ({
  grandTotal: calculateGrandTotal(initialItems),
  items: [...initialItems],
});

const createConfirmationModalSlice: StateCreator<
  AppState,
  [],
  [],
  ConfirmationModalSlice
> = () => ({
  item: undefined,
});

export const useAppStore = create<AppState>()((...a) => ({
  toolbar: createToolbarSlice(...a),
  list: createListSlice(...a),
  confirm: createConfirmationModalSlice(...a),
  title: "Grocery List",
  ...appStoreActions(),
}));
