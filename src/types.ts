export interface Entity {
  id?: number;
}

export interface Children {
  children: React.ReactNode;
}

export interface GroceryItem extends Entity {
  name: string;
  price: number;
}

export interface ToolbarSlice {
  toolbar: { item?: GroceryItem };
}

export interface ListSlice {
  list: { grandTotal: number; items: Array<GroceryItem> };
}

export interface ConfirmationModalSlice {
  confirm: { item?: GroceryItem };
}

type ActionType =
  | "toolbar/reset form"
  | "toolbar/submit form"
  | "list/init edit item"
  | "list/confirm trash item"
  | "confirm/abort trash"
  | "confirm/proceed to trash";

export type Action = { type: ActionType; payload?: GroceryItem };

export type AppState = {
  title: string;
} & ToolbarSlice &
  ListSlice &
  ConfirmationModalSlice;
