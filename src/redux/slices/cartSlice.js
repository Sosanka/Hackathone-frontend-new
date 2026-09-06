import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { cartService } from "../../api/services/cartService";


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {

    try {

      return await cartService.getCart();

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.detail ||
        "Unable to load cart."
      );

    }
  }
);


export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (
    { productId, quantity },
    { rejectWithValue }
  ) => {

    try {

      return await cartService.addToCart(
        productId,
        quantity
      );

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.detail ||
        "Unable to add item."
      );

    }
  }
);


export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (
    productId,
    { rejectWithValue }
  ) => {

    try {

      await cartService.removeFromCart(
        productId
      );

      return productId;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.detail ||
        "Unable to remove item."
      );

    }
  }
);


const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchCart.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchCart.fulfilled,
        (state, action) => {
          state.loading = false;
          state.items = action.payload;
        }
      )

      .addCase(
        fetchCart.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(
        addCartItem.fulfilled,
        (state, action) => {

          const index =
            state.items.findIndex(
              (item) =>
                item.product_id ===
                action.payload.product_id
            );

          if (index >= 0) {
            state.items[index] =
              action.payload;
          } else {
            state.items.push(
              action.payload
            );
          }
        }
      )

      .addCase(
        removeCartItem.fulfilled,
        (state, action) => {
          state.items =
            state.items.filter(
              (item) =>
                item.product_id !==
                action.payload
            );
        }
      );
  },
});

export const { clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;