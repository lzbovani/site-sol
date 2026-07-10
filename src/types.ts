export type Category = 'Cafés' | 'Chás e matchas' | 'Geladas' | 'Doces japoneses' | 'Pratos leves' | 'Sazonais';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  ingredients: string[];
  allergens: string[];
  vegetarian?: boolean;
  vegan?: boolean;
  featured?: boolean;
  imagePosition: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ResidentCat {
  id: string;
  name: string;
  age: string;
  personality: string;
  story: string;
  habits: string;
  preferences: string;
  status: string;
  imagePosition: string;
}
