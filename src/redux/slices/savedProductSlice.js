import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import savedProductService from "../../api/services/savedProductService";

// ===============================
// Fetch saved products
// ===============================
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

// ===============================
// Save product in database
// ===============================
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

// ===============================
// Remove product from database
// ===============================
export const removeSavedProduct = createAsyncThunk(
  "savedProducts/removeSavedProduct",
  async (productId, { rejectWithValue }) => {
    try {
      return await savedProductService.removeProduct(productId);
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

  // Products currently being synced with backend
  pendingIds: {},
};

const savedProductSlice = createSlice({
  name: "savedProducts",
  initialState,

  reducers: {
    // =========================================
    // INSTANTLY ADD TO UI (MAX 2 LIMIT)
    // =========================================
    optimisticSave: (state, action) => {
      const product = action.payload;

      // Already saved → nothing to do
      const alreadyExists = state.items.some(
        (item) => item.product_id === product.id
      );

      if (alreadyExists) {
        return;
      }

      // Maximum 2 saved products
      if (state.items.length >= 2) {
        // Remove the oldest saved product immediately
        const oldestProduct = state.items[0];

        state.items.shift();

        // Mark the old product as pending removal
        state.pendingIds[oldestProduct.product_id] = true;
      }

      // Add new product immediately
      state.items.push({
        id: `temp-${product.id}`,
        product_id: product.id,
        product,
        optimistic: true,
      });

      state.pendingIds[product.id] = true;
    },

    // =========================================
    // INSTANTLY REMOVE FROM UI
    // =========================================
    optimisticRemove: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter(
        (item) => item.product_id !== productId
      );

      state.pendingIds[productId] = true;
    },

    // =========================================
    // API FAILED → RESTORE PRODUCT
    // =========================================
    restoreSavedProduct: (state, action) => {
      const product = action.payload;

      const alreadyExists = state.items.some(
        (item) => item.product_id === product.id
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

    // =========================================
    // API FAILED AFTER REMOVE → RESTORE
    // =========================================
    restoreRemovedProduct: (state, action) => {
      const product = action.payload;

      const alreadyExists = state.items.some(
        (item) => item.product_id === product.id
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

    clearPending: (state, action) => {
      delete state.pendingIds[action.payload];
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================================
      // FETCH
      // =========================================
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

      // =========================================
      // SAVE API SUCCESS
      // =========================================
      .addCase(saveProduct.fulfilled, (state, action) => {
        const productId = action.meta.arg;

        delete state.pendingIds[productId];
      })

      // =========================================
      // SAVE API FAILED
      // =========================================
      .addCase(saveProduct.rejected, (state, action) => {
        const productId = action.payload.productId;

        state.items = state.items.filter(
          (item) => item.product_id !== productId
        );

        delete state.pendingIds[productId];

        state.error = action.payload.message;
      })

      // =========================================
      // REMOVE API SUCCESS
      // =========================================
      .addCase(removeSavedProduct.fulfilled, (state, action) => {
        const productId = action.meta.arg;

        delete state.pendingIds[productId];

        state.items = state.items.filter(
          (item) => item.product_id !== productId
        );
      })

      // =========================================
      // REMOVE API FAILED
      // =========================================
      .addCase(removeSavedProduct.rejected, (state, action) => {
        const productId = action.payload.productId;

        delete state.pendingIds[productId];

        state.error = action.payload.message;
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