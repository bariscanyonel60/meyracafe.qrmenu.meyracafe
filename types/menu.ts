export interface Variant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  kind: "drink" | "food";
  variants: Variant[];
  image: string;
  imageAlt: string;
  imageMatch: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  imageAlt?: string;
}

export interface MenuData {
  brand: string;
  categories: Category[];
  products: Product[];
}
