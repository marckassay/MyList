import { Action, AppState, GroceryItem } from "../types";
import { calculateGrandTotal, newId } from "../utils";

const removeItem = (value: GroceryItem[] | undefined, id: number) =>
  Array.isArray(value) ? value.filter((i) => i.id !== id) : [];

const copyArray = (value: GroceryItem[] | undefined) =>
  Array.isArray(value) ? value.splice(0) : [];

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
              items: [{ ...payload }, ...copyArray(state.list.items)],
            },
          };
        } else {
          const items = removeItem(state.list.items, payload.id);
          const grandTotal = calculateGrandTotal(items) + payload.price;

          return {
            ...state,
            toolbar: { ...state.toolbar, item: undefined },
            list: {
              ...state.list,
              grandTotal,
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
      if (payload?.id) {
        const items = removeItem(state.list.items, payload.id);
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
        throw new Error(`Action: '${type}' requries a payload.`);
      }
  }
};
