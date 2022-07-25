export interface Entity {
  id: number;
}

export interface Children {
  children: React.ReactNode;
}

export interface GroceryItem extends Entity {
  name: string;
  price: number;
}

export interface ItemMutate {
  onEdit: (item: GroceryItem) => void;
  onDelete: (item: GroceryItem) => void;
}

export interface ItemProps extends ItemMutate {
  item: GroceryItem;
}
