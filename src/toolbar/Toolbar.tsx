import { ModifyItem, ModifyItemProps } from "./ModifyItem";

export interface ToolbarProps {
  modifyItemProps: ModifyItemProps;
}

export function Toolbar({ modifyItemProps }: ToolbarProps) {
  return (
    <div className="flex mx-auto gap-x-2">
      <ModifyItem {...modifyItemProps} />
    </div>
  );
}
