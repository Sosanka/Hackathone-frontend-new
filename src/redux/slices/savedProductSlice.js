import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import savedProductService from "../../api/services/savedProductService";

export const fetchSavedProducts = createAsyncThunk(
  "savedProducts/fetchSavedProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await savedProductService.getSavedProducts();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch saved products"
      );
    }
  }
);

export const saveProduct = createAsyncThunk(
  "savedProducts/saveProduct",
  async (productId, { rejectWithValue }) => {
    try {
      return await savedProductService.saveProduct(productId);
    } catch (error) {
      return rejectWithValue({
        productId,
        message:
          error.response?.data?.detail || "Failed to save product",
      });
    }
  }
);

export const removeSavedProduct = createAsyncThunk(
  "savedProducts/removeSavedProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await savedProductService.removeProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue({
        productId,
        message:
          error.response?.data?.detail ||
          "Failed to remove saved product",
      });
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  pendingIds: {},
};

const savedProductSlice = createSlice({
  name: "savedProducts",
  initialState,

  reducers: {
    optimisticSave: (state, action) => {
      const product = action.payload;
      const alreadyExists = state.items.some(
        (item) => (item.product_id || item.product?.id || item.id) === product.id
      );

      if (alreadyExists) return;

      state.items.push({
        id: `temp-${product.id}`,
        product_id: product.id,
        product,
        optimistic: true,
      });

      state.pendingIds[product.id] = true;
    },

    optimisticRemove: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter((item) => {
        const id = item.product_id || item.product?.id || item.id;
        return id !== productId;
      });

      state.pendingIds[productId] = true;
    },

    restoreSavedProduct: (state, action) => {
      const product = action.payload;
      const alreadyExists = state.items.some(
        (item) => (item.product_id || item.product?.id || item.id) === product.id
      );

      if (!alreadyExists) {
        state.items.push({
          id: `restored-${product.id}`,
          product_id: product.id,
          product,
          optimistic: false,
        });
      }

      delete state.pendingIds[product.id];
    },

    restoreRemovedProduct: (state, action) => {
      const product = action.payload;
      const targetId = product.id || product.product_id;

      const alreadyExists = state.items.some(
        (item) => (item.product_id || item.product?.id || item.id) === targetId
      );

      if (!alreadyExists) {
        state.items.push({
          id: `restored-${targetId}`,
          product_id: targetId,
          product,
          optimistic: false,
        });
      }

      delete state.pendingIds[targetId];
    },

    clearPending: (state, action) => {
      delete state.pendingIds[action.payload];
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSavedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchSavedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SAVE SUCCESS
      .addCase(saveProduct.fulfilled, (state, action) => {
        const productId = action.meta.arg;
        delete state.pendingIds[productId];
      })

      // SAVE REJECTED
      .addCase(saveProduct.rejected, (state, action) => {
        const productId = action.payload?.productId || action.meta.arg;
        state.items = state.items.filter(
          (item) => (item.product_id || item.product?.id) !== productId
        );
        delete state.pendingIds[productId];
        state.error = action.payload?.message || "Failed to save product";
      })

      // REMOVE SUCCESS
      .addCase(removeSavedProduct.fulfilled, (state, action) => {
        const productId = action.payload || action.meta.arg;
        delete state.pendingIds[productId];
        state.items = state.items.filter(
          (item) => (item.product_id || item.product?.id || item.id) !== productId
        );
      })

      // REMOVE REJECTED
      .addCase(removeSavedProduct.rejected, (state, action) => {
        const productId = action.payload?.productId || action.meta.arg;
        delete state.pendingIds[productId];
        state.error = action.payload?.message || "Failed to remove item";
      });
  },
});

export const {
  optimisticSave,
  optimisticRemove,
  restoreSavedProduct,
  restoreRemovedProduct,
  clearPending,
} = savedProductSlice.actions;

export default savedProductSlice.reducer;