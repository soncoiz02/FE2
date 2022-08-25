import {
  CommentType,
  ProductByCateType,
  ProductCreateType,
  ProductType,
  ProductWithCommentAndCateType,
  ProductWithCommentType,
} from "../types/product";
import { instance } from "./instance";

export type ID_TYPE = number | string | undefined;

export const getProducts = () => {
  return instance.get<ProductType[]>("/products/?_embed=comments");
};

export const getProduct = (id: ID_TYPE) => {
  return instance.get<ProductType>(`/products/${id}`);
};

export const createProduct = (product: ProductCreateType) => {
  return instance.post<ProductType>("/products", product);
};

export const updateProduct = (product: ProductCreateType, id: ID_TYPE) => {
  return instance.put<ProductType>(`/products/${id}`, product);
};

export const deleteProduct = (id: ID_TYPE) => {
  return instance.delete<ProductType>(`/products/${id}`);
};

export const getProductWithCommentByCate = (id: ID_TYPE) => {
  return instance.get<ProductWithCommentType>(
    `/products/?_embed=comments&categoryId=${id}`
  );
};

export const getProductByCategory = async (cateId: ID_TYPE) => {
  return instance.get<ProductByCateType>(
    `/categories/${cateId}?_embed=products`
  );
};

export const updateStatus = async (id: ID_TYPE, status: number) => {
  return instance.patch<ProductType>(`/products/${id}`, { status });
};

export const searchProduct = async (keyword: string) => {
  return instance.get<ProductType[]>(`/products?name_like=${keyword}`);
};

export const sortProduct = async (sort: string, order: string) => {
  return instance.get<ProductWithCommentType[]>(
    `/products?_embed=comments&_sort=${sort}&_order=${order}`
  );
};

export const getProductComments = async (id: ID_TYPE) => {
  return instance.get<ProductWithCommentType>(
    `/products/${id}?_embed=comments`
  );
};

export const sendComment = async (comment: CommentType) => {
  return instance.post<CommentType>("/comments", comment);
};

export const getAllComments = async () => {
  return instance.get<CommentType[]>("/comments");
};
