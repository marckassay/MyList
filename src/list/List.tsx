import { GroceryItem, ItemMutate } from "../types";
import { Item } from "./Item";

export interface ListProps<GroceryItem> extends ItemMutate {
  items: Array<GroceryItem>;
}

export function List(props: ListProps<GroceryItem>) {
  const total = props.items
    .map((item) => item.price)
    .reduce((previousprice, price) => previousprice + price, 0);

  return (
    <div className="flex flex-col m-8 px-8 gap-x-2">
      {total < 30 ? (
        <div className="text-lg text-right text-green-600 font-semibold">
          Grand total: ${total}
        </div>
      ) : (
        <div className="text-lg text-right text-red-600 font-bold">
          Grand total is over budget!: ${total}
        </div>
      )}
      <div>
        {props.items.map((value, index) => (
          <div key={index}>
            <Item
              item={value}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
