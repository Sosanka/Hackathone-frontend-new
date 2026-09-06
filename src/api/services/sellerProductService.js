import api from "../axios";

const sellerProductService = {
  // ==========================================
  // CREATE PRODUCT
  // ==========================================

  createProduct: async (data) => {
    const response = await api.post(
      "/products",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  // ==========================================
  // GET ALL PRODUCTS
  // ==========================================

  getProducts: async () => {
    const response = await api.get("/products");

    return response.data;
  },

  // ==========================================
  // GET SINGLE PRODUCT
  // ==========================================

  getProduct: async (productId) => {
    const response = await api.get(
      `/products/${productId}`
    );

    return response.data;
  },

  // ==========================================
  // UPDATE PRODUCT
  // ==========================================

  updateProduct: async (productId, data) => {
    const response = await api.put(
      `/products/${productId}`,
      data
    );

    return response.data;
  },

  // ==========================================
  // ADD STOCK
  // ==========================================

  addStock: async (productId, quantity) => {
    const response = await api.post(
      `/products/${productId}/stock/add`,
      {
        quantity,
      }
    );

    return response.data;
  },

  // ==========================================
  // SUBTRACT STOCK
  // ==========================================

  subtractStock: async (
    productId,
    quantity
  ) => {
    const response = await api.post(
      `/products/${productId}/stock/subtract`,
      {
        quantity,
      }
    );

    return response.data;
  },

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  deleteProduct: async (productId) => {
    await api.delete(
      `/products/${productId}`
    );
  },
};

export default sellerProductService;