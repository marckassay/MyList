import { useEffect, useState } from "react";
import { GroceryItem } from "./types";
import { emptyGroceryItem, isGroceryItemValid } from "./App";
import { PencilIcon, CheckCircleIcon, XIcon } from "@heroicons/react/solid";

export interface AddEditItemProps {
  createItem: (item: GroceryItem) => Promise<void>;
  editItem?: GroceryItem;
}

function AddEditItem({ createItem, editItem }: AddEditItemProps) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [item, setItem] = useState<GroceryItem>(emptyGroceryItem);
  const [isValid, setValidate] = useState<boolean>(false);

  const onNameChangeResult = (e: any) => {
    setItem({ ...item, name: e.target.value });
  };

  const onPriceChangeResult = (e: any) => {
    if (typeof parseInt(e.target.value) === "number") {
      setItem({ ...item, price: parseInt(e.target.value) });
    }
  };

  const onSubmit = (e: any) => {
    if (isGroceryItemValid(item)) {
      createItem(item);
      onReset(e);
    }

    e.preventDefault();
  };

  const onReset = (e: any) => {
    setItem(emptyGroceryItem);
    setEditing(false);

    e.preventDefault();
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
                  className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                    // @see https://stackoverflow.com/a/65138192/648789
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={onPriceChangeResult}
                    className="pointer-events-auto p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-8 py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
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
              <button
                onClick={onReset}
                className="mr-2 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="inline-flex">
                  <XIcon className="h-5 w-5" />
                  Cancel
                </span>
              </button>
            )}
            <button
              type="submit"
              disabled={!isValid}
              className="py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {!isEditing ? (
                <span className="inline-flex gap-px">
                  <PencilIcon className="h-5 w-5" />
                  Add Item
                </span>
              ) : (
                <span className="inline-flex gap-px">
                  <CheckCircleIcon className="h-5 w-5" />
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

export interface ToolbarProps {
  addEditItemProps: AddEditItemProps;
}

export function Toolbar({ addEditItemProps }: ToolbarProps) {
  return (
    <div className="flex mx-auto gap-x-2">
      <AddEditItem {...addEditItemProps} />
    </div>
  );
}
