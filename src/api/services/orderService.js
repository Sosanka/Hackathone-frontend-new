import api from "../axios";

export const orderService = {
  checkStock: async (productId, quantity) => {
    const response = await api.get(
      `/buyer/orders/products/${productId}/stock`,
      {
        params: {
          quantity,
        },
      }
    );

    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await api.post(
      "/buyer/orders",
      orderData
    );

    return response.data;
  },

  getOrders: async () => {
    const response = await api.get("/buyer/orders");
    return response.data;
  },

  getOrder: async (orderId) => {
    const response = await api.get(
      `/buyer/orders/${orderId}`
    );

    return response.data;
  },
};