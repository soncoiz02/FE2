import { CartType } from "../types/product";

export const ADD_TO_CART = (data: CartType) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
};

export const INCREASE_QUANTITY = (id: number) => {
  return {
    type: "INCREASE_QUANTITY",
    payload: id,
  };
};

export const DECREASE_QUANTITY = (id: number) => {
  return {
    type: "DECREASE_QUANTITY",
    payload: id,
  };
};

export const DELETE_ITEM = (id: number) => {
  return {
    type: "DELETE_ITEM",
    payload: id,
  };
};
