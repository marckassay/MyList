/* eslint-disable @typescript-eslint/no-unsafe-call */
import { List } from "./list/List";
import { Toolbar } from "./toolbar/Toolbar";
import { ConfirmationModal } from "./ConfirmationModal";
import { useAppStore } from "@MyList/store/App.store";

export function App() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { title } = useAppStore();

  return (
    <div className="container mx-auto p-4">
      <div className="flex mx-auto justify-center flex-col rounded-lg shadow-md bg-blue-100 w-1/3">
        <div className="text-2xl text-center p-2 font-bold text-blue-900 underline select-none">
          {title}
        </div>
        <Toolbar />
        <ConfirmationModal>
          <List />
        </ConfirmationModal>
      </div>
    </div>
  );
}
