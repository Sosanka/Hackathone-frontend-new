import api from "../axios";

export const cartService = {
  getCart: async () => {
    const response = await api.get("/buyer/cart");
    return response.data;
  },

  addToCart: async (productId, quantity) => {
    const response = await api.post("/buyer/cart", {
      product_id: productId,
      quantity,
    });

    return response.data;
  },

  updateCartItem: async (productId, quantity) => {
    const response = await api.patch(
      `/buyer/cart/${productId}`,
      {
        quantity,
      }
    );

    return response.data;
  },

  removeFromCart: async (productId) => {
    await api.delete(`/buyer/cart/${productId}`);
  },
};