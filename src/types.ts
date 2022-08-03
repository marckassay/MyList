export interface Entity {
  id: number;
}

export interface Children {
  children: React.ReactNode;
}

export interface GroceryItem extends Entity {
  name: string;
  price: number;
}

export interface ItemMutate {
  /**
   * The initial callback prop to handle editing an item. Currently this in-turns
   * sends the `item` to toolbar form to modified or not. So when called, it's undeterminied
   * if this `item` will actually be modified.
   */
  onEdit: (item: GroceryItem) => void;

  /**
   * The initial callback prop to handle deleting an item. Currently this in-turns
   * call a dialog to have the user confirm. So when called, it's undeterminied
   * if this `item` will actually be deleted.
   */
  onDelete: (item: GroceryItem) => void;
}

/**
 * With given `T`, extract all *expect* Functions (or in otherwords actions).
 *
 * @see https://github.com/pmndrs/zustand/discussions/750#discussioncomment-1969483
 */
export type ExcludeActions<T> =
  // eslint-disable-next-line @typescript-eslint/ban-types
  Omit<T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>;

/**
 * With given `T`, extract all Functions (or in otherwords actions).
 *
 * @see https://github.com/pmndrs/zustand/discussions/750#discussioncomment-1969483
 */
export type IncludeOnlyActions<T> =
  // eslint-disable-next-line @typescript-eslint/ban-types
  Pick<T, { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]>;

export interface ToolbarSlice {
  item?: GroceryItem;
}

export interface ListSlice {
  grandTotal: number;
  items: Array<GroceryItem>;
}

export interface ConfirmationModalSlice {
  item?: GroceryItem;
}

/**
 * All user initiated actions.
 *
 * Seems to be a common Zustand pattern to have actions in a separate interface
 * so that they can be accessed easily.
 *
 * @see https://github.com/pmndrs/zustand/blob/main/docs/practice-with-no-store-actions.md
 */
export interface AppActions {
  cancel: () => void;
  submit: (item: GroceryItem) => void;
  edit: (item: GroceryItem) => void;
  trash: (item: GroceryItem) => void;
}

export type AppState = {
  toolbar: ToolbarSlice;
  list: ListSlice;
  confirm: ConfirmationModalSlice;
  title: string;
} & AppActions;
