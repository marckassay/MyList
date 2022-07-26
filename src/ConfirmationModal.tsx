import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Children } from "./types";

export interface ConfirmationModalProps<T> {
  /**
   * The item that we are seeking a confirmation from user.
   */
  item?: T;

  /**
   * When `value` is an Entity value, user has confirmed delete operation. Otherwise
   * when `value` is `undefined`, user cancelled or aborted delete opertion.
   */
  onConfirmDelete: (value: T | undefined) => void;
}

export function ConfirmationModal<T>({
  item,
  onConfirmDelete,
  children,
}: ConfirmationModalProps<T> & Children) {
  const parsedIterableItem = () => {
    const result = [];
    for (const field in item) {
      if (field !== "id") result.push(`${field}: ${item[field]}`);
    }
    return result;
  };

  return (
    <>
      {children}

      {item && (
        <Transition appear show={item !== undefined} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => onConfirmDelete(undefined)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Confirm your request to delete
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        The following item will be deleted if you proceed to
                        click on the 'Delete' button:
                      </p>
                      <div className="mt-2"></div>
                      {parsedIterableItem().map((value, index) => (
                        <div key={index} className="indent-2 font-mono">
                          {value}
                        </div>
                      ))}
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-500">
                        Otherwise click on the 'Cancel' button.
                      </p>
                    </div>

                    <div className="flex justify-end mt-4 gap-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => onConfirmDelete(undefined)}
                      >
                        <span className="inline-flex">
                          <XIcon className="h-4 w-4 self-center" />
                          Cancel
                        </span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => onConfirmDelete(item)}
                      >
                        <span className="inline-flex">
                          <ExclamationCircleIcon className="h-4 w-4 self-center" />
                          Delete
                        </span>
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
