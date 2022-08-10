import { List } from "./list/List";
import { useAppStore } from "./store/App.store";
import { Toolbar } from "./toolbar/Toolbar";
import { ConfirmationModal } from "./ConfirmationModal";

export default function App() {
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
