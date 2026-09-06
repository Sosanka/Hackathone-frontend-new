import api from "../axios";

const savedProductService = {
  getSavedProducts: async () => {
    const response = await api.get("/buyer/saved-products");
    return response.data;
  },

  getSavedStatus: async (productId) => {
    const response = await api.get(
      `/buyer/saved-products/${productId}/status`
    );

    return response.data;
  },

  saveProduct: async (productId) => {
    const response = await api.post("/buyer/saved-products", {
      product_id: productId,
    });

    return response.data;
  },

  removeProduct: async (productId) => {
    const response = await api.delete(
      `/buyer/saved-products/${productId}`
    );

    return response.data;
  },
};

export default savedProductService;