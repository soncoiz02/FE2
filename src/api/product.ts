import {
  ProductByCateType,
  ProductCreateType,
  ProductType,
} from "../types/product";
import { instance } from "./instance";

export type ID_TYPE = number | string | undefined;

export const getProducts = () => {
  return instance.get<ProductType[]>("/products");
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

export const getProductByCategory = async (cateId: ID_TYPE) => {
  return instance.get<ProductByCateType>(
    `/categories/${cateId}?_embed=products`
  );
};

export const updateStatus = async (id: ID_TYPE, status: number) => {
  return instance.patch<ProductType>(`/products/${id}`, { status });
};
