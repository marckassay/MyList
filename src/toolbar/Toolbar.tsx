import { useAppStore } from "../store/App.store";
import { ModifyItem } from "./ModifyItem";

export function Toolbar() {
  const {
    toolbar: { item },
  } = useAppStore();

  return (
    <div className="flex mx-auto gap-x-2">
      <ModifyItem item={item} />
    </div>
  );
}
