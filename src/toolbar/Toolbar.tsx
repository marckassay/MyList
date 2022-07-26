import { CreateEditItem, CreateEditItemProps } from "./CreateEditItem";

export interface ToolbarProps {
  addEditItemProps: CreateEditItemProps;
}

export function Toolbar({ addEditItemProps }: ToolbarProps) {
  return (
    <div className="flex mx-auto gap-x-2">
      <CreateEditItem {...addEditItemProps} />
    </div>
  );
}
