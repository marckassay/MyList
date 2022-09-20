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

type ActionsType = Record<string, DomainActionsType>;

type DomainActionsType = Record<string, unknown>;

type Separator = "/";

/**
 * Credit to 'jcalz':
 * @link https://stackoverflow.com/a/50375286/648789
 */
// prettier-ignore
type UnionToIntersection<U> =
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
    ? I
    : never;

/**
 * Credit to 'jcalz':
 * @link https://stackoverflow.com/a/72449495/648789
 */
type OptionalIfUndefined<T> = undefined extends T
  ? [payload?: T]
  : [payload: T];

type DomainEventIndexedObj<
  Type extends ActionsType,
  DomainKey extends keyof Type = ""
> = DomainKey extends keyof Type
  ? {
      [EventKey in keyof Type[DomainKey] as `${string &
        DomainKey}${Separator}${string & EventKey}`]: Type[DomainKey][EventKey];
    }
  : DomainEventIndexedObj<Type, keyof Type>;

type DomainEventIntersect<Type extends ActionsType> = UnionToIntersection<
  DomainEventIndexedObj<Type>
>;

export type ActionRedux<Type extends ActionsType> = <
  P extends DomainEventIntersect<Type>,
  DE extends keyof P
>(
  type: DE,
  ...[payload]: OptionalIfUndefined<P[DE]>
) => ActionType<Type>;

export interface ReduxParams<Type extends ActionsType> {
  action: ActionRedux<Type>;
}

export const createActions = <
  Type extends ActionsType
>(): ReduxParams<Type> => {
  const action: ActionRedux<Type> = function <
    P extends DomainEventIntersect<Type>,
    DE extends keyof P
  >(type: DE, ...[payload]: OptionalIfUndefined<P[DE]>) {
    return {
      type,
      payload,
    } as ActionType<Type>;
  };

  return { action };
};

/**
 * Much credit goes to the following thread for this type:
 * @link https://stackoverflow.com/questions/73792053/typescript-argument-type-from-a-previous-argument-value
 */
export type ActionType<Type extends ActionsType> = {
  [DE in keyof DomainEventIntersect<Type>]: {
    type: DE;
    payload: DomainEventIntersect<Type>[DE];
  };
}[keyof DomainEventIntersect<Type>];

export type ActionReturnType<Type extends ActionsType> = ReturnType<
  ActionRedux<Type>
>;
