import { message } from "antd";
import { CartType } from "../types/product";

type ActionType = {
  type: string;
  payload?: any;
};

type InitialStateType = {
  cart: CartType[];
  total: number;
};

const initialState: InitialStateType = {
  cart: [],
  total: 0,
};

const rootReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let newCart;
      const existItem = state.cart.find(
        (item: CartType) => item.id === action.payload.id
      );
      if (existItem) {
        existItem.quantity += action.payload.quantity;
        existItem.totalPrice =
          existItem.quantity *
          (existItem.salePrice > 0 ? existItem.salePrice : existItem.price);
        newCart = state.cart;
      } else {
        newCart = [...state.cart, action.payload];
      }
      message.success("Thêm vào giỏ hàng thành công");
      return {
        ...state,
        cart: newCart,
      };

    case "INCREASE_QUANTITY":
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
      return {
        ...state,
        cart: [...state.cart],
      };
    case "DECREASE_QUANTITY":
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
      return {
        ...state,
        cart: [...state.cart],
      };
    case "DELETE_ITEM":
      const cart = state.cart.filter(
        (item: CartType) => item.id !== action.payload
      );
      message.success("Xóa sản phẩm thành công");
      return {
        ...state,
        cart: cart,
      };
    default:
      return state;
  }
};

export default rootReducer;
