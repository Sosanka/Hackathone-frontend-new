import { configureStore } from "@reduxjs/toolkit";

import sellerAuthReducer from "./slices/sellerAuthSlice";
import buyerAuthReducer from "./slices/buyerAuthSlice";
import cartReducer from "./slices/cartSlice";
import savedProductReducer from "./slices/savedProductSlice";

const store = configureStore({
  reducer: {
    sellerAuth: sellerAuthReducer,
    buyerAuth: buyerAuthReducer,
    cart: cartReducer,
    savedProducts: savedProductReducer,
  },
});

export default store;