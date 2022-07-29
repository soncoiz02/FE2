import { message } from "antd";

const initialState = {
    cart: [],
    total: 0
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            let newCart
            const existItem = state.cart.find(item => item.id === action.payload.id)
            if (existItem) {
                existItem.quantity += action.payload.quantity
                existItem.finalPrice = existItem.quantity * existItem.finalPrice
                newCart = state.cart
            }
            else {
                newCart = [...state.cart, action.payload]
            }
            message.success("Thêm vào giỏ hàng thành công")
            return {
                ...state,
                cart: newCart,
            }

        case "INCREASE_QUANTITY":
            const itemIncrease = state.cart.find(item => item.id === action.payload)
            itemIncrease.quantity++
            itemIncrease.finalPrice = itemIncrease.quantity * (itemIncrease.salePrice > 0 ? itemIncrease.salePrice : itemIncrease.price)
            return {
                ...state,
                cart: [...state.cart]
            }
        case "DECREASE_QUANTITY":
            const itemDecrease = state.cart.find(item => item.id === action.payload)
            itemDecrease.quantity--
            itemDecrease.finalPrice = itemDecrease.quantity * (itemDecrease.salePrice > 0 ? itemDecrease.salePrice : itemDecrease.price)
            return {
                ...state,
                cart: [...state.cart]
            }
        case "DELETE_ITEM":
            const cart = state.cart.filter(item => item.id !== action.payload)
            message.success("Xóa sản phẩm thành công")
            return {
                ...state,
                cart: cart
            }
        default: return state
    }
};

export default rootReducer;
