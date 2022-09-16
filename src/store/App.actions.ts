/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable no-case-declarations */
import {
  ActionRedux,
  AppActions,
  AppState,
  GetPayLoadType,
  GroceryItem,
} from "../types";
import { calculateGrandTotal, newId } from "../utils";

const removeItem = (value: GroceryItem[] | undefined, id: number) =>
  Array.isArray(value) ? value.filter((i) => i.id !== id) : [];

const copyArray = (value: GroceryItem[] | undefined) =>
  Array.isArray(value) ? value.splice(0) : [];

export const reducer = (
  state: AppState,
  { type, payload }: ReturnType<ActionRedux<AppActions>>
): AppState => {
  let pay: GetPayLoadType<AppActions, typeof type>;

  switch (type) {
    case "toolbar/reset form":
      return {
        ...state,
        toolbar: { ...state.toolbar, item: undefined },
      };
    case "toolbar/submit form":
      pay = payload as GetPayLoadType<AppActions, typeof type>;

      if (!pay.id) {
        pay.id = newId();
        const grandTotal = calculateGrandTotal(state.list.items) + pay.price;

        return {
          ...state,
          toolbar: { ...state.toolbar, item: undefined },
          list: {
            ...state.list,
            grandTotal,
            items: [{ ...pay }, ...copyArray(state.list.items)],
          },
        };
      } else {
        const items = removeItem(state.list.items, pay.id);
        const grandTotal = calculateGrandTotal(items) + pay.price;

        return {
          ...state,
          toolbar: { ...state.toolbar, item: undefined },
          list: {
            ...state.list,
            grandTotal,
            items: [{ ...pay }, ...items],
          },
        };
      }
    case "list/init edit item":
      pay = payload as GetPayLoadType<AppActions, typeof type>;

      return {
        ...state,
        toolbar: { ...state.toolbar, item: pay },
      };
    case "list/confirm trash item":
      pay = payload as GetPayLoadType<AppActions, typeof type>;

      return {
        ...state,
        confirm: { ...state.confirm, item: pay },
      };
    case "confirm/abort trash":
      return {
        ...state,
        confirm: { ...state.confirm, item: undefined },
      };
    case "confirm/proceed to trash":
      pay = payload as GetPayLoadType<AppActions, typeof type>;

      if (typeof pay.id === "number") {
        const items = removeItem(state.list.items, pay.id);
        const grandTotal = calculateGrandTotal(items);

        return {
          ...state,
          toolbar: { ...state.toolbar, item: undefined },
          confirm: { ...state.confirm, item: undefined },
          list: {
            items,
            grandTotal,
          },
        };
      } else {
        throw new Error(
          `Reducer for '${type}' action recieved a payload that wasn't a number.`
        );
      }
  }
};
