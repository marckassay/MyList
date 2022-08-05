export interface Entity {
  id?: string;
}

export interface Children {
  children: React.ReactNode;
}

export interface GroceryItem extends Entity {
  name: string;
  price: number;
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
  /**
   * Used in Toolbar `<form>` event handler. Essentially clears/resets form.
   */
  cancel: () => void;

  /**
   * Used in Toolbar `<form>` onSubmit event handler.
   */
  submit: (item: GroceryItem) => void;

  /**
   * When user requests to modify an item. This however doesn't mean the item will be
   * modified. `submit` action performs the final action to modify.
   */
  edit: (item: GroceryItem) => void;

  /**
   * Similarly to `edit` action, this is called when user request to remove an item in
   * collection. `trash(true)` action performs the final action to remove item.
   */
  confirmToTrash: (item: GroceryItem) => void;

  /**
   * When `value` is true, removes item. Otherwise aborts user in removal process.
   */
  trash: (value: boolean) => void;
}

export type AppState = {
  toolbar: ToolbarSlice;
  list: ListSlice;
  confirm: ConfirmationModalSlice;
  title: string;
} & AppActions;
