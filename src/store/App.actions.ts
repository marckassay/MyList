import { GroceryItem } from "../types";
import { Action, AppState } from "../types";
import { calculateGrandTotal, newId } from "../utils";

const removeItem = (array: GroceryItem[], id: number) =>
  array.filter((i) => i.id !== id);

export const reducer = (
  state: AppState,
  { type, payload }: Action
): AppState => {
  switch (type) {
    case "toolbar/reset form":
      return {
        ...state,
        toolbar: { ...state.toolbar, item: undefined },
      };
    case "toolbar/submit form":
      if (payload) {
        if (!payload.id) {
          payload.id = newId();
          const grandTotal =
            calculateGrandTotal(state.list.items) + payload.price;

          return {
            ...state,
            toolbar: { ...state.toolbar, item: undefined },
            list: {
              ...state.list,
              grandTotal,
              items: [{ ...payload }, ...state.list.items],
            },
            confirm: { ...state.confirm },
          };
        } else {
          const items = removeItem(state.list.items, payload.id);

          return {
            ...state,
            toolbar: { ...state.toolbar, item: undefined },
            list: {
              ...state.list,
              grandTotal: calculateGrandTotal(state.list.items),
              items: [{ ...payload }, ...items],
            },
          };
        }
      } else {
        throw new Error(`Action: '${type}' requries a payload.`);
      }
    case "list/init edit item":
      return {
        ...state,
        toolbar: { ...state.toolbar, item: payload },
      };
    case "list/confirm trash item":
      return {
        ...state,
        confirm: { ...state.confirm, item: payload },
      };
    case "confirm/abort trash":
      return {
        ...state,
        confirm: { ...state.confirm, item: undefined },
      };
    case "confirm/proceed to trash":
      if (payload && payload.id) {
        return {
          ...state,
          toolbar: { ...state.toolbar, item: undefined },
          confirm: { ...state.confirm, item: undefined },
          list: {
            items: removeItem(state.list.items, payload.id),
            grandTotal: calculateGrandTotal(state.list.items),
          },
        };
      } else {
        throw new Error(`Action: '${type}' requries a payload.`);
      }
    default:
      return state;
  }
};
