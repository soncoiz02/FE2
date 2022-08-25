import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../pages/client/cart/CartSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
