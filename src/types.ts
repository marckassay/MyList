export interface Entity {
  id: number;
}

export interface GroceryItem extends Entity {
  name: string;
  price: number;
}
