import { CategoryType } from "../types/category";
import { instance } from "./instance";
import { ID_TYPE } from "./product";

export const getCategories = () => {
  return instance.get<CategoryType[]>("/categories");
};

export const getCategory = (id: ID_TYPE) => {
  return instance.get<CategoryType>(`/categories/${id}`);
};

export const createCategory = (category: CategoryType) => {
  return instance.post<CategoryType>("/categories", category);
};

export const updateCategory = (category: CategoryType, id: ID_TYPE) => {
  return instance.put<CategoryType>(`/categories/${id}`, category);
};

export const deleteCategory = (id: ID_TYPE) => {
  return instance.delete<CategoryType>(`/categories/${id}`);
};
