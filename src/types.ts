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
 * @link https://stackoverflow.com/a/50375286
 */
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
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
) => {
  type: DE;
  payload: P[DE];
};

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
      payload: payload as P[DE],
    };
  };

  return { action };
};

export type GetPayLoadType<
  Type extends ActionsType,
  P extends keyof DomainEventIntersect<Type>
> = DomainEventIntersect<Type>[P];

//////////////////////////////////////////////////////////////////////////

/*
const { action } = createActions<AppActions>();
const c1 = action("toolbar/submit form", { name: "", price: 0 });
c1;
// ^?

const reducer = ({ type, payload }: ReturnType<ActionRedux<AppActions>>) => {
  let pay: GetPayLoadType<AppActions, typeof type>;

  if (type === "toolbar/reset form") {
    payload;
    // ^?
  } else if (type === "toolbar/submit form") {
    payload;
    // ^?
  }

  switch (type) {
    case "toolbar/reset form":
      pay = payload as GetPayLoadType<AppActions, typeof type>;
      pay;
      //^?
      break;
    case "toolbar/submit form":
      pay = payload as GetPayLoadType<AppActions, typeof type>;
      pay.name;
      // ^?
      break;
  }
};

type t1 = DomainEventIndexedObj<AppActions>;
//   ^?

type t2 = DomainEventIntersect<AppActions>;
//   ^?
*/
