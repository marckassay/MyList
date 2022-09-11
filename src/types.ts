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

type ActionType =
  | "toolbar/reset form"
  | "toolbar/submit form"
  | "list/init edit item"
  | "list/confirm trash item"
  | "confirm/abort trash"
  | "confirm/proceed to trash";

export interface Action {
  type: ActionType;
  payload?: GroceryItem;
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

/**
 * @todo remove `payload` from call signature when value is set to `undefined` in `AppActions`:
 * @link https://www.typescriptlang.org/play?ts=4.4.2&exactOptionalPropertyTypes=true&q=224#example/exact-optional-properties
 */
type ActionsType = Record<string, DomainActionsType>;

type DomainActionsType = Record<string, unknown>;

type Separator = "/";

// https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type DomainEventIndexedObj<
  Type extends ActionsType,
  DomainKey extends keyof Type = ""
> = DomainKey extends keyof Type
  ? {
      readonly [EventKey in keyof Type[DomainKey] as `${string &
        DomainKey}${Separator}${string & EventKey}`]: Type[DomainKey][EventKey];
    }
  : DomainEventIndexedObj<Type, keyof Type>;

export type DomainEventIntersect<Type extends ActionsType> =
  UnionToIntersection<DomainEventIndexedObj<Type>>;

export type PickPayloadType<
  Type extends ActionsType,
  K extends Key<Type>
> = Pick<DomainEventIntersect<Type>, K>;

/**
 * @todo The references in code for `ReduxReturn` return a union of all members for each property.
 * @link https://catchts.com/callbacks#infer_argument_and_return_value
 * @link https://stackoverflow.com/questions/66706012/infer-function-generic-type-u-from-return-value-of-passed-function
 */

export type Key<Type extends ActionsType> = keyof DomainEventIntersect<Type>;

export type ReduxParams<Type extends ActionsType> = <
  K extends Key<Type>,
  P extends Pick<DomainEventIntersect<Type>, K>
>(
  type: K,
  payload: P[K]
) => {
  type: K;
  payload: P[K];
};

export function createActions<Type extends ActionsType>(): ReduxParams<Type> {
  return (type, payload) => ({
    type,
    payload,
  });
}
