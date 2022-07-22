import { useState } from "react";
import { GroceryItem } from "./types";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

export interface ItemMutate {
  onEdit: (item: GroceryItem) => void;
  onDelete: (item: GroceryItem) => void;
}
export interface ItemProps extends ItemMutate {
  item: GroceryItem;
}

function Item({ item, onEdit, onDelete }: ItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="flex flex-row gap-2 w-full"
    >
      <div className="text-lg text-left font-mono">{item.name}</div>
      <div className="grow"></div>
      <div className="text-lg text-right font-mono font-semibold">
        ${item.price}
      </div>
      {isHovering && (
        <div className="flex flex-row cursor-pointer">
          <div onClick={() => onEdit(item)}>
            <PencilIcon className="h-5 w-5 hover:text-blue-500" />
          </div>
          <div className="flex-initial w-2"></div>
          <div onClick={() => onDelete(item)}>
            <TrashIcon className="h-5 w-5 hover:text-red-600" />
          </div>
        </div>
      )}
    </div>
  );
}

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
