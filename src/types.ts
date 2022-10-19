/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
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
  list: { grandTotal?: number; items?: GroceryItem[] };
}

export interface ConfirmationModalSlice {
  confirm: { item?: GroceryItem };
}

export type AppState = {
  title: string;
} & ToolbarSlice &
  ListSlice &
  ConfirmationModalSlice;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AppActions = {
  toolbar: {
    "submit form": GroceryItem;
    "reset form": undefined;
  };
  list: { "init edit item": GroceryItem; "confirm trash item": GroceryItem };
  confirm: { "abort trash": undefined; "proceed to trash": GroceryItem };
};
