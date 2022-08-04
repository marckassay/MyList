import { useAppStore } from "../store/App.store";
import { Item } from "./Item";

export function List() {
  const {
    list: { grandTotal, items },
  } = useAppStore();

  return (
    <div className="flex flex-col my-4 mx-16 gap-x-2 select-none">
      {grandTotal < 30 ? (
        <div className="text-lg text-right text-green-600 font-semibold">
          Grand total: ${grandTotal}
        </div>
      ) : (
        <div className="text-lg text-right text-red-600 font-bold">
          Grand total is over budget!: ${grandTotal}
        </div>
      )}
      <div>
        {items.map((value, index) => (
          <div key={index}>
            <Item item={value} />
          </div>
        ))}
      </div>
    </div>
  );
}
