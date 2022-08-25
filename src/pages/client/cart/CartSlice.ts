import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { CartType } from "../../../types/product";

type InitialStateType = {
  cart: CartType[];
  total: number;
};

const initialState: InitialStateType = {
  cart: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartType>) => {
      const existItem = state.cart.find(
        (item: CartType) => item.id === action.payload.id
      );
      if (existItem) {
        existItem.quantity += action.payload.quantity;
        existItem.totalPrice =
          existItem.quantity *
          (existItem.salePrice > 0 ? existItem.salePrice : existItem.price);
      } else {
        state.cart.push(action.payload);
      }
      state.total = state.cart.reduce((total: number, item: CartType) => {
        return total + item.totalPrice;
      }, 0);
      message.success("Thêm vào giỏ hàng thành công");
    },
    increase: (state, action: PayloadAction<number>) => {
      const itemIncrease = state.cart.find(
        (item: CartType) => item.id === action.payload
      );
      if (itemIncrease) {
        itemIncrease.quantity++;
        itemIncrease.totalPrice =
          itemIncrease.quantity *
          (itemIncrease.salePrice > 0
            ? itemIncrease.salePrice
            : itemIncrease.price);
      }

      state.total = state.cart.reduce((total: number, item: CartType) => {
        return total + item.totalPrice;
      }, 0);
    },
    decrease: (state, action: PayloadAction<number>) => {
      const itemDecrease = state.cart.find(
        (item) => item.id === action.payload
      );
      if (itemDecrease) {
        itemDecrease.quantity--;
        itemDecrease.totalPrice =
          itemDecrease.quantity *
          (itemDecrease.salePrice > 0
            ? itemDecrease.salePrice
            : itemDecrease.price);
      }
      state.total = state.cart.reduce((total: number, item: CartType) => {
        return total + item.totalPrice;
      }, 0);
    },
    delete: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (item: CartType) => item.id !== action.payload
      );
      state.total = state.cart.reduce((total: number, item: CartType) => {
        return total + item.totalPrice;
      }, 0);
      message.success("Xóa sản phẩm thành công");
    },
  },
});

export default cartSlice;
