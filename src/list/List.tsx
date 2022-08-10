import { Item } from "./Item";
import { useAppStore } from "../store/App.store";

export function List() {
  const {
    list: { grandTotal, items },
  } = useAppStore();

  const total = typeof grandTotal === "number" ? grandTotal : 0;

  return (
    <div className="flex flex-col my-4 mx-16 gap-x-2 select-none">
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
        {items?.map((value) => (
          <div key={value.id?.toString()}>
            <Item item={value} />
          </div>
        ))}
      </div>
    </div>
  );
}
