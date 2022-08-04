import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useAppStore } from "./store/App.store";
import { Children } from "./types";

export function ConfirmationModal({ children }: Children) {
  const {
    confirm: { item },
    trash,
  } = useAppStore();

  // creates 'key: value' array to be listed in confirmation
  // message to provide more info to the user than perhaps just
  // a name.
  const parsedIterableItem = () => {
    const result = [];
    if (item) {
      for (const [field, value] of Object.entries(item)) {
        if (field !== "id") result.push(`${field}: ${value}`);
      }
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
            onClose={() => trash(false)}
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
                        click on the <span className="italic">Delete</span>{" "}
                        button:
                      </p>
                      <div className="mt-2"></div>
                      {parsedIterableItem().map((value, index) => (
                        <div key={index} className="indent-2 font-mono">
                          {value}
                        </div>
                      ))}
                      <div className="mb-2"></div>
                      <p className="text-sm text-gray-500">
                        Otherwise click on the{" "}
                        <span className="italic">Cancel</span> button.
                      </p>
                    </div>

                    <div className="flex justify-end mt-4 gap-2">
                      <button
                        type="button"
                        className="button-standard"
                        onClick={() => trash(false)}
                      >
                        <span className="inline-flex">
                          <XIcon className="icon-standard" />
                          Cancel
                        </span>
                      </button>
                      <button
                        type="button"
                        className="button-danger"
                        onClick={() => trash(true)}
                      >
                        <span className="inline-flex">
                          <ExclamationCircleIcon className="icon-standard" />
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
