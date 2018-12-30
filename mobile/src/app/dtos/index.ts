export interface IMenu {
  pizza: IFood[];
  drinks: IFood[];
}

export interface IFood {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}
