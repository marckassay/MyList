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

/**
 * Open issues that may be related to this objective:
 * @link https://github.com/microsoft/TypeScript/issues/13948
 * This link has relavent typings to what I'm attempting to achieve:
 * @link https://catchts.com/hex-validation#function_inference
 * @todo remove `payload` from call signature when value is set to `undefined` in `AppActions`:
 * @link https://www.typescriptlang.org/play?ts=4.4.2&exactOptionalPropertyTypes=true&q=224#example/exact-optional-properties
 */
type DomainType<Type extends ActionsType> = string & keyof Type;

type EventType<
  Type extends ActionsType,
  Domain extends DomainType<Type>
> = string & keyof Type[Domain];

type DomainEvent<
  Type extends ActionsType,
  Domain extends DomainType<Type>,
  Event extends EventType<Type, Domain>
> = string & `${Domain}/${Event}`;

type PayloadType<
  Type extends ActionsType,
  Domain extends DomainType<Type>,
  Event extends EventType<Type, Domain>
> = Type[Domain][Event];

export type ReduxParams<Type extends ActionsType> = <
  Domain extends DomainType<Type>,
  Event extends EventType<Type, Domain>,
  Payload extends PayloadType<Type, Domain, Event>
>(
  type: DomainEvent<Type, Domain, Event>,
  payload: Payload
) => { type: DomainEvent<Type, Domain, Event>; payload: Payload };

export type ReduxReturn<Type extends ActionsType> = ReduxParams<Type> extends (
  ...args: infer _
) => infer R
  ? R
  : never;

type ActionsType = Record<string, Record<string, unknown>>;

export function createActions<Type extends ActionsType>(): ReduxParams<Type> {
  return (type, payload) => ({ type, payload });
}
