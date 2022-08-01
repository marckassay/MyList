import { useEffect, useState } from "react";
import { GroceryItem } from "../types";
import { emptyGroceryItem, isGroceryItemValid } from "../utils";
import { PencilIcon, CheckCircleIcon, XIcon } from "@heroicons/react/solid";

export interface ModifyItemProps {
  updateItems: (item: GroceryItem) => void;
  editItem?: GroceryItem;
}

export function ModifyItem({ updateItems, editItem }: ModifyItemProps) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [item, setItem] = useState<GroceryItem>(emptyGroceryItem);
  const [isValid, setValidate] = useState<boolean>(false);

  const onNameChangeResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, name: e.target.value });
  };

  const onPriceChangeResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result1 = e.target.value;
    const result = parseInt(result1 === "" ? "0" : result1);
    if (!isNaN(result) && typeof result === "number") {
      setItem({ ...item, price: result });
    }
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (isGroceryItemValid(item)) {
      updateItems(item);
      onReset();
    }

    e.preventDefault();
  };

  const onReset = () => {
    setItem(emptyGroceryItem);
    setEditing(false);
  };

  useEffect(() => {
    setValidate(isGroceryItemValid(item));
  }, [item]);

  useEffect(() => {
    if (editItem) {
      setItem(editItem);
      setEditing(true);
    } else {
      setItem(emptyGroceryItem);
      setEditing(false);
    }
  }, [editItem]);

  return (
    <div className="m-5 md:mt-0 md:col-span-2">
      <form onSubmit={onSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-blue-200 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-4 sm:col-span-3 select-none">
                <label
                  htmlFor="item-name"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Item
                </label>
                <input
                  type="text"
                  name="item-name"
                  id="item-name"
                  placeholder="Enter name of item"
                  value={item.name}
                  onChange={onNameChangeResult}
                  className="p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-3 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 select-none"
                >
                  Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm select-none">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={item.price}
                    onChange={onPriceChangeResult}
                    className="pointer-events-auto p-2 focus:ring-blue-500 focus:border-blue-500 block w-full h-8 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      className="focus:ring-blue-500 focus:border-blue-500 h-8 py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    >
                      <option>USD</option>
                      <option>CAD</option>
                      <option>EUR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-blue-300 text-right select-none sm:px-6">
            {isEditing && (
              <button onClick={onReset} className="mr-2 button-standard">
                <span className="inline-flex">
                  <XIcon className="icon-standard" />
                  Cancel
                </span>
              </button>
            )}
            <button
              type="submit"
              disabled={!isValid}
              className="button-standard"
            >
              {!isEditing ? (
                <span className="inline-flex gap-px">
                  <PencilIcon className="icon-standard" />
                  Add Item
                </span>
              ) : (
                <span className="inline-flex gap-px">
                  <CheckCircleIcon className="icon-standard" />
                  Update Item
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
