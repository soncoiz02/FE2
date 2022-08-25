import { CategoryType } from "./category";

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
  status: number;
  comments: CommentType[];
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
  status: number;
};

export type ProductByCateType = {
  id: number;
  name: string;
  products: ProductType[];
};

export type CartType = {
  id: number;
  name: string;
  salePrice: number;
  price: number;
  totalPrice: number;
  img: string;
  quantity: number;
};

export type CommentType = {
  id?: number;
  content: string;
  productId: number;
  userId: number;
  username: string;
};

export type ProductWithCommentType = {
  id: number;
  name: string;
  price: number;
  salePrice: number;
  shortDesc: string;
  longDesc: string;
  specialDesc: string;
  img: string;
  categoryId: number;
  status: number;
  comments: CommentType[];
};
