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
  currency: string;
  variants: Variant[];
  description?: string | null;
  allergens?: string | null;
  available: boolean;
  sourceSheet: string;
  sourceRow: number;
  image: string;
  imageAlt: string;
  imageMatch: string;
  imageApproved: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  imageAlt?: string;
}

export interface MenuData {
  brand: string;
  locale: string;
  currency: string;
  source: string;
  categories: Category[];
  products: Product[];
}
