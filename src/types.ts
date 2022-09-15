/* eslint-disable @typescript-eslint/no-invalid-void-type */
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

/**
 * @todo remove `payload` from call signature when value is set to `undefined` in `AppActions`:
 * @link https://www.typescriptlang.org/play?ts=4.4.2&exactOptionalPropertyTypes=true&q=224#example/exact-optional-properties
 */
export type ActionsType = Record<string, DomainActionsType>;

type DomainActionsType = Record<string, unknown>;

type Separator = "/";

/**
 * Credit to 'jcalz':
 * @link https://stackoverflow.com/a/50375286
 */
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

export type GetPayLoadType<T> = T extends `${infer U extends Key<AppActions>}`
  ? U extends `${infer A extends keyof AppActions}${Separator}${infer B extends string}`
    ? B extends keyof AppActions[A]
      ? AppActions[A][B]
      : never
    : never
  : never;

export type Key<Type extends ActionsType> = keyof DomainEventIntersect<Type>;

/**
 * Credit to 'jcalz':
 * @link https://stackoverflow.com/a/72449495/648789
 */
type OptionalIfUndefined<T> = undefined extends T
  ? [payload?: T]
  : [payload: T];

export type ActionRedux<Type extends ActionsType> = <
  K extends Key<Type>,
  P extends Pick<DomainEventIntersect<Type>, K>
>(
  this: void,
  type: K,
  ...[payload]: OptionalIfUndefined<P[K]>
) => {
  type: K;
  payload: P[K];
};

export interface ReduxParams<Type extends ActionsType> {
  action: ActionRedux<Type>;
}

export const createActions = <
  Type extends ActionsType
>(): ReduxParams<Type> => {
  const action = function <
    K extends Key<Type>,
    P extends Pick<DomainEventIntersect<Type>, K>
  >(
    this: void,
    type: K,
    ...[payload]: OptionalIfUndefined<P[K]>
  ): {
    type: K;
    payload: P[K];
  } {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const _payload = payload as P[K];
    return { type, payload: _payload };
  };

  return { action };
};
