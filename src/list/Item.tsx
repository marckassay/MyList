import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { GroceryItem } from "../types";
import { action, useAppStore } from "../store/App.store";

export interface ItemProps {
  item: GroceryItem;
}

export function Item({ item }: ItemProps) {
  const { dispatch } = useAppStore();

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      className="flex flex-row gap-2 w-full select-none">
      <div className="text-lg text-left font-mono">{item.name}</div>
      <div className="grow"></div>
      <div className="text-lg text-right font-mono font-semibold">
        ${item.price}
      </div>
      {isHovering ? (
        <div className="flex flex-row cursor-pointer self-center">
          <div
            data-testid="edit"
            onClick={() => dispatch(action("list/init edit item", item))}>
            <PencilIcon className="icon-standard hover:text-blue-500" />
          </div>
          <div className="flex-initial w-2"></div>
          <div
            data-testid="trash"
            onClick={() => dispatch(action("list/confirm trash item", item))}>
            <TrashIcon className="icon-standard hover:text-red-900" />
          </div>
        </div>
      ) : (
        <div className="w-10"></div>
      )}
    </div>
  );
}
