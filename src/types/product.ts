export type ProductType = {
  id: number;
  name: string;
  price: number;
  salePrice: number;
  shortDesc: string;
  longDesc: string;
  specialDesc: string;
  img: string;
  categoryId: number;
};

export type ProductCreateType = {
  name: string;
  price: number;
  salePrice?: number;
  shortDesc?: string;
  longDesc?: string;
  specialDesc?: string;
  img: string;
  categoryId: number;
};

export type ProductByCateType = {
  id: number;
  name: string;
  products: ProductType[];
};
